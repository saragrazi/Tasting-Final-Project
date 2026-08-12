import Joi from "joi";

const signupSchema = {
  first: Joi.string().label("שם פרטי").min(2).max(256).required(),
  last: Joi.string().label("שם משפחה").min(2).max(256).required(),
  phone: Joi.string()
    .label("טלפון")
    .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'יש להזין מספר טלפון תקין' })
    .required(),
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
  country: Joi.string().label("ארץ").min(2).max(256).required(),
  city: Joi.string().label("עיר").min(2).max(256).required(),
  street: Joi.string().label("רחוב").min(2).max(256).required(),
  houseNumber: Joi.number().label("מספר בית").required(),
  zip: Joi.number().label("מיקוד").allow(""),
  isBusiness: Joi.boolean().label("הרשמה כעסק").required(),
  rememberMe: Joi.boolean(),
};

export default signupSchema;