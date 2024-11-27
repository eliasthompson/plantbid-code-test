import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { Layout } from '@components/Layout';
import { GlobalStyle } from '@components/GlobalStyle';
import { router } from '@src/routes';
import { store } from '@store';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyle />

      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Provider>
  </StrictMode>,
);
