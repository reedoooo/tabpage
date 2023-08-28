import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function DeleteNote({ noteId, handleNoteDeletion }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/notes/${noteId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the note is successfully deleted from the server, trigger the handleNoteDeletion callback
      handleNoteDeletion(noteId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // <Flex justifyContent="flex-end" mt={4}>
    <IconButton
      aria-label="Delete note"
      icon={<DeleteIcon />}
      size="lg"
      colorScheme="red"
      onClick={handleDelete}
      bgGradient="linear(to-r, red.200, red.500)"
      _hover={{
        bgGradient: 'linear(to-r, red.500, red.200)',
      }}
    />
    // </Flex>
  );
}

export default DeleteNote;
