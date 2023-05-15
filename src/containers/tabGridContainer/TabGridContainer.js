// Import necessary components from Chakra UI for layout and styling
import React, { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

// Import other custom components used in the layout
import Tab from "../../components/tab/Tab";
import ToDoList from "../todolistContainer/ToDoListContainer";
import NotesContainer from "../notesContainer/NotesContainer";

// Import ModalTabContainer for displaying a modal dialog
import Tab4ToDoApp from "./Tab4ToDoApp";
import EditTabModalButton from "../../components/buttons/EditTabModalButton";

// Define TabGridContainer functional component, which receives savedTabsData as props
function TabGridContainer({ savedTabsData }) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(null);
  const [selectedTabId, setSelectedTabId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (tabIndex, tabId) => {
    setSelectedTabIndex(tabIndex);
    setSelectedTabId(tabId);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
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
        {savedTabsData.map((savedTabData, index) => {
          return (
            <div key={savedTabData.id}>
              <Tab
                allTabs={savedTabsData}
                selectedTab={savedTabData} // pass the current tab data
                index={index} // pass the current index
                isOpen={isOpen}
                // onOpen={() => handleOpenModal(index, savedTabData.id)} // pass the current index and id to the handler
                tabIndex={selectedTabIndex}
                tabId={selectedTabId}
                // onClick={() => handleButtonClick(savedTabData.id, index)}
                // {...(isSelected
                //   ? { selectedTab: savedTabData, selectedTabId }
                //   : {})}
              />
              <EditTabModalButton
                isOpen={isOpen}
                selectedTab={savedTabData} // pass the current tab data
                allTabs={savedTabsData}
                onOpen={() => handleOpenModal(index, savedTabData.id)} // pass the current index and id to the handler
                onClose={handleCloseModal}
                tabIndex={selectedTabIndex}
                tabId={selectedTabId}
              />
            </div>
          );
        })}

        <GridItem colSpan={2} rowSpan={2} colStart={5} rowStart={1}>
          <ToDoList />
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
