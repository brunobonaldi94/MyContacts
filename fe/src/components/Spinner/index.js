import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

function Spinner({ size }) {
  return <StyledSpinner size={size} />;
}

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 32,
};
