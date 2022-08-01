const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

const api = require("./api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cors(corsOptions));

app.use("/api", api);

module.exports = app;
