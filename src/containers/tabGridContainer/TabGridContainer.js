// Import necessary components from Chakra UI for layout and styling
import React, { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

// Import other custom components used in the layout
import Tab from "../../components/tab/Tab";
import ToDoListContainer from "../todolistContainer/ToDoListContainer";
import NotesContainer from "../notesContainer/NotesContainer";

// Import ModalTabContainer for displaying a modal dialog
import Tab4ToDoApp from "./Tab4ToDoApp";
import EditTabModalButton from "../../components/buttons/EditTabModalButton";

// Define TabGridContainer functional component, which receives savedTabsData as props
function TabGridContainer({ savedTabsData }) {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleOpenModal = (tab) => {
    setSelectedTab(tab);
  };

  const handleCloseModal = () => {
    setSelectedTab(null);
  };

  return (
    <Box width="100vw" height="100vh" padding={4} marginTop={10}>
      <Grid
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(5, 1fr)"
        padding={4}
        gap={4}
        border="5px solid black"
        borderRadius="2%"
        minHeight="100%"
        minWidth="100%"
      >
      {savedTabsData.map((tab, index) => (
          <Tab
            key={index}
            allTabs={savedTabsData}
            tab={tab}
            onClose={handleCloseModal}
            onOpenModal={() => handleOpenModal(tab)}
          />
        ))}
      {selectedTab && (
        <EditTabModalButton
          tab={selectedTab}
          isOpen={!!selectedTab}
          onClose={handleCloseModal}
        />
      )}

        <GridItem colSpan={2} rowSpan={2} colStart={5} rowStart={1}>
          <ToDoListContainer />
        </GridItem>

        <GridItem colSpan={2} rowSpan={2} colStart={5} rowStart={3}>
          <NotesContainer />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1} colStart={1} rowStart={1}>
          <Tab4ToDoApp allTabs={savedTabsData} />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default TabGridContainer;
