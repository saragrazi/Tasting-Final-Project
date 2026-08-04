const heMessages = {
  "any.required": "{#label} הוא שדה חובה",
  "any.only": "{#label} אינו תקין",
  "string.base": "{#label} חייב להיות טקסט",
  "string.empty": "{#label} הוא שדה חובה",
  "string.min": "{#label} חייב להכיל לפחות {#limit} תווים",
  "string.max": "{#label} יכול להכיל עד {#limit} תווים",
  "number.base": "{#label} חייב להיות מספר",
  "number.min": "{#label} חייב להיות לפחות {#limit}",
  "boolean.base": "{#label} חייב להיות ערך בוליאני",
  "array.base": "{#label} חייב להיות רשימה",
  "array.min": "יש להוסיף לפחות {#limit} ל{#label}",
};

export const validateOptions = {
  messages: { he: heMessages },
  errors: { language: "he", wrap: { label: false } },
};
