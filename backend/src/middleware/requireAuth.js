const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

module.exports = function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload; // { id, role, username }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
