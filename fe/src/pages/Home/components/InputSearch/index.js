import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
} from './styles';

function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquise pelo nome"
      />
    </Container>
  );
}

export default InputSearch;

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
