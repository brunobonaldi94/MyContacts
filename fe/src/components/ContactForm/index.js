import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  ButtonContainer,
} from './styles';
import FormGroup from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';
import Button from '../Button';

function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup
        error="Nome é obrigatório"
      >
        <Input error type="text" placeholder="Nome" />
      </FormGroup>
      <FormGroup>
        <Input type="text" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Input type="text" placeholder="Telefone" />
      </FormGroup>
      <FormGroup>
        <Select>
          <option value="1">Instagram</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">
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
