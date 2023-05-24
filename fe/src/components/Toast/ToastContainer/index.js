import {
  Container,
} from './styles';
import ToastMessage from '../ToastMessage';

function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="Default Toast" />
      <ToastMessage type="danger" text="Error Toast" />
      <ToastMessage type="success" text="Success Toast" />
    </Container>
  );
}

export default ToastContainer;
