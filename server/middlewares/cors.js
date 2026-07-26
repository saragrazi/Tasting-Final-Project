const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://my-tasting.onrender.com"],
    optionsSuccessStatus: 200,
  })
);

module.exports = app;
