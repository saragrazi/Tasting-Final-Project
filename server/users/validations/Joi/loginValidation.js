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
      .ruleset.regex (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*-]{8,}$/)
      .rule ({
        message: 'יש להקליד 8 תווים לפחות המכילים אותיות באנגלית וספרות',
      })
      .required (),
  });
  return schema.validate (user);
};

module.exports = loginValidation;