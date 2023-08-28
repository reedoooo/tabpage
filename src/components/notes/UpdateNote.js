import React, { useEffect } from 'react';
import { useNotes } from '../../context/Notes/notesContext';
import EditNoteButton from '../modals/EditNoteButton';

function UpdateNote({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
  isOpen,
  selectedNote = {},
  id,
  handleUpdateNote,
  handleDeleteNote,
}) {
  const { note, setNote, setEditing, allNotes } = useNotes();

  useEffect(() => {
    setNote(selectedNote);
  }, [selectedNote, setNote]);

  const handleSubmit = async (note) => {
    console.log('note', note);
    if (!note.id) {
      console.log('Note or id is undefined');
      return;
    }

    const updatedData = {
      id: note.id,
      title: note.title,
      notes: note.notes,
    };

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
      console.log('data', data);

      handleUpdateNote(data); // Update the note in your application state
      setEditing(false);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    if (!note) return;

    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    if (!selectedNote.id) {
      console.log('selectedNote or id is undefined');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/notes/${selectedNote.id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await response.json();
      console.log('data', data);
      handleDeleteNote(selectedNote.id);
      setEditing(false);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="container"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <EditNoteButton
        onClose={onClose}
        onDelete={handleDelete}
        initialValues={{ title: note.title, notes: note.notes, id: note.id }}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        note={note}
        noteId={id}
        allNotes={allNotes}
        setNote={setNote}
        handleUpdateNote={handleUpdateNote}
        setEditing={setEditing}
      />
    </div>
  );
}

export default UpdateNote;
