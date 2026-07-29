import Joi from 'joi';

export const cardSchema = {
  title: Joi.string().label("כותרת").min(2).max(256).required(),
  subtitle: Joi.string().label("תת-כותרת").min(2).max(256).required(),
  ingredients: Joi.string().label("מרכיבים").min(2).max(1024).required(),
  cookingSteps: Joi.string().label("אופן ההכנה").min(2).max(1024).required(),
  category: Joi.string().label("קטגוריה").required(),
  dishImage: Joi.string().label("תמונת מנה").required(),
  user_id: Joi.string().min(2).max(256)
};
export const EditcardSchema = {
  title: Joi.string().label("כותרת").min(2).max(256).required(),
  subtitle: Joi.string().label("תת-כותרת").min(2).max(256).required(),
  ingredients: Joi.string().label("מרכיבים").min(2).max(1024).required(),
  cookingSteps: Joi.string().label("אופן ההכנה").min(2).max(1024).required(),
  category: Joi.string().label("קטגוריה").required(),
  user_id: Joi.string().min(2).max(256)
};


