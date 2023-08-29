import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import Tab from '../../components/tab/Tab';
import NotesContainer from '../notesContainer/NotesContainer';
import ToDolistContainer from '../todolistContainer/ToDoListContainer';

const nonExpandedStyle = (bgColor) => css`
  transition: all 0.8s ease-in-out;
  background-color: ${bgColor};
  aspect-ratio: 1 / 1;
  max-width: 400px;
  max-height: 400px;
  min-width: 100px;
  min-height: 100px;
`;

const expandedStyle = css`
  transition: all 0.5s ease-in-out;
  aspect-ratio: 1 / 1;
  max-width: 800px;
  max-height: 800px;
  min-width: 200px;
  min-height: 200px;
`;

function TabGridContainer({ savedTabsData }) {
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const bgColor1 = '#276749';
  const bgColor2 = '#4299e1';
  const bgColor3 = 'white';

  const templateColumns = useBreakpointValue({
    base: 'repeat(2, 2fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
  });

  const templateRows = useBreakpointValue({
    base: 'repeat(2, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
  });

  const toggleSelectedGridItem = (item, event) => {
    setSelectedGridItem(selectedGridItem === item ? null : item);
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
            // height="90%"
            templateRows={templateRows}
            templateColumns={templateColumns}
          >
            <GridItem
              gridRow={selectedGridItem === 'todo' ? 'span 2' : 'auto'}
              gridColumn={selectedGridItem === 'todo' ? 'span 2' : 'auto'}
              onClick={(event) => toggleSelectedGridItem('todo', event)}
              css={
                selectedGridItem === 'todo'
                  ? expandedStyle
                  : nonExpandedStyle(bgColor1)
              }
            >
              {selectedGridItem === 'todo' && <ToDolistContainer />}
            </GridItem>

            <GridItem
              gridRow={selectedGridItem === 'notes' ? 'span 2' : 'auto'}
              gridColumn={selectedGridItem === 'notes' ? 'span 2' : 'auto'}
              onClick={(event) => toggleSelectedGridItem('notes', event)}
              css={
                selectedGridItem === 'notes'
                  ? expandedStyle
                  : nonExpandedStyle(bgColor2)
              }
            >
              {selectedGridItem === 'notes' && <NotesContainer />}
            </GridItem>

            {savedTabsData.map((tab, index) => (
              <GridItem
                gridRow={
                  selectedGridItem === `tab${index + 1}` ? 'span 2' : 'auto'
                }
                gridColumn={
                  selectedGridItem === `tab${index + 1}` ? 'span 2' : 'auto'
                }
                key={tab.id}
                onClick={(event) =>
                  toggleSelectedGridItem(`tab${index + 1}`, event)
                }
                css={
                  selectedGridItem === `tab${index + 1}`
                    ? expandedStyle
                    : nonExpandedStyle(bgColor3)
                }
              >
                <Tab
                  tab={tab}
                  expanded={selectedGridItem === `tab${index + 1}`}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </VStack>
  );
}

export default TabGridContainer;
