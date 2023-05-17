import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  ButtonContainer,
} from './styles';
import FormGroup from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';
import userErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import categoriesService from '../../services/CategoriesService';

const fieldNames = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  category: 'category',
};

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = userErrors();

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategory(true);
      const categories = await categoriesService.listCategories();
      setCategoriesList(categories);
    } catch {} finally {
      setIsLoadingCategory(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const isFormValid = (name && errors.length === 0);
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      name, email, phone: phone.replace(/\D/g, ''), categoryId,
    });
  };

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

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName(fieldNames.name)}>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName(fieldNames.name)}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName(fieldNames.email)}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName(fieldNames.email)}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName(fieldNames.phone)}>
        <Input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          error={getErrorMessageByFieldName(fieldNames.phone)}
          maxLength={15}
        />
      </FormGroup>
      <FormGroup
        error={getErrorMessageByFieldName(fieldNames.category)}
        isLoading={isLoadingCategory}
      >
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          error={getErrorMessageByFieldName(fieldNames.category)}
          disabled={isLoadingCategory}
        >
          <option value="">Sem Categoria</option>
          {categoriesList.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
