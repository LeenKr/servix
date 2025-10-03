import { Router } from "express";
import { checkoutAPS } from "../controllers/billing.controller.js";
const r = Router();

r.post("/checkout", checkoutAPS);

export default r;
