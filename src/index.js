import React from 'react';
import { createRoot } from 'react-dom/client';
// import "./assets/styles/App.scss";
import App from './App';
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/Auth/authContext';
// import { Auth0ProviderWithHistory } from "./services/auth/auth0-provider-with-history";

const root = document.getElementById('root');
createRoot(root).render(
  <BrowserRouter basename="/">
    <AuthProvider>
      {/* <Auth0ProviderWithHistory> */}

      <React.StrictMode>
        <App />
      </React.StrictMode>
      {/* </Auth0ProviderWithHistory> */}
    </AuthProvider>
  </BrowserRouter>
);

// serviceWorker.unregister();
