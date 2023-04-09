import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';

import { theme } from './styles/Theme';

import { RouterProvider } from 'react-router-dom';

import { router } from './router';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>

  );
}

export default App;
