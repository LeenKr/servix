import { pool } from "../db/pool.js";
import { apsSign } from "../utils/aps.js";

export async function checkoutAPS(req, res) {
  const { invoice_id, customer_email } = req.body || {};
  if (!invoice_id || !customer_email) return res.status(400).json({ ok:false, message:"Missing fields" });

  const [[inv]] = await pool.query(
    `SELECT i.*, o.id AS org_id
       FROM invoices i
       JOIN organizations o ON o.id=i.org_id
      WHERE i.id=?`, [invoice_id]
  );
  if (!inv) return res.status(404).json({ ok:false, message:"Invoice not found" });

  const env = process.env.APS_ENV === "live" ? "checkout" : "sbcheckout";
  const paymentPageURL = `https://${env}.payfort.com/FortAPI/paymentPage`;

  const params = {
    command: "PURCHASE",
    access_code: process.env.APS_ACCESS_CODE,
    merchant_identifier: process.env.APS_MERCHANT_ID,
    merchant_reference: inv.merchant_reference,
    amount: inv.amount,
    currency: inv.currency || process.env.APS_CURRENCY || "USD",
    language: process.env.APS_LANGUAGE || "en",
    customer_email,
    return_url: process.env.APS_RETURN_URL
  };

  const signature = apsSign(params, process.env.APS_SHA_REQUEST_PHRASE);

  await pool.query(
    "INSERT INTO payment_sessions (invoice_id, provider, status, created_at) VALUES (?, 'APS', 'pending', NOW())",
    [invoice_id]
  );

  return res.json({ ok:true, paymentPageURL, params: { ...params, signature } });
}
