import React from 'react';

import { AppProvider } from './hooks';
import AppRoutes from './routes/app.routes';
import { GlobalStyle } from './styles/global';
import { Toast } from './components';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />
      <Toast />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
