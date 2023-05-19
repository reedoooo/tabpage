import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Collapse,
  // Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
// import AnimatedBoxComponent from "../weeklySchedule/AnimatedBoxComponent";
// import WeeklySchedule from "../weeklySchedule/WeeklySchedule";

import Tab from "../../components/tab/Tab";
import ToDoListContainer from "../todolistContainer/ToDoListContainer";
import NotesContainer from "../notesContainer/NotesContainer";
import Tab4ToDoApp from "./Tab4ToDoApp";
import EditTabModalButton from "../../components/buttons/EditTabModalButton";
// import Tab4Schedule from "./Tab4Schedule";
// import WeeklySchedule from "../weeklySchedule/WeeklySchedule";
// import AnimatedBoxComponent from "../weeklySchedule/AnimatedBoxComponent";

function TabGridContainer({ savedTabsData }) {
  const [selectedTab, setSelectedTab] = useState(null);
  // const [note, setNote] = useState({});
  const [noteDataLoaded, setNoteDataLoaded] = useState(false);

  const [expanded, setExpanded] = useState(false); // Track the expansion state
  const buttonStyle = {
    backgroundImage: `url('https://www.iconarchive.com/download/i103365/paomedia/small-n-flat/calendar.1024.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: 0,
    gridColumn: "auto",
    gridRow: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease-in-out", // Add transition CSS property
  };
  const [gridValues, setGridValues] = useState({
    colSpan: 1,
    rowSpan: 1,
    colStart: 2,
    rowStart: 1,
  });

  // const handleAnimatedBoxClick = () => {
  //   setGridValues({
  //     colSpan: 5,
  //     rowSpan: 2,
  //     colStart: 1,
  //     rowStart: 1,
  //   });
  // };

  const handleUpperButtonClick = () => {
    setExpanded(!expanded); // Toggle the expansion state
    setGridValues({ colSpan: 2, rowSpan: 2 });
  };

  const handleDoubleClick = () => {
    setExpanded(false); // Reset the expansion state
    setGridValues({ colSpan: 1, rowSpan: 1 });
  };

  // const handleOpenButton = (note) => {
  //   setNote(note);
  // };

  // const handleCloseButton = () => {
  //   setNote(null);
  // };

  const handleOpenModal = (tab) => {
    setSelectedTab(tab);
  };

  const handleCloseModal = () => {
    setSelectedTab(null);
  };

  // Use the colSpan and rowSpan props directly from the parameters
  const gridItemStyle = {
    colSpan: expanded ? 4 : gridValues.colSpan, // Update width dynamically based on expanded state
    rowSpan: expanded ? 4 : gridValues.rowSpan, // Update height dynamically based on expanded state
    transition: "all 1.9s ease-in-out", // Add transition CSS property
  };

  return (
    <Box width="100vw" height="100vh" padding={4} marginTop={10}>
      {/* <AspectRatio ratio={1}> */}

      <Grid
        templateColumns="repeat(9, 1fr)"
        templateRows="repeat(9, 1fr)"
        padding={4}
        gap={4}
        border="5px solid black"
        borderRadius="2%"
        minHeight="100%"
        minWidth="100%"
        // flex={}
      >
        {/* <AspectRatio ratio={1}> */}
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

        {/* <GridItem colSpan={2} rowSpan={2} colStart={8} rowStart={4}> */}
        <GridItem
          colSpan={2}
          rowSpan={4}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }} // Add Flexbox properties here
        >
          <ToDoListContainer />
        </GridItem>

        {/* <GridItem colSpan={4} rowSpan={3} colStart={6} rowStart={1}> */}
        <GridItem
          colSpan={4}
          rowSpan={4}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }} // Add Flexbox properties here
        >
          <NotesContainer 
            // handleOpenButton={handleOpenButton}
            // handleCloseButton={handleCloseButton}
            noteDataLoaded={noteDataLoaded}
            setNoteDataLoaded={setNoteDataLoaded}


            // note={note}
          />
          
        </GridItem>

        {/* <GridItem colSpan={1} rowSpan={1} colStart={1} rowStart={1}> */}
        {/* </GridItem> */}
        {/* 
            <GridItem
              colSpan={gridValues.colSpan}
              rowSpan={gridValues.rowSpan}
              colStart={gridValues.colStart}
              rowStart={gridValues.rowStart}
            >
              <Tab4Schedule allTabs={savedTabsData} colSpan={1} rowSpan={1} onClick={handleAnimatedBoxClick} />
            </GridItem> */}
        <GridItem
          colSpan={1}
          rowSpan={1}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }} // Add Flexbox properties here
        >
          <Tab4ToDoApp allTabs={savedTabsData} />
        </GridItem>
        <GridItem
          width="100%"
          height="100%"
          boxSizing="border-box"
          id="modal-tab-container"
          colSpan={gridItemStyle.colSpan}
          rowSpan={gridItemStyle.rowSpan}
          transition={gridItemStyle.transition}
          borderRadius="15%"
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }} // Add Flexbox properties here
        >
          <AspectRatio ratio={1}>
            <Collapse in={expanded}>
              <Button
                target="_blank"
                borderRadius="15%"
                rel="noopener noreferrer"
                backgroundColor={savedTabsData.color}
                style={buttonStyle}
                onClick={handleUpperButtonClick}
              >
                <section
                  id="tab-title-section-schedule"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    bottom: 0,
                  }}
                  onDoubleClick={handleDoubleClick}
                >
                  <div
                    style={{
                      marginBottom: "10%",
                      marginTop: "1%",
                    }}
                  >
                    <h2 id="button-content">{"Calendar"}</h2>
                  </div>
                </section>
              </Button>
            </Collapse>
          </AspectRatio>
        </GridItem>
        {/* <GridItem colSpan={1} rowSpan={1} colStart={2} rowStart={1}>
            <Tab4Schedule allTabs={savedTabsData} colSpan={1} rowSpan={1} />
          </GridItem> */}
        {/* 
          <GridItem colSpan={5} rowSpan={5} colStart={1} rowStart={3}>
            <WeeklySchedule allTabs={savedTabsData} />
          </GridItem> */}
        {/* </AspectRatio> */}
      </Grid>
      {/* </AspectRatio> */}
    </Box>
  );
}

export default TabGridContainer;
