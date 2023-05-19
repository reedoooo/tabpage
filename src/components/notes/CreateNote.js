import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";

function CreateNote({ note, setNote }) { // Corrected props
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
      setNote(null); // Reset note after save
      console.log(data);
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
      <Button onClick={handleSave} colorScheme="blue" mt={4}>
        Save
      </Button>
    </div>
  );
}

export default CreateNote;
