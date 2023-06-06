import React from 'react';
import { Button } from "@chakra-ui/react";

function DeleteNote({ noteId, handleNoteDeletion }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/myNotesRoutes/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the note is successfully deleted from the server, trigger the handleNoteDeletion callback
      handleNoteDeletion(noteId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button onClick={handleDelete} colorScheme="red" mt={4}>Delete Note</Button>
  );
}

export default DeleteNote;
