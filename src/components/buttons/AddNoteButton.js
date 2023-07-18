import React, { useState } from 'react';
import Tab from './Tab';

const ModalAddNote = ({ onOpen }) => {
  const [addNotes, setAddNotes] = useState([]);

  const handleAddNote = (e) => {
    e.preventDefault();
    const { name, size, color, url, url2 } = e.target.elements;

    if (name.value && size.value && color.value && url.value && url2.value) {
      const note = {
        name: 'notesApp',
      };

      setAddNotes((prevNotes) => [...prevNotes, note]);
    }

    onOpen();
  };

  return (
    <div>
      {addNotes.map((note, index) => (
        <Tab
          key={index}
          as
          onClose={onOpen}
          onSubmit={handleAddNote}
          id="add-note-button"
          imgUrl="https://images.unsplash.com/photo-1612837017391-4b6b7b0b0b0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          backgroundColor="rgba(128, 0, 128, 0.5)" // rgba equivalent of purple.500 with 50% opacity
          color="white"
          onClick={onOpen}
        />
      ))}
    </div>
  );
};

export default ModalAddNote;
