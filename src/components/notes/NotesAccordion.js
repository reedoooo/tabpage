import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
  useMediaQuery,
  Progress,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import UpdateNote from "./UpdateNote";
import CreateNote from "./CreateNote";

function NotesAccordion({
  note,
  setNote,
  editing,
  allNotes,
  setAllNotes,
  setEditing,
  handleSaveNote,
  handleUpdateNote,
}) {
  const bgColor = useColorModeValue("blue.400", "blue.700");

  const handleNewNote = () => {
    setNote({ title: "", notes: "" });
    setEditing(false);
  };

  const handleExistingNote = (noteItem) => {
    setNote(noteItem);
    setEditing(true);
  };

  const handleDeleteNote = (id) => {
    setAllNotes(allNotes.filter((noteItem) => noteItem.id !== id));
  };

  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const headingSize = useBreakpointValue({ base: "sm", md: "lg" });

  return (
    // <Container>
    <>
      <Box bg={bgColor} color="white" py={2} px={6} borderRadius="md">
        <Heading size={headingSize} lineHeight="shorter">
          My Notes
        </Heading>
        {/* <Flex justify="space-between" alignItems="center" mt={10}></Flex> */}
      </Box>
      <Grid
        templateColumns={isLargerThanMd ? "repeat(7, 1fr)" : "1fr"}
        templateRows="repeat(1, 1fr)"
        gap={4}
        p={4}
        // mt={-3}
        bg="rgba(255, 255, 255, 0.5)"
        boxSizing="border-box"
        borderRadius="md"
        id="notes-accordion"
        border="1px solid"
        borderColor={bgColor}
      >
        <GridItem colSpan={2} rowSpan={1}>
          <div className="container">
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
                _hover={{ bg: bgColor }}
                onClick={() => handleExistingNote(noteItem)}
              >
                {noteItem.title}
              </Button>
            ))}
          </div>
        </GridItem>
        <GridItem colSpan={isLargerThanMd ? 5 : 1} rowSpan={1}>
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
    </>
  );
}

export default NotesAccordion;
