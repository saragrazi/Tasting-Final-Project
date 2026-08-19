import Joi from 'joi';

export const contactSchema = {
  name: Joi.string().label("שם מלא").min(2).max(150).required(),
  email: Joi.string()
    .label("אימייל לתגובה")
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'יש להזין כתובת אימייל תקינה' })
    .required(),
  subject: Joi.string().label("נושא הפנייה").min(2).max(150).required(),
  message: Joi.string().label("תוכן הפנייה").min(10).max(2000).required(),
};
