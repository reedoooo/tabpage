import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";
import DeleteNote from "../notes/DeleteNote";

// EditNoteButton component
const EditNoteButton = ({ initialValues = {}, onSubmit, onClose, onDelete, noteId }) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [notes, setNotes] = useState(initialValues.notes || "");
  console.log(initialValues.id);
  console.log('noteid', noteId)

  useEffect(() => {
    setTitle(initialValues.title || "");
    setNotes(initialValues.notes || "");
  }, [initialValues]);

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit', title, notes, 'initialValues.id', initialValues.id)
    console.log('noteid', noteId)
    onSubmit({ 
      id: noteId, 
      title: title,
      notes: notes,
     });
  };
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <form>
      <Input
        placeholder="Title"
        name="title"
        bg="white"
        value={title}
        
        onChange={handleTitleChange}
      />
      <Textarea
        className="notes-textarea"
        placeholder="Write note here..."
        bg="white"
        name="notes"
        value={notes}
        onChange={handleNotesChange}
      />
      <Button onClick={handleButtonSubmit} colorScheme="blue" mt={4}>
        Save
      </Button>
      <DeleteNote
        noteId={noteId}
        handleNoteDeletion={onDelete}
      />
    </form>
  );
};

export default EditNoteButton;
