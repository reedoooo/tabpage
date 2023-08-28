import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for notes
const NotesContext = createContext();

// Custom hook to use the NotesContext
export const useNotes = () => {
  return useContext(NotesContext);
};

// Provider component
export const NotesProvider = ({ children }) => {
  const [allNotes, setAllNotes] = useState([]); // Store for all notes
  const [note, setNote] = useState(null); // Store for a single note
  const [editing, setEditing] = useState(false); // Editing state

  // Fetch all notes when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/api/notes`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllNotes(data);
      } catch (error) {
        console.error('There was a problem fetching note data:', error);
      }
    };

    fetchData();
  }, []);

  const value = {
    allNotes,
    setAllNotes,
    note,
    setNote,
    editing,
    setEditing,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
