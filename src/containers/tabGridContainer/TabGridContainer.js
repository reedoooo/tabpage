import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  useBreakpointValue,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import NotesContainer from '../notesContainer/NotesContainer';
import ToDolistContainer from '../todolistContainer/ToDoListContainer';
import Tab from '../../components/tab/Tab'; // Make sure to import your own Tab component

const nonExpandedStyle = (bgColor) => css`
  transition: all 0.5s ease-in-out;
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

const expandedStyleSmall = css`
  transition: all 0.5s ease-in-out;
  width: 100%;
  height: auto;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

function TabGridContainer({ savedTabsData }) {
  const [selectedGridItem, setSelectedGridItem] = useState({});
  const bgColor1 = '#276749';
  const bgColor2 = '#4299e1';
  const bgColor3 = 'white';
  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });

  const templateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
  });

  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md' });

  const toggleSelectedGridItem = (item, e) => {
    setSelectedGridItem(item);
  };

  const resetSelectedGridItem = (e) => {
    setSelectedGridItem(null);
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
          >
            {/* ToDo List Container */}
            <GridItem
              gridRow={
                selectedGridItem === 'todo'
                  ? breakpoint === 'base'
                    ? '1 / 2'
                    : 'span 2'
                  : 'auto'
              }
              gridColumn={
                selectedGridItem === 'todo'
                  ? breakpoint === 'base' || breakpoint === 'sm'
                    ? '1 / -1'
                    : 'span 2'
                  : 'auto'
              }
              css={
                selectedGridItem === 'todo'
                  ? breakpoint === 'base' || breakpoint === 'sm'
                    ? expandedStyleSmall
                    : expandedStyle
                  : nonExpandedStyle(bgColor1)
              }
              onClick={(e) => toggleSelectedGridItem('todo', e)}
            >
              <Button css={closeButtonStyle} onClick={resetSelectedGridItem}>
                ×
              </Button>

              <div
                style={{
                  // transition: 'opacity 0.5s',
                  opacity: selectedGridItem === 'todo' ? 1 : 0,
                  pointerEvents: selectedGridItem === 'todo' ? 'auto' : 'none',
                }}
              >
                <ToDolistContainer
                  isVisible={selectedGridItem === 'todo'}
                  toggleSelectedGridItem={toggleSelectedGridItem}
                />
              </div>
            </GridItem>

            {/* Notes Container */}
            <GridItem
              gridRow={
                selectedGridItem === 'notes'
                  ? breakpoint === 'base'
                    ? '2 / 3'
                    : 'span 2'
                  : 'auto'
              }
              gridColumn={
                selectedGridItem === 'notes'
                  ? breakpoint === 'base' || breakpoint === 'sm'
                    ? '1 / -1'
                    : 'span 2'
                  : 'auto'
              }
              css={
                selectedGridItem === 'notes'
                  ? breakpoint === 'base' || breakpoint === 'sm'
                    ? expandedStyleSmall
                    : expandedStyle
                  : nonExpandedStyle(bgColor2)
              }
              onClick={(e) => toggleSelectedGridItem('notes', e)}
            >
              <Button css={closeButtonStyle} onClick={resetSelectedGridItem}>
                ×
              </Button>

              <div
                style={{
                  // transition: 'opacity 0.5s',
                  opacity: selectedGridItem === 'notes' ? 1 : 0,
                  pointerEvents: selectedGridItem === 'notes' ? 'auto' : 'none',
                }}
              >
                <NotesContainer
                  isVisible={selectedGridItem === 'notes'}
                  toggleSelectedGridItem={toggleSelectedGridItem}
                />
              </div>
            </GridItem>

            {/* Dynamic Tabs */}
            {savedTabsData.map((tab, index) => (
              <GridItem
                key={tab.id}
                gridRow={
                  selectedGridItem === `tab${index + 1}`
                    ? breakpoint === 'base'
                      ? `${index + 3} / ${index + 4}`
                      : 'span 2'
                    : 'auto'
                }
                gridColumn={
                  selectedGridItem === `tab${index + 1}`
                    ? breakpoint === 'base' || breakpoint === 'sm'
                      ? '1 / -1'
                      : 'span 2'
                    : 'auto'
                }
                css={
                  selectedGridItem === `tab${index + 1}`
                    ? breakpoint === 'base' || breakpoint === 'sm'
                      ? expandedStyleSmall
                      : expandedStyle
                    : nonExpandedStyle(bgColor3)
                }
                onClick={(e) => toggleSelectedGridItem(`tab${index + 1}`, e)}
              >
                <Button css={closeButtonStyle} onClick={resetSelectedGridItem}>
                  ×
                </Button>

                <Tab
                  tab={tab}
                  expanded={selectedGridItem === `tab${index + 1}`}
                  toggleSelectedGridItem={toggleSelectedGridItem}
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
