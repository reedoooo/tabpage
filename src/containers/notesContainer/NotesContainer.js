import React from 'react';
import NotesAccordion from '../../components/notes/NotesAccordion';
import {
  Box,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNotes } from '../../context/Notes/notesContext';

function NotesContainer({
  selectedGridItem,
  toggleSelectedGridItem,
  isVisible,
}) {
  const {
    note,
    setNote,
    editing,
    setEditing,
    allNotes,
    handleSaveNote,
    handleUpdateNote,
  } = useNotes(); // Use the custom hook

  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const bgColor = useColorModeValue('blue.400', 'blue.700');

  const closeButtonStyles = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'transparent',
    border: 'none',
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    py: 2,
    px: 6,
    borderRadius: 'md',
  };

  const headerBoxStyles = {
    bg: bgColor,
    color: 'white',
    py: 2,
    px: 6,
    borderRadius: 'md',
  };

  const headingStyles = {
    size: headingSize,
    lineHeight: 'shorter',
  };

  return (
    <Box {...containerStyles}>
      <Box {...headerBoxStyles}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading {...headingStyles}>My Notes</Heading>
          <Button
            background="transparent"
            border="none"
            onClick={(e) => {
              e.stopPropagation();
              toggleSelectedGridItem(null); // change here
            }}
          >
            ×
          </Button>
        </Flex>
      </Box>

      <NotesAccordion
        note={note}
        setNote={setNote}
        editing={editing}
        allNotes={allNotes}
        setEditing={setEditing}
        handleSaveNote={handleSaveNote}
        handleUpdateNote={handleUpdateNote}
        selectedGridItem={selectedGridItem}
        toggleSelectedGridItem={toggleSelectedGridItem}
      />
    </Box>
  );
}

export default NotesContainer;
