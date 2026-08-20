const express = require("express");
const auth = require("../../auth/authService");
const { verifyToken } = require("../../auth/Providers/jwt");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const { uploadImageBuffer } = require("../../utils/cloudinary");
const multer  = require('multer')

function fileFilter (req, file, cb) {
  const isImage = String(file.mimetype).startsWith('image/');
  cb(null, isImage);
}

const upload = multer({ storage: multer.memoryStorage(), fileFilter: fileFilter})


const {
  getCards,
  getMyCards,
  getCardsPaginated,
  getMyCardsPaginated,
  getMyFavoriteCardsPaginated,
  getCard,
  createCard,
  updateCard,
  addRating,
  addComment,
  likeCard,
  reportCard,
  deleteReport,
  deleteCard,
  deleteComment,
  getCardByTitle,
} = require("../models/cardsAccessDataService");
const { getUser } = require("../../users/models/usersAccessDataService");
const validateCard = require("../validations/cardValidationService");
const normalizeEditCard = require("../helpers/normalizeEditCard");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return handleError(res, 403, "Authorization Error: רק מנהל יכול לצפות בכל המתכונים");
    }
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await getMyCards(userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/browse", async (req, res) => {
  try {
    const { page, limit, search, category } = req.query;
    const result = await getCardsPaginated({ page, limit, search, category, excludePrivate: true });
    return res.send(result);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards/browse", auth, async (req, res) => {
  try {
    const { page, limit, search, category } = req.query;
    const result = await getMyCardsPaginated(req.user._id, { page, limit, search, category });
    return res.send(result);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-favorites/browse", auth, async (req, res) => {
  try {
    const { page, limit, search, category } = req.query;
    const result = await getMyFavoriteCardsPaginated(req.user._id, { page, limit, search, category });
    return res.send(result);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);

    if (card.isPrivate) {
      const tokenFromClient = req.header("x-auth-token");
      const requester = tokenFromClient ? verifyToken(tokenFromClient) : null;
      const isOwner = requester && String(requester._id) === String(card.user_id);
      if (!isOwner) {
        return handleError(res, 404, "המתכון לא נמצא");
      }
    }

    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, upload.single('image'), async (req, res) => {
  
  try {
    let card = JSON.parse(req.body.form);
    let file = req.file;
    const user = req.user;
  
    const existingCard = await getCardByTitle(card.title);
    if (existingCard) {
      return handleError(res, 409, "Card with this title already exists");
    }


    if (file) {
      const uploadResult = await uploadImageBuffer(file.buffer, "tasting/recipes");
      card.image = { url: uploadResult.secure_url, alt: "" };
    } else {
      card.image = {
        url: `${req.protocol}://${req.get("host")}/images/default-recipe.jpg`,
        alt: "תמונת ברירת מחדל למתכון",
      };
    }

    // Only business accounts may publish a recipe publicly - anyone else's
    // recipes always stay private, regardless of what the client sends.
    card.isPrivate = user.isBusiness ? Boolean(card.isPrivate) : true;

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    card = await normalizeCard(card, user._id);

    card = await createCard(card);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, upload.single('image'), async (req, res) => {
  try {
    let card = JSON.parse(req.body.form);
    let file = req.file;
    const cardId = req.params.id;
    const userId = req.user._id;

    if (userId !== card.user_id) {
      const message =
        "Authorization Error: Only the user who created the business card can update its details";
      return handleError(res, 403, message);
    }

    if (file) {
      const uploadResult = await uploadImageBuffer(file.buffer, "tasting/recipes");
      card.image = { url: uploadResult.secure_url, alt: "" };
    } else {
      delete card.image;
    }

    card.isPrivate = req.user.isBusiness ? Boolean(card.isPrivate) : true;

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    card = await normalizeEditCard(card);
    card = await updateCard(cardId, card);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;

    const card = await likeCard(cardId, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/:id/rate", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return handleError(res, 400, "Rating must be a number between 1 and 5");
    }

    const existingCard = await getCard(cardId);
    if (String(existingCard.user_id) === String(req.user._id)) {
      return handleError(res, 403, "לא ניתן לדרג את המתכון שלך");
    }

    const alreadyRated = existingCard.ratings.some(
      (r) => String(r.user_id) === String(req.user._id)
    );
    if (alreadyRated) {
      return handleError(res, 400, "כבר דירגת את המתכון הזה");
    }

    const card = await addRating(cardId, { user_id: req.user._id, rating });
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/:id/comment", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { text, parentCommentId } = req.body;

    if (!text || text.trim().length < 2) {
      return handleError(res, 400, "תגובה חייבת להכיל לפחות 2 תווים");
    }

    const existingCard = await getCard(cardId);
    const userId = String(req.user._id);

    if (parentCommentId) {
      const parentComment = existingCard.comments.id(parentCommentId);
      if (!parentComment) {
        return handleError(res, 404, "התגובה שאליה מגיבים לא נמצאה");
      }
      if (parentComment.parentCommentId) {
        return handleError(res, 400, "אפשר להגיב רק לתגובה ראשית");
      }
    } else if (!req.user.isAdmin) {
      const alreadyCommented = existingCard.comments.some(
        (c) => !c.parentCommentId && String(c.user_id) === userId
      );
      if (alreadyCommented) {
        return handleError(res, 400, "כבר כתבת תגובה על המתכון הזה");
      }
    }

    const author = await getUser(req.user._id);
    const comment = {
      user_id: req.user._id,
      authorName: `${author.name.first} ${author.name.last}`,
      text: text.trim(),
      parentCommentId: parentCommentId || null,
    };

    const card = await addComment(cardId, comment);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/:id/report", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { reason } = req.body;

    const existingCard = await getCard(cardId);
    const isOwner = String(existingCard.user_id) === String(req.user._id);

    if (existingCard.isPrivate && !isOwner) {
      return handleError(res, 404, "המתכון לא נמצא");
    }
    if (isOwner) {
      return handleError(res, 403, "לא ניתן לדווח על המתכון שלך");
    }

    const alreadyReported = existingCard.reports.some(
      (r) => String(r.user_id) === String(req.user._id)
    );
    if (alreadyReported) {
      return handleError(res, 400, "כבר דיווחת על המתכון הזה");
    }

    const reporter = await getUser(req.user._id);
    await reportCard(cardId, {
      user_id: req.user._id,
      reporterName: `${reporter.name.first} ${reporter.name.last}`,
      reporterEmail: reporter.email,
      reason: (reason || "").trim(),
    });
    return res.send({ reported: true });
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id/report/:reportId", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return handleError(res, 403, "Authorization Error: רק מנהל יכול לסמן דיווח כמטופל");
    }
    const { id, reportId } = req.params;
    const card = await deleteReport(id, reportId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id/comment/:commentId", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return handleError(res, 403, "רק מנהל יכול למחוק תגובות");
    }

    const { id, commentId } = req.params;
    const card = await deleteComment(id, commentId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.user;

    const card = await deleteCard(cardId, user);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
