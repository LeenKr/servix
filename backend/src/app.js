const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("./config/cors");
const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", routes);

app.use((req, res) => res.status(404).json({ error: "Not Found" }));

module.exports = app;
