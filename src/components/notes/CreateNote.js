import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";

function CreateNote({
  note,
  setNote,
  setAllNotes,
  setEditing,
  handleSaveNote,
  newNote, // Additional prop to check if a new note is added
}) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setNotes(note.notes || "");
    } else {
      setTitle("");
      setNotes("");
    }
  }, [note]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/myNotesRoutes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, notes }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNote(null);
      setEditing(false);
      handleSaveNote(data);

      if (newNote) {
        // Check if a new note is added
        setAllNotes((prevNotes) => [...prevNotes, data]); // Update the allNotes state with the new note
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Input
        variant="filled"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        variant="filled"
        className="notes-textarea"
        placeholder="Write note here..."
        note={note}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button onClick={handleSave} colorScheme="green" mt={4}>
        Add
      </Button>
    </div>
  );
}

export default CreateNote;
