import React from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
  useMediaQuery,
  Text,
} from '@chakra-ui/react';
import UpdateNote from './UpdateNote';
import CreateNote from './CreateNote';
import { useNotes } from '../../context/Notes/notesContext';

function NotesAccordion({
  handleSaveNote,
  handleUpdateNote,
  selectedGridItem,
  toggleSelectedGridItem,
  isVisible,
}) {
  const { allNotes, setAllNotes, note, editing, setNote, setEditing } =
    useNotes();
  const bgColor = useColorModeValue('blue.400', 'blue.700');

  const handleNewNote = () => {
    setNote({ title: '', notes: '' });
    setEditing(false);
  };

  const handleExistingNote = (noteItem) => {
    setNote(noteItem);
    setEditing(true);
  };

  const handleDeleteNote = (id) => {
    setAllNotes(allNotes.filter((noteItem) => noteItem.id !== id));
  };

  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const isSelected = (item) =>
    selectedGridItem && selectedGridItem.item === item;

  return (
    <Box
      p={4}
      borderRadius="md"
      border="1px solid"
      borderColor={bgColor}
      width="100%"
      height="100%"
    >
      <Grid templateColumns={isLargerThanMd ? 'repeat(7, 1fr)' : '1fr'} gap={4}>
        <GridItem colSpan={2}>
          <Button
            colorScheme="blue"
            variant="outline"
            width="100%"
            _hover={{ bg: bgColor }}
            onClick={handleNewNote}
          >
            Add Note
          </Button>

          {allNotes.map((noteItem) => (
            <Button
              key={noteItem.id || noteItem._id}
              colorScheme="blue"
              variant="outline"
              width="100%"
              my={2} // margin-top and margin-bottom
              _hover={{ bg: bgColor }}
              onClick={(e) => {
                e.stopPropagation();
                handleExistingNote(noteItem);
              }}
            >
              {noteItem.title}
            </Button>
          ))}
        </GridItem>

        <GridItem colSpan={isLargerThanMd ? 5 : 1}>
          {editing ? (
            <UpdateNote
              setEditing={setEditing}
              id={note?.id}
              isOpen={!!note}
              note={note}
              allNotes={allNotes}
              selectedNote={note}
              setNote={setNote}
              handleDeleteNote={handleDeleteNote}
              handleUpdateNote={handleUpdateNote}
            />
          ) : (
            <CreateNote
              setEditing={setEditing}
              allNotes={allNotes}
              note={note}
              setNote={setNote}
              handleSaveNote={handleSaveNote}
            />
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default NotesAccordion;
