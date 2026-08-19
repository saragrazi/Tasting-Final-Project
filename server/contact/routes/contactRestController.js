const express = require("express");
const Joi = require("joi");
const auth = require("../../auth/authService");
const { verifyToken } = require("../../auth/Providers/jwt");
const { handleError } = require("../../utils/handleErrors");
const {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
} = require("../models/contactAccessDataService");

const router = express.Router();

const validateContactMessage = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(150).required().messages({
      "any.required": "יש להזין שם מלא",
      "string.empty": "יש להזין שם מלא",
      "string.min": "השם חייב להכיל לפחות {#limit} תווים",
      "string.max": "השם יכול להכיל עד {#limit} תווים",
    }),
    email: Joi.string()
      .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .rule({ message: "יש להזין כתובת אימייל תקינה" })
      .required()
      .messages({
        "any.required": "יש להזין אימייל לקבלת תגובה",
        "string.empty": "יש להזין אימייל לקבלת תגובה",
      }),
    subject: Joi.string().min(2).max(150).required().messages({
      "any.required": "יש להזין נושא לפנייה",
      "string.empty": "יש להזין נושא לפנייה",
      "string.min": "נושא הפנייה חייב להכיל לפחות {#limit} תווים",
      "string.max": "נושא הפנייה יכול להכיל עד {#limit} תווים",
    }),
    message: Joi.string().min(10).max(2000).required().messages({
      "any.required": "יש לפרט את תוכן הפנייה",
      "string.empty": "יש לפרט את תוכן הפנייה",
      "string.min": "תוכן הפנייה חייב להכיל לפחות {#limit} תווים",
      "string.max": "תוכן הפנייה יכול להכיל עד {#limit} תווים",
    }),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const { error } = validateContactMessage({ name, email, subject, message });
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const tokenFromClient = req.header("x-auth-token");
    const requester = tokenFromClient ? verifyToken(tokenFromClient) : null;

    const contactMessage = await createContactMessage({
      user_id: requester?._id,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    return res.status(201).send(contactMessage);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return handleError(res, 403, "Authorization Error: רק מנהל יכול לצפות בפניות");
    }
    const messages = await getContactMessages();
    return res.send(messages);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return handleError(res, 403, "Authorization Error: רק מנהל יכול למחוק פנייה");
    }
    const message = await deleteContactMessage(req.params.id);
    return res.send(message);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
