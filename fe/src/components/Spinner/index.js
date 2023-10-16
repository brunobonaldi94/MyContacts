import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

function Spinner({ size = 32 }) {
  return <StyledSpinner size={size} />;
}

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.number,
};
