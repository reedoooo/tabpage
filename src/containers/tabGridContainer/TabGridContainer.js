import React, { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
// import AnimatedBoxComponent from "../weeklySchedule/AnimatedBoxComponent";
// import WeeklySchedule from "../weeklySchedule/WeeklySchedule";

import Tab from "../../components/tab/Tab";
import ToDoListContainer from "../todolistContainer/ToDoListContainer";
import NotesContainer from "../notesContainer/NotesContainer";
import Tab4ToDoApp from "./Tab4ToDoApp";
import EditTabModalButton from "../../components/buttons/EditTabModalButton";
import AnimatedBoxComponent from "../weeklySchedule/AnimatedBoxComponent";

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
        templateColumns="repeat(9, 1fr)"
        templateRows="repeat(6, 1fr)"
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

        <GridItem colSpan={2} rowSpan={2} colStart={8} rowStart={1}>
          <ToDoListContainer />
        </GridItem>

        <GridItem colSpan={2} rowSpan={2} colStart={8} rowStart={3}>
          <NotesContainer />
        </GridItem>

        {/* <GridItem colSpan={1} rowSpan={1} colStart={1} rowStart={1}> */}
        {/* </GridItem> */}

        <GridItem colSpan={1} rowSpan={1} colStart={1} rowStart={1}>
          <Tab4ToDoApp allTabs={savedTabsData} />
        </GridItem>
        
        <GridItem colSpan={1} rowSpan={1} colStart={1} rowStart={1}>
          <AnimatedBoxComponent allTabs={savedTabsData} />
        </GridItem>

        {/* <GridItem
          colSpan={selectedTab === "schedule" ? 5 : 1}
          rowSpan={selectedTab === "schedule" ? 2 : 1}
          colStart={selectedTab === "schedule" ? 2 : 1}
          rowStart={selectedTab === "schedule" ? 1 : 1}
        >
          <AnimatedBoxComponent
            open={selectedTab === "schedule"}
            toggleOpen={() => handleOpenModal("schedule")}
          />
        </GridItem> */}

        {/* <GridItem colSpan={5} rowSpan={2} colStart={3} rowStart={1}>
          {selectedTab === "schedule" && (
            <Box
              width="100%"
              height="100%"
              overflow="hidden"
              borderRadius="md"
              boxShadow="md"
            >
              <WeeklySchedule />
            </Box>
          )}
        </GridItem> */}
      </Grid>
    </Box>
  );
}

export default TabGridContainer;
