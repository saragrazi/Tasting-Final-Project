import Joi from "joi";

const editSchema = {
    first: Joi.string().label("שם פרטי").min(2).max(256).required(),
    middle: Joi.string().label("שם אמצעי").min(2).max(256).allow(""),
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
    url: Joi.string()
        .label("כתובת תמונה")
        .ruleset.regex(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        .rule({ message: "יש להזין כתובת תמונה תקינה" })
        .allow(""),
    alt: Joi.string().label("טקסט תמונה").min(2).max(256).allow(""),
    state: Joi.string().label("מדינה").allow(""),
    country: Joi.string().label("ארץ").min(2).max(256).required(),
    city: Joi.string().label("עיר").min(2).max(256).required(),
    street: Joi.string().label("רחוב").min(2).max(256).required(),
    houseNumber: Joi.number().label("מספר בית").allow(""),
    userId: Joi.string(),
    zip: Joi.number().label("מיקוד"),
    isBusiness: Joi.boolean().label("הרשמה כעסק").required(),
};

export default editSchema;