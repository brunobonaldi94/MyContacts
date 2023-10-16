import PropTypes from 'prop-types';
import React from 'react';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import {
  Overlay,
} from './styles';

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
      <Overlay $isLeaving={isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

export default Loader;

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
