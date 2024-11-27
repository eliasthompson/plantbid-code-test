import { createHashRouter } from 'react-router-dom';

import { HomePage } from '@pages/HomePage';

export const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: false,
  },
]);
