// src/server.js
import dotenv from "dotenv";
dotenv.config();

console.log("🌿 ENV LOADED:", {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  db: process.env.MYSQL_DB,
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./src/routes/index.js";
import { corsOptions } from "./src/config/cors.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/", routes);

// fallback 404
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "not_found" });
});

// start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
