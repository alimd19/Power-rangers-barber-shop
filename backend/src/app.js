const express = require("express");
const path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

const api = require("./api");

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// This route serves the React app
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"))
);

app.use("/api", api);

module.exports = app;
