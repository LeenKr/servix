const cors = require("cors");
const { frontendOrigin } = require("./env");
module.exports = cors({ origin: frontendOrigin, credentials: true });
