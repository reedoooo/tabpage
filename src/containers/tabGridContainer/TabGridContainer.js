// Import necessary components from Chakra UI for layout and styling
import { Box, Grid, GridItem } from "@chakra-ui/react";
// Import other custom components used in the layout
import Tab from "../../components/tab/Tab";
import ToDoList from "../todolistContainer/ToDoListContainer";
import NotesContainer from "../notesContainer/NotesContainer";
// Import React
import React from "react";
// Import ModalTabContainer for displaying a modal dialog
import ModalTabContainer from "./ModalTabContainer";

// Define TabGridContainer functional component, which receives links and savedTabsData as props
function TabGridContainer({ links, savedTabsData }) {
  return (
    // Box is a basic layout component in Chakra UI that sets up a block container, here it's setting full viewport width and height
    <Box width="100vw" height="100vh" padding={4} marginTop={10}>
      {/* Grid is a layout component in Chakra UI for a 2-dimensional layout, setting up the structure for our grid */}
      <Grid
        templateColumns="repeat(6, 1fr)" // Creates a 6-column grid
        templateRows="repeat(5, 1fr)" // Creates a 5-row grid
        padding={4} // Sets padding around the grid
        gap={4} // Sets gap between grid items
        border="5px solid black" // Sets a border around the grid
        borderRadius="2%" // Gives the grid rounded corners
        minHeight="100%" // Ensures the grid takes up minimum 100% of the container height
        minWidth="100%" // Ensures the grid takes up minimum 100% of the container width
      >
        {/* Iterate over savedTabsData array and render a Tab component for each saved tab data */}
        {savedTabsData.map((savedTabData, index) => (
          <Tab key={index} link={savedTabData} />
        ))}

        {/* GridItem is a child of Grid that will take up specified amount of space on the grid. Here it's for the ToDoList */}
        <GridItem colSpan={2} rowSpan={2} colStart={5} rowStart={1}>
          <ToDoList />
        </GridItem>

        {/* GridItem for the NotesContainer */}
        <GridItem colSpan={2} rowSpan={2} colStart={5} rowStart={3}>
          <NotesContainer />
        </GridItem>

        {/* Iterate over links array and render a Tab component for each link */}
        {links.map((link, index) => (
          <Tab key={index + savedTabsData.length} link={link} />
        ))}

        {/* GridItem for the ModalTabContainer */}
        <GridItem colSpan={1} rowSpan={1} colStart={2} rowStart={4}>
          <ModalTabContainer link={links} />
        </GridItem>
        
      </Grid>
    </Box>
  );
}

// Export the TabGridContainer component as the default export
export default TabGridContainer;
