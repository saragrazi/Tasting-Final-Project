const mongoose = require("mongoose");
const Card = require("./mongodb/Card");
const { handleBadRequest } = require("../../utils/handleErrors");

const DB = process.env.DB || "MONGODB";
const DEFAULT_PAGE_SIZE = 40;

const getCardByTitle = async (title) => {
  try {

    const existingCard = await Card.findOne({ title });

    return existingCard;
  } catch (error) {
    throw error;
  }
};

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get cards not in mongodb");
};

const getMyCards = async userId => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find({ user_id: userId });
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in mongodb");
};

const getCardsPaginated = async ({
  page = 1,
  limit = DEFAULT_PAGE_SIZE,
  search = "",
  category = "",
  matchExtra = {},
} = {}) => {
  if (DB === "MONGODB") {
    try {
      const match = { ...matchExtra };
      if (category) match.category = category;
      if (search) match.title = { $regex: search, $options: "i" };

      const pageSize = Number(limit) || DEFAULT_PAGE_SIZE;
      const pageNumber = Math.max(1, Number(page) || 1);
      const skip = (pageNumber - 1) * pageSize;

      const [result] = await Card.aggregate([
        { $match: match },
        {
          $addFields: {
            averageRating: { $ifNull: [{ $avg: "$ratings.rating" }, 0] },
            ratingsCount: { $size: { $ifNull: ["$ratings", []] } },
          },
        },
        { $sort: { averageRating: -1, ratingsCount: -1 } },
        {
          $facet: {
            cards: [{ $skip: skip }, { $limit: pageSize }],
            totalCount: [{ $count: "count" }],
          },
        },
      ]);

      const cards = result?.cards || [];
      const total = result?.totalCount?.[0]?.count || 0;
      return Promise.resolve({ cards, total });
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({ cards: [], total: 0 });
};

const getMyCardsPaginated = (userId, options = {}) =>
  getCardsPaginated({
    ...options,
    matchExtra: { user_id: new mongoose.Types.ObjectId(userId) },
  });

const getMyFavoriteCardsPaginated = (userId, options = {}) =>
  getCardsPaginated({
    ...options,
    matchExtra: { likes: userId },
  });

const getCard = async cardId => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      if (!card) throw new Error("Could not find this card in the database");
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in mongodb");
};

const createCard = async normalizedCard => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(normalizedCard);
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("createCard card not in mongodb");
};

const addRating = async (cardId, rating) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findByIdAndUpdate(
        cardId,
        { $push: { ratings: rating } },
        { new: true }
      );
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("addRating card not in mongodb");
};

const addComment = async (cardId, comment) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findByIdAndUpdate(
        cardId,
        { $push: { comments: comment } },
        { new: true }
      );
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("addComment card not in mongodb");
};

const deleteComment = async (cardId, commentId) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findByIdAndUpdate(
        cardId,
        {
          $pull: {
            comments: {
              $or: [{ _id: commentId }, { parentCommentId: commentId }],
            },
          },
        },
        { new: true }
      );
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("deleteComment card not in mongodb");
};

const updateCard = async (cardId, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updateCard not in mongodb");
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      const existingCard = await Card.findById(cardId);
      if (!existingCard)
        throw new Error("A card with this ID cannot be found in the database");

      const hasLiked = existingCard.likes.some((id) => id === userId);

      const card = await Card.findByIdAndUpdate(
        cardId,
        hasLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } },
        { new: true }
      );

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card likeCard not in mongodb");
};

const deleteCard = async (cardId, user) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");
   
        
        if (!(user.isAdmin || String(user._id) === String(card.user_id))) {
          throw new Error("Authorization Error: Only the user who created the business card or admin can delete this card");
        }
        
        

      card = await Card.findByIdAndDelete(cardId);

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCardsPaginated = getCardsPaginated;
exports.getMyCardsPaginated = getMyCardsPaginated;
exports.getMyFavoriteCardsPaginated = getMyFavoriteCardsPaginated;
exports.getCard = getCard;
exports.createCard = createCard;
exports.addRating = addRating;
exports.addComment = addComment;
exports.deleteComment = deleteComment;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
exports.getCardByTitle = getCardByTitle;
