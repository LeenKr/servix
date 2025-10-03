import { Router } from "express";
import { signup, me } from "../controllers/auth.controller.js";

const r = Router();
r.post("/signup", signup);
r.get("/me", me || ((_req,res)=>res.status(200).json({ok:true,authenticated:false})));

export default r;
