import React from 'react';
import {
  Container,
} from './styles';
import emptyBox from '../../../../assets/images/icons/empty-box.svg';

function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="Empty Box" />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão
        {' '}
        <strong>”Novo contato”</strong>
        {' '}
        à cima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}

export default EmptyList;
