import PropTypes from 'prop-types';

import {
  Container,
} from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {type !== 'default'
        && (
          <img src={type === 'success' ? checkCircleIcon : xCircleIcon} alt="Icon" />
        )}
      <strong>{text}</strong>
    </Container>
  );
}

export default ToastMessage;

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'default']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
