import { Button, Input, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function UpdateNote({ id, onClose, isOpen, selectedNote, allNotes, setNote }) {
  const [localNote, setLocalNote] = useState(selectedNote);
  
  useEffect(() => {
    setLocalNote(selectedNote);
  }, [selectedNote]);

  const handleSubmit = async () => {
    const id = localNote.id;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/myNotesRoutes/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...localNote }),
        }
      );
      setNote(localNote);
      onClose();
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    setLocalNote({
      ...localNote,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async () => {
    const id = localNote.id;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/myNotesRoutes/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      onClose();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <Input
          name="title" 
          value={localNote.title} 
          onChange={handleInputChange} 
        />
        <Textarea
          name="notes" 
          value={localNote.notes} 
          onChange={handleInputChange} 
        />
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </>
  );
}
  
export default UpdateNote;
