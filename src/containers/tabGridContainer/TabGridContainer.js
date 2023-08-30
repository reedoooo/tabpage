import React, { useState, useEffect } from 'react';
import { Box, Grid, VStack, useBreakpointValue } from '@chakra-ui/react';
import ToDoListContainer from '../todolistContainer/ToDoListContainer';
import NotesContainer from '../notesContainer/NotesContainer';
import ChatGPT from '../openAiContainer/OpenAiContainer';
import BlogContainer from '../blogContainer/BlogContainer';
import HabitTrackerContainer from '../habitTracker/HabitTrackerContainer';
import CardPriceTracker from '../cardPriceTracker.js/CardPriceTracker';
import CustomGridItem from './CustomGridItem';
import Tab from '../../components/tab/Tab';

const TabGridContainer = ({ savedTabsData }) => {
  const [selectedGridItem, setSelectedGridItem] = useState(null);

  const defaultGridItems = [
    { type: 'todo', bgColor: '#276749', label: 'TODO LIST' },
    { type: 'notes', bgColor: '#4299e1', label: 'NOTES' },
    { type: 'chat', bgColor: 'rgba(128, 0, 128)', label: 'CHAT' },
    { type: 'blog', bgColor: '#B4ADE3', label: 'BLOG' },
    { type: 'habit', bgColor: '#FFB07C', label: 'HABIT' },
    { type: 'cards', bgColor: '#FFB', label: 'CARDS' },
  ];

  const templateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(4, 1fr)',
    md: 'repeat(6, 1fr)',
  });

  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md' });

  const [gridOrder, setGridOrder] = useState([
    ...defaultGridItems,
    ...savedTabsData.map((tab, index) => ({
      type: 'tab',
      backgroundImage: `url(${tab?.imgUrl})`,
      label: tab.name,
      tab,
    })),
  ]);

  console.log('tab:', gridOrder);

  useEffect(() => {
    setGridOrder([
      ...defaultGridItems,
      ...savedTabsData.map((tab, index) => ({
        type: 'tab',
        backgroundImage: `url(${tab?.imgUrl})`,
        label: tab.name,
        tab,
      })),
    ]);
  }, [savedTabsData]);

  const getContainerComponent = (type, index) => {
    const containerTypeMapping = {
      todo: ToDoListContainer,
      notes: NotesContainer,
      chat: ChatGPT,
      blog: BlogContainer,
      habit: HabitTrackerContainer,
      cards: CardPriceTracker,
      tab: Tab,
    };

    return containerTypeMapping[type] || Tab;
  };

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
            flexGrow={'1'}
          >
            {gridOrder.map((item, index) => (
              <CustomGridItem
                className="custom-grid-item"
                flexGrow={'1'}
                key={index}
                label={item.label}
                type={item.type}
                selectedGridItem={selectedGridItem}
                setSelectedGridItem={setSelectedGridItem}
                breakpoint={breakpoint}
                gridOrder={gridOrder}
                ContainerComponent={getContainerComponent(item.type, index)}
                bgColor={item.type === 'tab' ? null : item.bgColor} // Pass null if type is 'tab'
                bgImage={item.type === 'tab' ? item.backgroundImage : null} // Pass null if type is 'tab'
                tab={item.tab} // Pass the tab object for further use
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </VStack>
  );
};

export default TabGridContainer;
