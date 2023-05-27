import { useEffect, useState } from 'react';
import {
  Container,
} from './styles';
import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';

function ToastContainer() {
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      setMessages((prev) => [...prev, { id: Math.random(), type, text }]);
    };
    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);
  function handleRemoveToast(messageId) {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  }
  return (
    <Container>
      {messages.map((msg) => (
        <ToastMessage
          // eslint-disable-next-line react/jsx-no-bind
          onRemoveMessage={handleRemoveToast}
          key={msg.id}
          message={msg}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
