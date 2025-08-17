const router = require("express").Router();
const c = require("../controllers/auth.controller");

router.post("/login", c.login);
router.get("/me", c.me);
router.post("/logout", c.logout);

module.exports = router;
