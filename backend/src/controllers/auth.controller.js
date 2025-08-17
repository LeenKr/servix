const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, nodeEnv } = require("../config/env");

const ADMIN = {
  id: "1",
  username: "admin",
  passwordHash: bcrypt.hashSync("Admin@123", 10),
  role: "admin",
};

exports.login = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  if (username !== ADMIN.username) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, ADMIN.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const payload = { id: ADMIN.id, role: ADMIN.role, username: ADMIN.username };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: nodeEnv === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/", // important for clearing & route scope
  });

  res.json({ user: payload });
};

exports.me = (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const user = jwt.verify(token, jwtSecret);
    res.json({ user });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.logout = (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: nodeEnv === "production",
    path: "/",
  });
  res.json({ message: "Logged out" });
};
