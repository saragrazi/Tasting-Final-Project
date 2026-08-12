const Joi = require("joi");

const registerValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object()
      .keys({
        first: Joi.string()
          .min(2)
          .max(256)
          .required()
          .messages({
            "any.required": "שם פרטי הוא שדה חובה",
            "string.empty": "שם פרטי הוא שדה חובה",
            "string.min": "שם פרטי חייב להכיל לפחות {#limit} תווים",
            "string.max": "שם פרטי יכול להכיל עד {#limit} תווים",
          }),
        middle: Joi.string().min(2).max(256).allow("").messages({
          "string.min": "שם אמצעי חייב להכיל לפחות {#limit} תווים",
        }),
        last: Joi.string()
          .min(2)
          .max(256)
          .required()
          .messages({
            "any.required": "שם משפחה הוא שדה חובה",
            "string.empty": "שם משפחה הוא שדה חובה",
            "string.min": "שם משפחה חייב להכיל לפחות {#limit} תווים",
            "string.max": "שם משפחה יכול להכיל עד {#limit} תווים",
          }),
      })
      .required()
      .messages({ "any.required": "יש להזין שם מלא" }),
    isBusiness: Joi.boolean().required().messages({
      "any.required": "יש לבחור אם ההרשמה היא כעסק",
    }),
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)

      .rule({ message: 'יש להזין מספר טלפון תקין' })
      .required(),
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'יש להזין כתובת אימייל תקינה' })
      .required(),
    password: Joi.string()
      .ruleset.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*-]{8,}$/)
      .rule({
        message: 'יש להקליד 8 תווים לפחות המכילים אותיות באנגלית וספרות',
      })
      .required(),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          )
          .rule({ message: "כתובת תמונת המשתמש אינה תקינה" })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow("").messages({
          "string.min": "תיאור התמונה חייב להכיל לפחות {#limit} תווים",
        }),
      })
      .required()
      .messages({ "any.required": "יש להזין פרטי תמונה" }),
    address: Joi.object()
      .keys({
        state: Joi.string().allow(""),
        country: Joi.string().required().messages({
          "any.required": "ארץ היא שדה חובה",
          "string.empty": "ארץ היא שדה חובה",
        }),
        city: Joi.string().required().messages({
          "any.required": "עיר היא שדה חובה",
          "string.empty": "עיר היא שדה חובה",
        }),
        street: Joi.string().required().messages({
          "any.required": "רחוב הוא שדה חובה",
          "string.empty": "רחוב הוא שדה חובה",
        }),
        houseNumber: Joi.number().required().messages({
          "any.required": "מספר בית הוא שדה חובה",
          "number.base": "מספר בית חייב להיות מספר",
        }),
        zip: Joi.number().messages({ "number.base": "מיקוד חייב להיות מספר" }),
      })
      .required()
      .messages({ "any.required": "יש להזין כתובת" }),
    isAdmin: Joi.boolean().allow(""),
  });
  return schema.validate(user);
};

module.exports = registerValidation;
