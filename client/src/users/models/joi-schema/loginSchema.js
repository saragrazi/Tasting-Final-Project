import Joi from "joi";

const loginSchema = {
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
        'הסיסמה חייבת להכיל לפחות שבעה תווים, אות גדולה, אות קטנה, מספר ואחד מהתווים הבאים: !@#$%^&*-',
    })
    .required(),
};

export default loginSchema;