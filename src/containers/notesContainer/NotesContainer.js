import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./notesContainer.css";
import CreateNote from "../../components/notes/CreateNote";
import NotesAccordion from "../../components/notes/NotesAccordion";

function NotesContainer({ noteDataLoaded, setNoteDataLoaded }) {
  const [savedNotesData, setSavedNotesData] = useState([]);
  const [note, setNote] = useState({});
  // const [dataLoaded, setDataLoaded] = useState(false);

  // const [note, setNote] = useState({});

  useEffect(() => {
    const loadNoteData = async () => {
      try {
        const requestOptions = {
          method: "GET",
        };

        const serverResponse = await fetch(
          `${process.env.REACT_APP_SERVER}/api/myNotesRoutes`,
          requestOptions
        );

        const serverData = await serverResponse.json();

        let notesData = [];
        serverData.forEach((noteData) => {
          if (Array.isArray(noteData.contents)) {
            const notes = noteData.contents
              .filter((note) => note.title && note.notes) // add this line
              .map((note) => {
                return {
                  title: note.title,
                  notes: note.notes,
                  id: noteData._id,
                };
              });
            notesData = [...notesData, ...notes];
          }
        });

        setSavedNotesData(notesData);
      } catch (error) {
        console.error("Error fetching note data:", error);
      }
    };

    loadNoteData();
  }, []);

  useEffect(() => {
    console.log(note)

    if (savedNotesData && note) {
      setNoteDataLoaded(true);
      setNote(note);
    } else if (savedNotesData) {
      setNoteDataLoaded(true);
    }
  }, [savedNotesData, note, setNoteDataLoaded]);

  const handleOpenButton = (note) => {
    setNote(note);
  };

  const handleCloseButton = () => {
    setNote(null);
  };
  // const handleOpenModal = (note) => {
  //   setNote(note);
  // };

  // const handleCloseModal = () => {
  //   setNote(null);
  // };

  return (
    <>
      <Grid
        templateColumns="repeat(7, 1fr)" // for 1 column grid, adjust as needed
        templateRows="repeat(1, 1fr)"
        width="100%"
        height="100%"
        boxSizing="border-box"
      >
        <GridItem
          colSpan={1}
          rowSpan={1}
          // style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }} // Add Flexbox properties here
        >
          <NotesAccordion
            allNotes={savedNotesData}
            noteDataLoaded={noteDataLoaded}
            note={note}
            onOpenModal={handleOpenButton}
            onCloseModal={handleCloseButton}
            setNote={setNote} // Pass setSelectedNote to NotesAccordion
          />
        </GridItem>
        <GridItem colSpan={6} rowSpan={1}>
          <CreateNote
            allNotes={savedNotesData}
            note={note}
            setNote={setNote} // Pass setSelectedNote to NotesAccordion
            noteDataLoaded={noteDataLoaded}
          />

        </GridItem>
      </Grid>
    </>
  );
}

export default NotesContainer;
