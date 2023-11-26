const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");
const { DEFAULT_VALIDATION, URL } = require("../../helpers/mongooseValidators");

const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  category: DEFAULT_VALIDATION,
  ingredients: {
    ...DEFAULT_VALIDATION,
    maxLength: 1500,
  },
  cookingSteps: {
    ...DEFAULT_VALIDATION,
    maxLength: 1500,
  },
  image: {
    url: String,
    alt: String,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;