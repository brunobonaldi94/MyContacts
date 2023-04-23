import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  Overlay,
  Container,
  Footer,
} from './styles';
import Button from '../Button';

function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>titule do modal</h1>
        <p>corpo do mal</p>
        <Footer>
          <button className="cancel-button" type="button">Cancelar</button>
          <Button danger type="button">Deletar</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

export default Modal;

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
