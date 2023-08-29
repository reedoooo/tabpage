import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNotes } from '../../context/Notes/notesContext';

const CreateNote = () => {
  const { handleSaveNote } = useNotes();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSaveNote(title, notes);
  };

  const handleChange = (setter) => (e) => {
    e.stopPropagation(); // Stop propagation here
    setter(e.target.value);
  };

  return (
    <Box
      as="section"
      p={4}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      backgroundColor={bgColor}
    >
      <form onSubmit={handleSubmit}>
        <FormControl id="note-title" mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={handleChange(setTitle)}
            placeholder="Title"
            borderRadius="md"
          />
        </FormControl>

        <FormControl id="note-content" mb={4}>
          <FormLabel>Note Content</FormLabel>
          <Textarea
            value={notes}
            onChange={handleChange(setNotes)}
            placeholder="Write your note..."
            borderRadius="md"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default CreateNote;
