import React, { useState } from 'react';
// import { css } from '@emotion/react';
import { Box, Grid, VStack, useBreakpointValue } from '@chakra-ui/react';
import NotesContainer from '../notesContainer/NotesContainer';
import ToDoListContainer from '../todolistContainer/ToDoListContainer';
import Tab from '../../components/tab/Tab';
import CustomGridItem from './CustomGridItem';
import ChatGPT from '../openAiContainer/OpenAiContainer';
import BlogContainer from '../blogContainer/BlogContainer';
import HabitTrackerContainer from '../habitTracker/HabitTrackerContainer';
import CardPriceTracker from '../cardPriceTracker.js/CardPriceTracker';

const TabGridContainer = ({ savedTabsData }) => {
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const bgColor1 = '#276749';
  const bgColor2 = '#4299e1';
  const bgColor3 = 'white';
  const bgColor4 = 'rgba(128, 0, 128)';
  const bgColor5 = '#B4ADE3';
  const bgColor6 = '#FFB07C';
  const bgColor7 = '#FFB';

  const templateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
  });

  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md' });

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        padding={4}
        marginTop={10}
      >
        <Box
          maxWidth="100vw"
          maxHeight="100vh"
          minWidth="100%"
          minHeight="100%"
          position="relative"
        >
          <Grid
            gap={4}
            padding={4}
            border="5px solid black"
            width="100%"
            templateColumns={templateColumns}
          >
            <CustomGridItem
              label="TODO LIST"
              type="todo"
              selectedGridItem={selectedGridItem}
              setSelectedGridItem={setSelectedGridItem}
              breakpoint={breakpoint}
              ContainerComponent={ToDoListContainer}
              bgColor={bgColor1}
            />

            <CustomGridItem
              label="NOTES"
              type="notes"
              selectedGridItem={selectedGridItem}
              setSelectedGridItem={setSelectedGridItem}
              breakpoint={breakpoint}
              ContainerComponent={NotesContainer}
              bgColor={bgColor2}
            />

            <CustomGridItem
              label="CHAT"
              type="chat"
              selectedGridItem={selectedGridItem}
              setSelectedGridItem={setSelectedGridItem}
              breakpoint={breakpoint}
              ContainerComponent={ChatGPT}
              bgColor={bgColor4}
            />

            <CustomGridItem
              label="BLOG"
              type="blog"
              selectedGridItem={selectedGridItem}
              setSelectedGridItem={setSelectedGridItem}
              breakpoint={breakpoint}
              ContainerComponent={BlogContainer}
              bgColor={bgColor5}
            />

            <CustomGridItem
              label="HABIT"
              type="habit"
              selectedGridItem={selectedGridItem}
              setSelectedGridItem={setSelectedGridItem}
              breakpoint={breakpoint}
              ContainerComponent={HabitTrackerContainer}
              bgColor={bgColor6}
            />

            <CustomGridItem
              label="CARDS"
              type="cards"
              selectedGridItem={selectedGridItem}
              setSelectedGridItem={setSelectedGridItem}
              breakpoint={breakpoint}
              ContainerComponent={CardPriceTracker}
              bgColor={bgColor7}
            />

            {savedTabsData.map((tab, index) => (
              <CustomGridItem
                key={tab.id}
                label={tab.name}
                index={index}
                type={`tab${index + 1}`} // this type won't be in containerTypeMapping but it's okay
                tab={tab} // passing tab data
                selectedGridItem={selectedGridItem}
                setSelectedGridItem={setSelectedGridItem}
                breakpoint={breakpoint}
                ContainerComponent={Tab}
                bgColor={bgColor3}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </VStack>
  );
};

export default TabGridContainer;
