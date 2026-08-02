const Joi = require ('joi');

const loginValidation = user => {
  const schema = Joi.object ({
    email: Joi.string ()
      .ruleset.pattern (
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule ({message: 'יש להזין כתובת אימייל תקינה'})
      .required (),

    password: Joi.string ()
      .ruleset.regex (
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .rule ({
        message: 'הסיסמה חייבת להכיל לפחות שבעה תווים, אות גדולה, אות קטנה, מספר ואחד מהתווים הבאים: !@#$%^&*-',
      })
      .required (),
  });
  return schema.validate (user);
};

module.exports = loginValidation;