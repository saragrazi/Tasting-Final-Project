import Joi from 'joi';

export const cardSchema = {
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  ingredients: Joi.string().min(2).max(1024).required(),
  cookingSteps: Joi.string().min(2).max(1024).required(),
  category: Joi.string().required(),
  dishImage: Joi.string().required(),
  user_id: Joi.string().min(2).max(256)
};
export const EditcardSchema = {
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  ingredients: Joi.string().min(2).max(1024).required(),
  cookingSteps: Joi.string().min(2).max(1024).required(),
  category: Joi.string().required(),
  user_id: Joi.string().min(2).max(256)
};


