import React, { useEffect, useState } from 'react';
import { Input, Textarea, IconButton, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNotes } from '../../context/Notes/notesContext';

function CreateNote() {
  const { note, setNote, setAllNotes, setEditing } = useNotes();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState(''); // You forgot to declare this state

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setNotes(note.notes || '');
    } else {
      setTitle('');
      setNotes('');
    }
  }, [note]);

  const handleSave = async (e) => {
    e.preventDefault();
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
      setNote(null);
      setEditing(false);

      setAllNotes((prevNotes) => [...prevNotes, data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Flex direction="column" h="100%">
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
        h="100%"
        overflow="auto"
        note={note}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Flex justifyContent="flex-end">
        <IconButton
          aria-label="Add note"
          icon={<AddIcon />}
          size="lg"
          colorScheme="green"
          onClick={handleSave}
          bgGradient="linear(to-r, green.200, green.500)"
          _hover={{
            bgGradient: 'linear(to-r, green.500, green.200)',
          }}
        />
      </Flex>
    </Flex>
  );
}

export default CreateNote;
