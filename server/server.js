const chalk = require("chalk");
const express = require("express");
const app = express();
app.set("trust proxy", 1);
const { handleError } = require("./utils/handleErrors");
const router = require("./router/router");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const connectToDb = require("./DB/dbService");
const config = require("config");
const { seedInitialData } = require("./initialData/initialDataService");

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.static("./public"));

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = config.get("PORT");

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Listening on: https://my-tasting.onrender.com`));
  connectToDb();
  await seedInitialData();
});
