const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "http://localhost:5173",
      "https://my-tasting.vercel.app",
      "https://my-tasting.com",
      "https://www.my-tasting.com",
    ],
    optionsSuccessStatus: 200,
  })
);

module.exports = app;