import PropTypes from 'prop-types';

import {
  Container,
} from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({
  onRemoveMessage, message,
}) {
  const { id, text, type } = message;
  const handleRemoveMessage = () => {
    onRemoveMessage(id);
  };
  return (
    <Container type={type} onClick={handleRemoveMessage}>
      {type !== 'default'
        && (
          <img src={type === 'success' ? checkCircleIcon : xCircleIcon} alt="Icon" />
        )}
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
  }).isRequired,
};
