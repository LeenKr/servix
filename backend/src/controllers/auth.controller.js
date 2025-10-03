import bcrypt from "bcryptjs";
import { pool } from "../db/pool.js";

function toSlug(s = "") {
  return (String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")) || "org";
}
async function uniqueSlug(conn, base) {
  let slug = base;
  for (let i = 0; i < 25; i++) {
    const [[hit]] = await conn.query("SELECT id FROM organizations WHERE slug=? LIMIT 1", [slug]);
    if (!hit) return slug;
    slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function signup(req, res) {
  const { org_name, name, email, password, plan_code = "starter" } = req.body || {};
  if (!org_name || !name || !email || !password) {
    return res.status(400).json({ ok:false, message:"Missing fields" });
  }

  const BILLING_MODE = (process.env.BILLING_MODE || "off").toLowerCase();

  try {
    // fetch plan id (we still store which plan they picked)
    const [[plan]] = await pool.query("SELECT id FROM plans WHERE code=? LIMIT 1", [plan_code]);
    if (!plan) return res.status(400).json({ ok:false, message:"Invalid plan" });

    const hash = await bcrypt.hash(password, 12);

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // org: immediately active since we're skipping payment now
      const slug = await uniqueSlug(conn, toSlug(org_name));
      const [orgRes] = await conn.query(
        "INSERT INTO organizations (name, slug, plan_id, is_active, billing_customer_id, status, created_at, updated_at) VALUES (?, ?, ?, 1, NULL, 'active', NOW(), NOW())",
        [org_name, slug, plan.id]
      );
      const org_id = orgRes.insertId;

      // user: admin
      let [[roleRow]] = await conn.query("SELECT id FROM roles WHERE code='admin' LIMIT 1");
      if (!roleRow) {
        const [ins] = await conn.query("INSERT INTO roles (code, name) VALUES ('admin','Admin')");
        roleRow = { id: ins.insertId };
      }
      await conn.query(
        "INSERT INTO users (org_id, name, email, password_hash, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [org_id, name, email, hash, roleRow.id]
      );

      // subscription: mark active with a trial window (optional)
      await conn.query(
        `INSERT INTO subscriptions
           (org_id, plan_id, provider, provider_sub_id, status, trial_end,
            current_period_start, current_period_end, cancel_at, created_at, updated_at)
         VALUES (?, ?, 'MANUAL', NULL, 'active',
                 DATE_ADD(NOW(), INTERVAL 14 DAY), NOW(),
                 DATE_ADD(NOW(), INTERVAL 1 MONTH), NULL, NOW(), NOW())`,
        [org_id, plan.id]
      );

      await conn.commit();

      // If later you flip BILLING_MODE=aps, your APS flow can run here instead.
      if (BILLING_MODE === "aps") {
        // (left intentionally empty for now)
      }

      return res.json({ ok: true, next: "/admin" });
    } catch (e) {
      try { await pool.query("ROLLBACK"); } catch {}
      console.error("signup tx error:", e);
      return res.status(500).json({ ok:false, message: e?.sqlMessage || e?.message || "Signup failed" });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ ok:false, message:"Signup failed" });
  }
}

export async function me(_req, res) {
  // later, replace with real auth; for now just keep the console quiet
  return res.status(200).json({ ok: true, authenticated: false });
}
