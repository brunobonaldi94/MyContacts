import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  Overlay,
  Container,
  Footer,
} from './styles';
import Button from '../Button';

function Modal({
  danger, title, children, cancelLabel, confirmLabel, onCancel, onConfirm, isLoading,
  visible,
}) {
  if (!visible) {
    return null;
  }
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <div className="modal-body">
          {children}
        </div>
        <Footer>
          <button disabled={isLoading} onClick={onCancel} className="cancel-button" type="button">{cancelLabel}</button>
          <Button isLoading={isLoading} onClick={onConfirm} danger type="button">{confirmLabel}</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

export default Modal;

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  isLoading: false,
};
