import React from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
} from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

function Loader({ isLoading }) {
  const { shoudlRender, animatedElementRef } = useAnimatedUnmount(isLoading);
  const ID = 'loader-root';
  if (!shoudlRender) {
    return null;
  }

  return (
    <ReactPortal
      containerId={ID}
    >
      <Overlay isLeaving={isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

export default Loader;

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
