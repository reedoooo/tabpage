import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Collapse,
  Grid,
  GridItem,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import Tab from "../../components/tab/Tab";
import ToDoListContainer from "../todolistContainer/ToDoListContainer";
import NotesContainer from "../notesContainer/NotesContainer";
import ChatGpt from "../openAiContainer/OpenAiContainer"; // Import the ChatGpt component
import Tab4ToDoApp from "./Tab4ToDoApp";
import EditTabModalButton from "../../components/buttons/EditTabModalButton";
import HabitTracker from "../habitTracker/HabitTracker";

function TabGridContainer({ savedTabsData }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [noteDataLoaded, setNoteDataLoaded] = useState(false);

  // Function to handle opening the modal for a specific tab
  const handleOpenModal = (tab) => {
    setSelectedTab(tab);
    setEditModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedTab(null);
    setEditModalOpen(false);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      padding={4}
      marginTop={10}
      overflow="auto" // Enable scrolling
    >
      <Grid
        templateColumns={{
          base: "repeat(3, 1fr)",
          md: "repeat(9, 1fr)",
        }}
        templateRows={{
          base: "repeat(12, 1fr)",
          md: "repeat(9, 1fr)",
        }}
        // borderRadius="2%"
        gap={4}
        padding={1}
        border="5px solid black"
        minHeight="100%"
        minWidth="100%"
        backgroundColor="rgba(255, 255, 255, 0.5)"
        gridTemplateAreas={{
          base: `
      "todo todo todo"
      "notes notes notes"
      "chat chat chat"
      "tab4 tab4 tab4"
    `,
          md: `
      "todo todo todo notes notes notes notes notes notes"
      "tab1 tab1 tab2 tab2 tab3 tab3 tab4 tab4 tab4"
    `,
        }}
      >
        <GridItem
          gridArea="todo"
          colSpan={{ base: "auto", md: 3 }}
          rowSpan={{ base: "auto", md: 4 }}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto",
            margin: "0 8px",
          }}
        >
          <ToDoListContainer />
        </GridItem>

        <GridItem
          gridArea="notes"
          colSpan={{ base: 3, md: 3 }}
          rowSpan={{ base: 4, md: 9 }}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto",
            // marginTop: "8px",
          }}
        >
          <NotesContainer
            noteDataLoaded={noteDataLoaded}
            setNoteDataLoaded={setNoteDataLoaded}
          />
        </GridItem>

        <GridItem
          gridArea="chat"
          colSpan={{ base: 3, md: 3 }}
          rowSpan={{ base: "auto", md: "auto" }}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto",
          }}
        >
          <ChatGpt /> {/* Add the ChatGpt component */}
        </GridItem>
        <GridItem
          gridArea="chat"
          colSpan={{ base: 3, md: 3 }}
          rowSpan={{ base: "auto", md: "auto" }}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto",
          }}
        >
          <HabitTracker /> {/* Add the ChatGpt component */}
        </GridItem>


        {savedTabsData.map((tab, index) => (
          <GridItem
            key={tab.id}
            gridArea={`tab${index + 1}`}
            colSpan={{ base: 1, md: "auto" }}
            rowSpan={{ base: 1, md: 1 }}
            style={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: "auto",
            }}
          >
            <Tab
              allTabs={savedTabsData}
              tab={tab}
              onClose={handleCloseModal}
              onOpenModal={() => handleOpenModal(tab)}
            />
            {selectedTab === tab && (
              <EditTabModalButton
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                selectedTab={selectedTab}
              />
            )}
          </GridItem>
        ))}

        <GridItem
          gridArea="tab4"
          colSpan={{ base: "auto", md: 1 }}
          rowSpan={{ base: "auto", md: 1 }}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto",
          }}
        >
          <Tab4ToDoApp allTabs={savedTabsData} />
        </GridItem>
        {/* <GridItem gridArea="tab7" colSpan={{ base: 1, md: "auto" }}>
          <Rasengan />
        </GridItem> */}
      </Grid>
    </Box>
  );
}

export default TabGridContainer;
