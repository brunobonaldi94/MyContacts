import {
  useState, useEffect, useCallback, useImperativeHandle,
} from 'react';

import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import categoriesService from '../../services/CategoriesService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const fieldNames = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  category: 'category',
};

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoriesList, setCategoriesList] = useSafeAsyncState([]);
  const [isLoadingCategory, setIsLoadingCategory] = useSafeAsyncState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const loadCategories = useCallback(async (signal) => {
    try {
      setIsLoadingCategory(true);
      const categories = await categoriesService.listCategories(signal);
      setCategoriesList(categories);
    } catch {} finally {
      setIsLoadingCategory(false);
    }
  }, [setCategoriesList, setIsLoadingCategory]);

  useEffect(() => {
    const controller = new AbortController();
    loadCategories(controller.signal);
    return () => {
      controller.abort();
    };
  }, [loadCategories]);

  const isFormValid = (name && errors.length === 0);
  const formHandleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      name, email, phone: phone.replace(/\D/g, ''), categoryId,
    });
    setIsSubmitting(true);
    await onSubmit({
      name, email, phone, categoryId,
    });
    setIsSubmitting(false);
  };

  useImperativeHandle(ref, () => ({
    setFieldValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.categoryId ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setError({ field: fieldNames.name, message: 'Nome é obrigatário' });
    } else {
      removeError(fieldNames.name);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: fieldNames.email, message: 'Email inválido' });
    } else {
      removeError(fieldNames.email);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = formatPhone(e.target.value);
    setPhone(phoneNumber);
    if (!e.target.value) {
      setError({ field: fieldNames.phone, message: 'Telefone é obrigatário' });
    } else {
      removeError(fieldNames.phone);
    }
  };
  return ({
    name,
    formHandleSubmit,
    getErrorMessageByFieldName,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    categoryId,
    setCategoryId,
    isLoadingCategory,
    categoriesList,
    isFormValid,
  });
}
