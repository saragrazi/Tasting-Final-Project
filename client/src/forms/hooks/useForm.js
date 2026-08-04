import { useState, useCallback, useMemo } from "react";
import { object, func } from "prop-types";
import Joi from "joi";
import { validateOptions } from "../utils/joiValidationOptions";

const useForm = (initialForm, schema, handleSubmit) => {
  const [data, setData] = useState(initialForm);
  const [uploadFile,setUploadFile] = useState(null)
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);

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

  const handleBlur = useCallback(
    ({ target }) => {
      const errorMessage = validateProperty(target);
      if (errorMessage) setErrors(prev => ({ ...prev, [target.name]: errorMessage }));
      else
        setErrors(prev => {
          let obj = { ...prev };
          delete obj[target.name];
          return obj;
        });
    },
    [validateProperty]
  );

  const validateForm = useCallback(() => {

    const schemaForValidate = Joi.object(schema);
    const { error } = schemaForValidate.validate(data, validateOptions);
    if (error) return error;
    return null;
  }, [schema, data]);

  const onSubmit = useCallback(async () => {
    setPending(true);
    try {
      await handleSubmit(data, uploadFile);
    } finally {
      setPending(false);
    }
  }, [handleSubmit,uploadFile, data]);

  const value = useMemo(() => {
    return { data, errors };
  }, [data, errors]);

  return {
    value,
    onSubmit,
    handleChange,
    handleBlur,
    handleReset,
    validateForm,
    setData,
    handleFileUpload,
    pending,
  };
};

useForm.propTypes = {
  initialForm: object.isRequired,
  schema: object.isRequired,
  handleSubmit: func.isRequired,
  handleFileUpload: func
};

export default useForm;