const mongoose = require("mongoose");

const { DEFAULT_VALIDATION, URL } = require("../../helpers/mongooseValidators");
const { MEASURING_CUP_OPTIONS } = require("../../helpers/measuringCupOptions");

const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
  subtitle: {
    type: String,
    trim: true,
    maxLength: 256,
    default: "",
  },
  inspiredBy: {
    type: String,
    trim: true,
    maxLength: 256,
    default: "",
    validate: {
      validator: (value) => !value || value.trim().length >= 2,
      message: "בהשראת חייב להכיל לפחות 2 תווים",
    },
  },
  category: DEFAULT_VALIDATION,
  ingredients: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 256,
      },
      quantity: {
        type: Number,
        min: 0,
        default: null,
      },
    },
  ],
  cookingSteps: {
    ...DEFAULT_VALIDATION,
    maxLength: 1500,
  },
  prepTime: {
    type: Number,
    min: 1,
    default: null,
  },
  measuringCup: {
    type: String,
    enum: MEASURING_CUP_OPTIONS,
    default: null,
  },
  tips: {
    type: String,
    trim: true,
    maxLength: 1500,
    default: "",
    validate: {
      validator: (value) => !value || value.trim().length >= 2,
      message: "טיפים חייב להכיל לפחות 2 תווים",
    },
  },
  videoLink: {
    type: String,
    trim: true,
    default: "",
    validate: {
      validator: function (value) {
        if (!value) return true;
        return URL.match.test(value);
      },
      message: "video link must be a valid url",
    },
  },
  image: {
    url: String,
    alt: String,
  },
  images: {
    type: [
      {
        url: String,
        alt: String,
      },
    ],
    validate: {
      validator: (value) => !value || value.length <= 3,
      message: "ניתן להעלות עד 3 תמונות למתכון",
    },
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  likes: [String],
  reports: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      reporterName: {
        type: String,
        trim: true,
      },
      reporterEmail: {
        type: String,
        trim: true,
      },
      reason: {
        type: String,
        trim: true,
        maxLength: 500,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  ratings: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      authorName: {
        type: String,
        trim: true,
      },
      text: {
        type: String,
        trim: true,
        required: true,
        maxLength: 1000,
      },
      parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
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
  authorName: {
    type: String,
    trim: true,
  },
});

cardSchema.virtual("averageRating").get(function () {
  if (!this.ratings || this.ratings.length === 0) return 0;
  const values = this.ratings.map((r) => r.rating || 0);
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
});
cardSchema.set("toJSON", { virtuals: true });
cardSchema.set("toObject", { virtuals: true });

const Card = mongoose.model("card", cardSchema);

module.exports = Card;