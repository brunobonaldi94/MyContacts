import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  Container,
  Footer,
} from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';

function Modal({
  danger, title, children, cancelLabel, confirmLabel, onCancel, onConfirm, isLoading,
  visible,
}) {
  const ID = 'modal-root';
  const [shouldRender, setShouldRender] = useState(visible);
  const overLayRef = useRef(null);
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
    let timeoutId;
    if (!visible) {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [visible]);
  if (!shouldRender) {
    return null;
  }
  return (
    <ReactPortal
      containerId={ID}
    >
      <Overlay isLeaving={!visible} ref={overLayRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button disabled={isLoading} onClick={onCancel} className="cancel-button" type="button">{cancelLabel}</button>
            <Button isLoading={isLoading} onClick={onConfirm} danger type="button">{confirmLabel}</Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
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
