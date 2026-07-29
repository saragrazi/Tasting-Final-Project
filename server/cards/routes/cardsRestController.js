const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}.${file.filename}`
    cb(null, `${req.user._id}-${file.originalname}`)
  }
})

function fileFilter (req, file, cb) {
  const extention = (String(file.mimetype).split('/')[1]);
  const acceptedFiles = ['jpg', 'png', 'jpeg']
  for (const file of acceptedFiles) {

    if(extention !== file) {
      
      cb(null, false)
    } else {
      cb(null,true)
    }
  }
  
}

const upload = multer({ dest: 'uploads/',preservePath: true,storage:storage, fileFilter: fileFilter})

const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  addReview,
  likeCard,
  deleteCard,
  getCardByTitle,
} = require("../models/cardsAccessDataService");
const validateCard = require("../validations/cardValidationService");
const normalizeEditCard = require("../helpers/normalizeEditCard");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
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


    card.image = {
      url:  `https://my-tasting.onrender.com/images/${user._id}-${file.originalname}`,
      alt: "",
    }
    
    if (!user.isBusiness)
      return handleError(res, 403, "Authentication Error: Unauthorize user");

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

router.put("/:id", auth, async (req, res) => {
  try {
    let card = req.body;
    const cardId = req.params.id;
    const userId = req.user._id;

    if (userId !== card.user_id) {
      const message =
        "Authorization Error: Only the user who created the business card can update its details";
      return handleError(res, 403, message);
    }

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

router.post("/:id/review", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return handleError(res, 400, "Rating must be a number between 1 and 5");
    }

    const existingCard = await getCard(cardId);
    if (String(existingCard.user_id) === String(req.user._id)) {
      return handleError(res, 403, "לא ניתן לדרג את המתכון שלך");
    }

    const review = {
      user_id: req.user._id,
      comment: comment?.trim() || "",
      rating,
    };

    const card = await addReview(cardId, review);
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
