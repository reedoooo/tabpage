import React, { useState } from "react";
import { GridItem, Button, Input, Textarea } from "@chakra-ui/react";
import "./notesContainer.css";

function NotesContainer() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/myNotesRoutes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, notes }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <GridItem width="100%" height="100%" boxSizing="border-box">
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button onClick={handleSave} colorScheme="blue" mt={4}>
            Save
          </Button>
        </div>
      </GridItem>
    </>
  );
}

export default NotesContainer;
