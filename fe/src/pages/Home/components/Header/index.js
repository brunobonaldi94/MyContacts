/* eslint-disable no-nested-ternary */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Container,
} from './styles';

function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  const alignment = hasError ? 'flex-end'
    : (
      qtyOfContacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container
      justifyContent={alignment}
      noContact={qtyOfFilteredContacts === 0}
    >
      {(!hasError && qtyOfContacts > 0 && qtyOfFilteredContacts === 0) && (
      <strong>
        <p>Nenhum contato encontrado</p>
      </strong>
      )}

      {(!hasError && qtyOfContacts > 0 && qtyOfFilteredContacts > 0) && (
      <strong>
        <p>
          {qtyOfFilteredContacts}
          {' '}
          {qtyOfFilteredContacts === 1 ? 'Contato' : 'Contatos'}
        </p>
      </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

export default Header;

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
};
