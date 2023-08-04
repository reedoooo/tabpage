import React, { useEffect, useState } from 'react';
import { Button, IconButton, Input, Textarea, Flex } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import DeleteNote from '../notes/DeleteNote';

// EditNoteButton component
const EditNoteButton = ({
  initialValues = {},
  onSubmit,
  onClose,
  onDelete,
  noteId,
}) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [notes, setNotes] = useState(initialValues.notes || '');
  console.log(initialValues.id);
  console.log('noteid', noteId);

  useEffect(() => {
    setTitle(initialValues.title || '');
    setNotes(initialValues.notes || '');
  }, [initialValues]);

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit', title, notes, 'initialValues.id', initialValues.id);
    console.log('noteid', noteId);
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
    <Flex flexGrow={1} left="0" justifyContent={'right'}>
      <form width="100%" height="100%">
        <Input
          placeholder="Title"
          name="title"
          bg="white"
          value={title}
          onChange={handleTitleChange}
          overflow="auto"
        />
        <Textarea
          className="notes-textarea"
          placeholder="Write note here..."
          bg="white"
          name="notes"
          value={notes}
          onChange={handleNotesChange}
          overflow="auto"
        />
        <Flex justifyContent="flex-end">
          <IconButton
            aria-label="Save note"
            icon={<EditIcon />}
            size="lg"
            colorScheme="blue"
            onClick={handleButtonSubmit}
            bgGradient="linear(to-r, blue.200, blue.500)"
            _hover={{
              bgGradient: 'linear(to-r, blue.500, blue.200)',
            }}
          />
          <DeleteNote noteId={noteId} handleNoteDeletion={onDelete} />
        </Flex>
      </form>
    </Flex>
  );
};

export default EditNoteButton;
