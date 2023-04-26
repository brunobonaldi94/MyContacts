import { useState } from 'react';

const userError = () => {
  const [errors, setErrors] = useState([]);

  const setError = ({ field, message }) => {
    const errorAlreadyExists = errors.find((err) => err.field === field);
    if (errorAlreadyExists) return;
    setErrors((prevState) => [...prevState, { field, message }]);
  };

  const removeError = (fieldName) => (
    setErrors((prevState) => prevState.filter((err) => err.field !== fieldName))
  );

  const getErrorMessageByFieldName = (fieldName) => (
    errors.find((err) => err.field === fieldName)?.message
  );

  return {
    errors, setError, removeError, getErrorMessageByFieldName,
  };
};

export default userError;
