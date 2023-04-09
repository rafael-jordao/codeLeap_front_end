import { createBrowserRouter } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Main from './pages/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
  },
  {
    path: 'feed',
    element: <Main />,
  },
]);
