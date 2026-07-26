const mongoose = require("mongoose");

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
  reviews: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      comment: {
        type: String,
        trim: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

cardSchema.virtual("averageRating").get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const ratings = this.reviews.map((review) => review.rating || 0);
  const sum = ratings.reduce((acc, value) => acc + value, 0);
  return sum / ratings.length;
});
cardSchema.set("toJSON", { virtuals: true });
cardSchema.set("toObject", { virtuals: true });

cardSchema.index({ title: 1 }, { unique: true });

const Card = mongoose.model("card", cardSchema);

module.exports = Card;