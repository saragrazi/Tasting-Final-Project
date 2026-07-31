import { useState, useCallback, useMemo } from "react";
import { object, func } from "prop-types";
import Joi from "joi";

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

const validateOptions = {
  messages: { he: heMessages },
  errors: { language: "he", wrap: { label: false } },
};

const useForm = (initialForm, schema, handleSubmit) => {
  const [data, setData] = useState(initialForm);
  const [uploadFile,setUploadFile] = useState(null)
  const [errors, setErrors] = useState({});

  const handleReset = useCallback(() => {
    setData(initialForm);
    setErrors({});
  }, [initialForm]);

  const validateProperty = useCallback(
    ({ name, value }) => {
      const obj = { [name]: value };
      const generateSchema = Joi.object({ [name]: schema[name] });
      const { error } = generateSchema.validate(obj, validateOptions);
      return error ? error.details[0].message : null;
    },
    [schema]
  );

  const handleFileUpload = useCallback((e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;
    setUploadFile(files[0]);
    setData(val => ({...val, [name]: files[0].name}));

  },[])

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      const errorMessage = validateProperty(target);
      if (errorMessage) setErrors(prev => ({ ...prev, [name]: errorMessage }));
      else
        setErrors(prev => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });

      setData(prev => ({ ...prev, [name]: value }));
    
    },
    [validateProperty]
  );

  const validateForm = useCallback(() => {

    const schemaForValidate = Joi.object(schema);
    const { error } = schemaForValidate.validate(data, validateOptions);
    if (error) return error;
    return null;
  }, [schema, data]);

  const onSubmit = useCallback(() => {
    handleSubmit(data,uploadFile);
  }, [handleSubmit,uploadFile, data]);

  const value = useMemo(() => {
    return { data, errors };
  }, [data, errors]);

  return {
    value,
    onSubmit,
    handleChange,
    handleReset,
    validateForm,
    setData,
    handleFileUpload,
  };
};

useForm.propTypes = {
  initialForm: object.isRequired,
  schema: object.isRequired,
  handleSubmit: func.isRequired,
  handleFileUpload: func
};

export default useForm;