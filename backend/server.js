const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// 👇 point to the file you actually have:
const authRoutes = require("./src/routes/auth.routes.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("API on http://localhost:5000"));
