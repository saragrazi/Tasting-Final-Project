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
    .ruleset.regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .rule({
      message:
        'הסיסמה חייבת להכיל לפחות תשעה תווים, אות גדולה, אות קטנה, מספר ואחד מהתווים הבאים: !@#$%^&*-',
    })
    .required(),
  country: Joi.string().label("ארץ").min(2).max(256).required(),
  city: Joi.string().label("עיר").min(2).max(256).required(),
  street: Joi.string().label("רחוב").min(2).max(256).required(),
  isBusiness: Joi.boolean().label("הרשמה כעסק").required(),
};

export default signupSchema;