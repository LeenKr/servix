// src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { pool } from "../db/pool.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/** tiny local helper so we don’t add extra files now */
function slugify(text = "") {
  const base = String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base || "org";
}

/**
 * POST /auth/signup
 * Body: { org_name, name, email, password, plan_code }  // plan_code: "starter" | "pro"
 *
 * Flow:
 * 1) validate input
 * 2) create org + admin user (transaction)
 * 3) create Stripe customer + checkout session
 * 4) insert a pending subscription
 * 5) set cookie (optional) and return checkout_url
 */
export async function signup(req, res) {
  const conn = await pool.getConnection();
  try {
    const { org_name, name, email, password, plan_code } = req.body || {};

    // --- basic validation ---
    if (!org_name || org_name.trim().length < 2)
      return res.status(400).json({ ok: false, message: "Organization name is required" });

    if (!name || name.trim().length < 2)
      return res.status(400).json({ ok: false, message: "Your name is required" });

    if (!email || !String(email).includes("@"))
      return res.status(400).json({ ok: false, message: "Valid email is required" });

    if (!password || String(password).length < 6)
      return res.status(400).json({ ok: false, message: "Password must be at least 6 characters" });

    // Only support starter/pro now
    if (!["starter", "pro"].includes(plan_code))
      return res.status(400).json({ ok: false, message: "Unknown plan_code (use 'starter' or 'pro')" });

    await conn.beginTransaction();

    // --- find plan ---
    const [planRows] = await conn.query(
      "SELECT id FROM plans WHERE code = ? LIMIT 1",
      [plan_code]
    );
    if (!planRows.length) throw new Error(`Plan not found: ${plan_code}`);
    const planId = planRows[0].id;

    // --- build a unique slug for the org ---
    let slug = slugify(org_name);
    const [taken] = await conn.query("SELECT 1 FROM organizations WHERE slug = ? LIMIT 1", [slug]);
    if (taken.length) slug = `${slug}-${Math.floor(Math.random() * 900 + 100)}`;

    // --- create organization ---
    const [orgRes] = await conn.query(
      "INSERT INTO organizations (name, slug, plan_id, is_active) VALUES (?,?,?,1)",
      [org_name.trim(), slug, planId]
    );
    const orgId = orgRes.insertId;

    // --- get admin role id ---
    const [roleRows] = await conn.query(
      "SELECT id FROM roles WHERE code = 'admin' LIMIT 1"
    );
    if (!roleRows.length) throw new Error("Admin role missing in 'roles' table");
    const adminRoleId = roleRows[0].id;

    // --- enforce unique email (global) ---
    const [exists] = await conn.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email.trim()]);
    if (exists.length) {
      await conn.rollback();
      return res.status(409).json({ ok: false, message: "Email already in use" });
    }

    // --- create admin user ---
    const password_hash = await bcrypt.hash(password, 10);
    const [userRes] = await conn.query(
      `INSERT INTO users (org_id, role_id, name, email, password_hash, status)
       VALUES (?,?,?,?,?,'active')`,
      [orgId, adminRoleId, name.trim(), email.trim(), password_hash]
    );
    const userId = userRes.insertId;

    // --- Stripe: customer + checkout session for subscription ---
    const priceId =
      plan_code === "pro"
        ? process.env.STRIPE_PRICE_PRO
        : process.env.STRIPE_PRICE_STARTER;

    if (!process.env.STRIPE_SECRET_KEY || !priceId) {
      throw new Error("Stripe keys or price IDs are missing from .env");
    }

    const customer = await stripe.customers.create({
      name: org_name.trim(),
      email: email.trim(),
      metadata: { orgId: String(orgId) },
    });

    // store customer id if you have the column
    await conn.query(
      "UPDATE organizations SET billing_customer_id=? WHERE id=?",
      [customer.id, orgId]
    );

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${process.env.FRONTEND_URL}/admin?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/?canceled=1`,
    });

    // --- record a pending subscription (becomes 'active' after payment) ---
    await conn.query(
      `INSERT INTO subscriptions
       (org_id, plan_id, provider, provider_sub_id, status, trial_end, current_period_end)
       VALUES (?,?,?,?, 'pending_payment', NULL, NULL)`,
      [orgId, planId, "stripe", null]
    );

    await conn.commit();

    // --- optional: log the user in now (cookie), so /billing/confirm can read req.user ---
    try {
      const token = jwt.sign(
        { id: userId, orgId, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      const COOKIE_NAME = (process.env.COOKIE_NAME || "servix_token").trim();
      const COOKIE_SECURE = /^(true|1)$/i.test(String(process.env.COOKIE_SECURE || ""));
      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: COOKIE_SECURE,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    } catch {
      // if cookie fails, we still return checkout url
    }

    // --- send Stripe checkout URL back to the frontend ---
    return res.status(201).json({ ok: true, checkout_url: session.url });
  } catch (err) {
    try { await conn.rollback(); } catch {}
    console.error("signup error:", err);
    return res.status(500).json({ ok: false, message: "Failed to sign up" });
  } finally {
    conn.release();
  }
}

// add near your other exports
export async function me(req, res) {
  if (!req.user) return res.status(401).json({ ok: false, message: "Unauthorized" });
  const { id, orgId, role } = req.user;
  return res.json({ ok: true, user: { id, org_id: orgId, role } });
}
