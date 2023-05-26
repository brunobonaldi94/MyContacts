import { useEffect, useState } from 'react';
import {
  Container,
} from './styles';
import ToastMessage from '../ToastMessage';

function ToastContainer() {
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = (e) => {
      const { type, text } = e.detail;
      setMessages((prev) => [...prev, { id: Math.random(), type, text }]);
    };
    document.addEventListener('addtoast', handleAddToast);
    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);
  return (
    <Container>
      {messages.map((msg) => (
        <ToastMessage
          key={msg.id}
          text={msg.text}
          type={msg.type}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
