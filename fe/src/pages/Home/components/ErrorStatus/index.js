import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
} from './styles';
import Button from '../../../../components/Button';
import sad from '../../../../assets/images/icons/sad.svg';

function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos.</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar Novamente
        </Button>
      </div>
    </Container>
  );
}

export default ErrorStatus;

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
