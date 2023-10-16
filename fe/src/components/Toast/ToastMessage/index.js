import PropTypes from 'prop-types';
import { useEffect } from 'react';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import {
  Container,
} from './styles';

function ToastMessage({
  onRemoveMessage,
  message,
  isLeaving,
  animatedRef,
}) {
  const {
    id, text, type, duration,
  } = message;

  const handleRemoveMessage = () => {
    onRemoveMessage(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemoveMessage(id);
    }, duration || 7000);
    return () => {
      clearTimeout(timer);
    };
  }, [onRemoveMessage, duration, id]);

  return (
    <Container
      tabIndex={0}
      type={type}
      onClick={handleRemoveMessage}
      role="button"
      $isLeaving={isLeaving}
      ref={animatedRef}
    >
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}

export default ToastMessage;

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'default']),
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
