import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  useColorModeValue,
  useMediaQuery,
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
  const buttonColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("teal.200", "teal.700");

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

  return (
    <Container height="100%">
      <Grid
        templateColumns={isLargerThanMd ? "repeat(7, 1fr)" : "1fr"}
        templateRows="repeat(1, 1fr)"
        width="100%"
        height="100%"
        bg={`rgba(220, 220, 220, 0.5)`}
        boxSizing="border-box"
        borderRadius="md"
        id="notes-accordion"
        border="1px solid"
        borderColor={bgColor}
      >
        <GridItem colSpan={2} rowSpan={1}>
          <div className="container">
            <div>
              <Button
                colorScheme="teal"
                variant="outline"
                width="100%"
                _hover={{ bg: buttonColor }}
                onClick={handleNewNote}
              >
                Add Note
              </Button>
            </div>
            {allNotes
              .filter((noteItem) => typeof noteItem === "object")
              .map((noteItem) => {
                if (noteItem.id === 0)
                  return <React.Fragment key={noteItem.id} />;

                return (
                  <Button
                    key={noteItem.id || noteItem._id}
                    colorScheme="teal"
                    variant="outline"
                    width="100%"
                    _hover={{ bg: buttonColor }}
                    onClick={() => handleExistingNote(noteItem)}
                  >
                    {noteItem.title}
                  </Button>
                );
              })}
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
    </Container>
  );
}

export default NotesAccordion;
