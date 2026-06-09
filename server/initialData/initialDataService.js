const chalk = require("chalk");
const normalizeCard = require("../cards/helpers/normalizeCard");
const {
  createCard,
  getCardByTitle,
} = require("../cards/models/cardsAccessDataService");
const { registerUser } = require("../users/models/usersAccessDataService");
const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const { generateUserPassword } = require("../users/helpers/bcrypt");

const generateInitialCards = async () => {
  const { cards } = data;
  for (const cardData of cards || []) {
    try {
      const existingCard = await getCardByTitle(cardData.title);
      if (existingCard) continue;

      const userId = "6376274068d78742d84f31d2";
      const card = await normalizeCard(cardData, userId);
      await createCard(card);
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  }
};

const generateInitialUsers = async () => {
  const { users } = data;
  for (const userData of users || []) {
    try {
      const normalizedUser = await normalizeUser(userData);
      normalizedUser.password = generateUserPassword(normalizedUser.password);
      await registerUser(normalizedUser);
    } catch (error) {
      if (error.message !== "User already registered") {
        console.log(chalk.redBright(error.message));
      }
    }
  }
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;