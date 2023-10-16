import React, {
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  ButtonContainer,
} from './styles';
import FormGroup from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';
import Button from '../Button';

import useContactForm from './useContactForm';

const fieldNames = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  category: 'category',
};

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
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
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={formHandleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName(fieldNames.name)}>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName(fieldNames.name)}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName(fieldNames.email)}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName(fieldNames.email)}
          disabled={isSubmitting}
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
          disabled={isSubmitting}

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
          disabled={isLoadingCategory || isSubmitting}

        >
          <option value="">Sem Categoria</option>
          {categoriesList.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

export default ContactForm;

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,

};
