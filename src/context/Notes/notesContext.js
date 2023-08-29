import React, { createContext, useContext, useState } from 'react';

const NotesContext = createContext();

export const useNotes = () => {
  return useContext(NotesContext);
};

export const NotesProvider = ({ children }) => {
  const [allNotes, setAllNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);

  // Function to save a new note
  const handleSaveNote = async (title, notes) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/notes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, notes }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllNotes((prevNotes) => [...prevNotes, data]);
      setNote(null);
      setEditing(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to update an existing note
  const handleUpdateNote = async (updatedData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/notes/${updatedData.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await response.json();
      setAllNotes(allNotes.map((note) => (note.id === data.id ? data : note)));
      setEditing(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to delete a note
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/notes/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const data = await response.json();
      if (data.success) {
        setAllNotes(allNotes.filter((note) => note.id !== id));
      } else {
        throw new Error('Could not delete note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const value = {
    allNotes,
    setAllNotes,
    note,
    setNote,
    editing,
    setEditing,
    handleSaveNote,
    handleUpdateNote,
    handleDeleteNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
