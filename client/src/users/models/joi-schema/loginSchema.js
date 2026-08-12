import Joi from "joi";

const loginSchema = {
  email: Joi.string()
    .label("אימייל")
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'יש להזין כתובת אימייל תקינה' })
    .required(),

  password: Joi.string()
    .label("סיסמה")
    .ruleset.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*-]{8,}$/)
    .rule({
      message: 'יש להקליד 8 תווים לפחות המכילים אותיות באנגלית וספרות',
    })
    .required(),

  rememberMe: Joi.boolean(),
};

export default loginSchema;