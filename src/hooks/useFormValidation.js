import { useState } from "react";

export const useFormValidation = (initialValues, validators) => {
  
  const [formInputs, setFormInputs] = useState(initialValues);
  //   ["email", "password", "username"] => [{email:null, password:null, username:null}]
  const [errors, setErrors] = useState(
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {}
    )
  );
  const [touched, setTouched] = useState(
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    )
  );

  const validateField = (field, value) => {
    const msg = validators[field](value);
    setErrors((prev) => ({ ...prev, [field]: msg }));
    return !msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };
  // NO ERRORS & NO EMPTY INPUTS
  const formIsValid =
    Object.values(errors).every((err) => !err) &&
    Object.values(formInputs).every((v) => v);

  return {
    formInputs,
    errors,
    touched,
    formIsValid,
    handleChange,
    handleBlur,
  };
};
