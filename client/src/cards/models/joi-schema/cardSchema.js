import Joi from 'joi';
import MEASURING_CUP_OPTIONS from '../measuringCupOptions';

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const cardSchema = {
  title: Joi.string().label("שם המתכון").min(2).max(256).required(),
  subtitle: Joi.string().label("תאור קצר").min(2).max(256).required(),
  ingredients: Joi.array()
    .label("מרכיבים")
    .items(
      Joi.object({
        name: Joi.string().label("שם המרכיב").min(1).max(256).required(),
        quantity: Joi.number().label("כמות").min(0).allow(null),
      })
    )
    .min(1)
    .required(),
  cookingSteps: Joi.string().label("אופן ההכנה").min(2).max(1024).required(),
  category: Joi.string().label("קטגוריה").required(),
  prepTime: Joi.number().label("זמן הכנה (בדקות)").integer().min(1).required(),
  measuringCup: Joi.string().label("כוס מדידה").valid(...MEASURING_CUP_OPTIONS).allow(null).required(),
  tips: Joi.string().label("טיפים").min(2).max(1500).required(),
  videoLink: Joi.string()
    .label("קישור לוידאו")
    .ruleset.regex(urlRegex)
    .rule({ message: 'יש להזין קישור תקין לוידאו' })
    .allow(""),
  dishImage: Joi.string().label("תמונת מנה").allow(""),
  user_id: Joi.string().min(2).max(256)
};
export const EditcardSchema = {
  title: Joi.string().label("שם המתכון").min(2).max(256).required(),
  subtitle: Joi.string().label("תאור קצר").min(2).max(256).required(),
  ingredients: Joi.array()
    .label("מרכיבים")
    .items(
      Joi.object({
        name: Joi.string().label("שם המרכיב").min(1).max(256).required(),
        quantity: Joi.number().label("כמות").min(0).allow(null),
      })
    )
    .min(1)
    .required(),
  cookingSteps: Joi.string().label("אופן ההכנה").min(2).max(1024).required(),
  category: Joi.string().label("קטגוריה").required(),
  prepTime: Joi.number().label("זמן הכנה (בדקות)").integer().min(1).required(),
  measuringCup: Joi.string().label("כוס מדידה").valid(...MEASURING_CUP_OPTIONS).allow(null).required(),
  tips: Joi.string().label("טיפים").min(2).max(1500).required(),
  videoLink: Joi.string()
    .label("קישור לוידאו")
    .ruleset.regex(urlRegex)
    .rule({ message: 'יש להזין קישור תקין לוידאו' })
    .allow(""),
  dishImage: Joi.string().label("תמונת מנה").allow(""),
  user_id: Joi.string().min(2).max(256)
};


