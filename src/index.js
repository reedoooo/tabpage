import React from 'react';
import { createRoot } from 'react-dom/client';
// import "./assets/styles/App.scss";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TabsProvider } from './context/Tabs/tabsContext';
import { NotesProvider } from './context/Notes/notesContext';
import { ToDoListProvider } from './context/Todo/todoListContext';
import AuthProvider from './context/Auth/authContext';

const root = document.getElementById('root');
createRoot(root).render(
  <BrowserRouter basename="/">
    <AuthProvider>
      <TabsProvider>
        <NotesProvider>
          <ToDoListProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ToDoListProvider>
        </NotesProvider>
      </TabsProvider>
    </AuthProvider>
  </BrowserRouter>,
);
