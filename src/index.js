import React from 'react';
import { createRoot } from 'react-dom/client';
// import "./assets/styles/App.scss";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/Auth/authContext';
import { TabsProvider } from './context/Tabs/tabsContext';

const root = document.getElementById('root');
createRoot(root).render(
  <BrowserRouter basename="/">
    <AuthProvider>
      <TabsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </TabsProvider>
    </AuthProvider>
  </BrowserRouter>,
);
