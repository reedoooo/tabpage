import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Tab from '../../components/tab/Tab';
import NotesContainer from '../notesContainer/NotesContainer';
import ToDolistContainer from '../todolistContainer/ToDoListContainer';

function TabGridContainer({ savedTabsData }) {
  const [rowStyles, setRowStyles] = useState({});
  const [selectedGridItem, setSelectedGridItem] = useState(null);

  const toggleSelectedGridItem = (item, event) => {
    const height = event.currentTarget.offsetHeight;
    const clickPosition =
      event.clientY - event.currentTarget.getBoundingClientRect().top;
    const isSelected = clickPosition <= height * 0.2 ? null : item;

    setSelectedGridItem(selectedGridItem === item ? null : isSelected);
  };

  useEffect(() => {
    if (selectedGridItem) {
      const itemsPerRow = 4;
      const rowIndex = Math.floor(
        [
          'todo',
          'notes',
          ...savedTabsData.map((_, index) => `tab${index + 1}`),
        ].indexOf(selectedGridItem) / itemsPerRow,
      );
      const expandedSize = '40vw';
      const newStyle = {
        ...rowStyles,
        [rowIndex]: `${expandedSize} 10vw 10vw 10vw`,
      };
      setRowStyles(newStyle);
    } else {
      setRowStyles({});
    }
  }, [selectedGridItem, savedTabsData.length]);

  const expandedStyle = css`
    width: 40vw;
    height: 40vw;
    transition: all 0.5s ease-in-out;
  `;

  const nonExpandedStyle = (bgColor) => css`
    width: 20vw;
    height: 20vw;
    transition: all 0.8s ease-in-out;
    background-color: ${bgColor};
  `;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      padding={4}
      marginTop={10}
      // overflow="auto"
    >
      <Box
        maxWidth="120vw"
        maxHeight="100vh"
        overflow="hidden"
        position="relative" // To ensure z-index is respected
      >
        {' '}
        <Grid
          gap={4}
          // padding={1}
          padding={4}
          // margin="auto"
          border="5px solid black"
          width="100%"
          // height="100%"
          backgroundColor="rgba(255, 255, 255, 0.5)"
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(3, 1fr)"
          justifyContent="center"
        >
          <GridItem
            onClick={(event) => toggleSelectedGridItem('todo', event)}
            margin="auto"
            // marginLeft={'auto'}
            // marginRight={'auto'}
            css={
              selectedGridItem === 'todo'
                ? expandedStyle
                : nonExpandedStyle('lightgray')
            }
          >
            {selectedGridItem === 'todo' && <ToDolistContainer />}
          </GridItem>
          <GridItem
            onClick={(event) => toggleSelectedGridItem('notes', event)}
            margin="auto"
            // marginLeft={'auto'}
            // marginRight={'auto'}
            css={
              selectedGridItem === 'notes'
                ? expandedStyle
                : nonExpandedStyle('lightblue')
            }
          >
            {selectedGridItem === 'notes' && <NotesContainer />}
          </GridItem>
          {savedTabsData.map((tab, index) => (
            <GridItem
              key={tab.id}
              margin="auto"
              // marginLeft={'auto'}
              // marginRight={'auto'}
              onClick={(event) =>
                toggleSelectedGridItem(`tab${index + 1}`, event)
              }
              css={
                selectedGridItem === `tab${index + 1}`
                  ? expandedStyle
                  : nonExpandedStyle(tab.color || 'lightgreen')
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
  );
}

export default TabGridContainer;
