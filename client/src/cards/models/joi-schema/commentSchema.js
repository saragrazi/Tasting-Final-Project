import Joi from 'joi';

export const commentSchema = {
  text: Joi.string().label('תגובה').min(2).max(1000).required(),
};
