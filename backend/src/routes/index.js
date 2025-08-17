const router = require("express").Router();

router.get("/", (_req, res) => res.json({ message: "Welcome to the Servix API 🚀" }));
router.get("/health", (_req, res) => res.json({ status: "ok" }));

router.use("/auth", require("./auth.routes"));

module.exports = router;
