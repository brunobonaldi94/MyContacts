import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/theme/default';
import {
  Container,
} from './styles';
import Header from '../Header';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Container>
        <Header />
      </Container>
    </ThemeProvider>
  );
}

export default App;
