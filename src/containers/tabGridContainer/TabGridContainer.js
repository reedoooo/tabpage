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
import Tab4ToDoApp from "./Tab4ToDoApp";
import EditTabModalButton from "../../components/buttons/EditTabModalButton";
// import TabTitleSchedule from "../weeklySchedule/TabTitleSchedule";

function TabGridContainer({ savedTabsData }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const [noteDataLoaded, setNoteDataLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    transition: "all 0.3s ease-in-out",
  };

  // const gridItemStyle = {
  //   colSpan: useBreakpointValue({ base: expanded ? 4 : 1, md: expanded ? 6 : 2 }),
  //   rowSpan: useBreakpointValue({ base: expanded ? 4 : 1, md: expanded ? 6 : 2 }),
  //   transition: "all 1.9s ease-in-out",
  // };

  // const handleUpperButtonClick = () => {
  //   setExpanded(!expanded);
  // };

  // const handleDoubleClick = () => {
  //   setExpanded(false);
  // };

  const handleOpenModal = (tab) => {
    setSelectedTab(tab);
  };

  const handleCloseModal = () => {
    setSelectedTab(null);
  };

  // Use the useMediaQuery hook to get the current screen size
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  // Update the expanded state based on the screen size
  React.useEffect(() => {
    setExpanded(isLargerThanMd);
  }, [isLargerThanMd]);

  return (
    <Box width="100vw" height="100vh" padding={4} marginTop={10}>
      <Grid
        templateColumns="repeat(9, 1fr)"
        templateRows="repeat(9, 1fr)"
        padding={4}
        gap={4}
        border="5px solid black"
        borderRadius="2%"
        minHeight="100%" // Updated minHeight value
        minWidth="100%"
        backgroundColor="rgba(255, 255, 255, 0.5)"
      >
        {savedTabsData.map((tab) => (
          <Tab
            key={tab.id}
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

        <GridItem
          colSpan={2}
          rowSpan={4}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}
        >
          <ToDoListContainer />
        </GridItem>

        <GridItem
          colSpan={4}
          rowSpan={4}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}
        >
          <NotesContainer
            noteDataLoaded={noteDataLoaded}
            setNoteDataLoaded={setNoteDataLoaded}
          />
        </GridItem>

        <GridItem
          colSpan={1}
          rowSpan={1}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}
        >
          <Tab4ToDoApp allTabs={savedTabsData} />
        </GridItem>

        {/* <GridItem
          width="100%"
          height="100%"
          boxSizing="border-box"
          id="modal-tab-container"
          colSpan={gridItemStyle.colSpan}
          rowSpan={gridItemStyle.rowSpan}
          transition={gridItemStyle.transition}
          borderRadius="15%"
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}
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
                <TabTitleSchedule
                  expanded={expanded}
                  handleDoubleClick={handleDoubleClick}
                />
              </Button>
            </Collapse>
          </AspectRatio>
        </GridItem> */}
      </Grid>
    </Box>
  );
}

export default TabGridContainer;
