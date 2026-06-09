const Joi = require("joi");

const validateCardWithJoi = card => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    ingredients: Joi.string().min(2).max(1024).required(),
    cookingSteps: Joi.string().min(2).max(1024).required(),
    category: Joi.string().min(2).max(1024).required(),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      ,
    user_id: Joi.string().allow(""),
  });

  return schema.validate(card);
};

module.exports = validateCardWithJoi;
