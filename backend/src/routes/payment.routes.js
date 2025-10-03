import { Router } from "express";
import bodyParser from "body-parser";
import { apsWebhook } from "../controllers/payment.controller.js";
const r = Router();

/** APS sends application/x-www-form-urlencoded */
r.post("/webhooks/aps", bodyParser.urlencoded({ extended: false }), apsWebhook);

export default r;
