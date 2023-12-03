const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const userName = config.get("DB_NAME");
const password = config.get("DB_PASSWORD");

mongoose.set('strictQuery', false);
mongoose
  .connect(
    `mongodb://localhost:27017/${userName}:${password}@david_Tasting`
  )
  .then(() => console.log(chalk.magentaBright("connected to MongoDb Locally!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );
  mongoose.connection.once('open', () => {
    mongoose.connection.db.collection('cards').createIndex({ title: 1 }, { unique: true });
  });