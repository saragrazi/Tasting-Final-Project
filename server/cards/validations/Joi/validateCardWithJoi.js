const Joi = require("joi");
const { MEASURING_CUP_OPTIONS } = require("../../helpers/measuringCupOptions");

const validateCardWithJoi = card => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().label("שם המרכיב").min(1).max(256).required(),
          quantity: Joi.number().label("כמות").min(0).allow(null),
        })
      )
      .min(1)
      .required(),
    cookingSteps: Joi.string().min(2).max(1024).required(),
    category: Joi.string().min(2).max(1024).required(),
    prepTime: Joi.number().integer().min(1).required(),
    measuringCup: Joi.string()
      .valid(...MEASURING_CUP_OPTIONS)
      .allow(null)
      .required(),
    tips: Joi.string().min(2).max(1500).required(),
    videoLink: Joi.string().ruleset.regex(urlRegex).rule({ message: "video link must be a valid url" }).allow(""),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      ,
    user_id: Joi.string().allow(""),
    authorName: Joi.string().allow(""),
  });

  return schema.validate(card);
};

module.exports = validateCardWithJoi;
