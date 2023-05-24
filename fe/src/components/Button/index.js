import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledButton,
} from './styles';
import Spinner from '../Spinner';

function Button({
  type, isLoading, disabled, children, ...props
}) {
  return (

    <StyledButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type={type}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  isLoading: false,
  disabled: false,
};
