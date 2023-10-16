import { memo, useEffect } from 'react';
import useAnimatedList from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import {
  Container,
} from './styles';

function ToastContainer() {
  // eslint-disable-next-line no-unused-vars
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList();

  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      setMessages((prev) => [...prev, { id: Math.random(), type, text }]);
    };
    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);
  return (
    <Container>
      {renderList((msg, { animatedRef, isLeaving }) => (
        <ToastMessage
          onRemoveMessage={handleRemoveItem}
          animatedRef={animatedRef}
          key={msg.id}
          message={msg}
          isLeaving={isLeaving}
        />
      )) }
    </Container>
  );
}

export default memo(ToastContainer);
