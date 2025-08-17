require("dotenv").config();
module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "change_me_in_env",
  frontendOrigin: process.env.ORIGIN || "http://localhost:5173",
};
