
import { pool } from "../db/pool.js";
import { apsVerifySignature } from "../utils/aps.js";

export async function apsWebhook(req, res) {
  const data = req.body || {}; // APS posts as application/x-www-form-urlencoded
  const eventId = data.fort_id || `${data.merchant_reference}:${data.status}:${data.response_code}`;

  // Dedup
  try {
    await pool.query(
      "INSERT INTO webhook_dedup (provider, event_id, seen_at) VALUES ('APS', ?, NOW())",
      [eventId]
    );
  } catch {
    return res.status(200).send("ok"); // already processed
  }

  const valid = apsVerifySignature(data, process.env.APS_SHA_RESPONSE_PHRASE);
  if (!valid) return res.status(400).send("bad sig");

  const success = data.status === "14" || data.status === "02"; // capture/authorize

  const [[inv]] = await pool.query(
    "SELECT * FROM invoices WHERE merchant_reference=?",
    [data.merchant_reference]
  );
  if (!inv) return res.status(200).send("ok"); // swallow but log

  await pool.query(
    `INSERT INTO payments
       (org_id, invoice_id, provider, provider_transaction_id, status, amount_cents, currency, method, raw_payload)
     VALUES (?,?,?,?,?,?,?,?,?)`,
    [inv.org_id, inv.id, 'APS', data.fort_id || data.authorization_code || 'n/a',
     success ? 'success' : 'failed',
     Number(inv.amount), inv.currency || 'USD', 'card', JSON.stringify(data)]
  );

  if (success) {
    await pool.query("UPDATE invoices SET status='paid', paid_at=NOW() WHERE id=?", [inv.id]);
    await pool.query(
      `UPDATE subscriptions
          SET status='active',
              current_period_start=NOW(),
              current_period_end=DATE_ADD(NOW(), INTERVAL 1 MONTH)
        WHERE id=?`,
      [inv.subscription_id]
    );
    await pool.query("UPDATE organizations SET status='active' WHERE id=?", [inv.org_id]);
  } else {
    await pool.query("UPDATE invoices SET status='failed' WHERE id=?", [inv.id]);
    await pool.query("UPDATE subscriptions SET status='past_due' WHERE id=?", [inv.subscription_id]);
  }

  return res.status(200).send("ok");
}
