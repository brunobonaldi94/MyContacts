import React from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
} from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

function Loader({ isLoading }) {
  const ID = 'loader-root';
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal
      containerId={ID}
    >
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

export default Loader;

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
