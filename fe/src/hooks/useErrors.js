import { useCallback, useState } from 'react';

const useError = () => {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.find((err) => err.field === field);
    if (errorAlreadyExists) return;
    setErrors((prevState) => [...prevState, { field, message }]);
  }, [errors]);

  const removeError = useCallback((fieldName) => (
    setErrors((prevState) => prevState.filter((err) => err.field !== fieldName))
  ), []);

  const getErrorMessageByFieldName = useCallback((fieldName) => (
    errors.find((err) => err.field === fieldName)?.message
  ), [errors]);

  return {
    errors, setError, removeError, getErrorMessageByFieldName,
  };
};

export default useError;
