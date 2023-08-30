import React, { useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Input,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Button,
  Flex,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function HabitTrackerContainer({
  selectedGridItem,
  setSelectedGridItem,
  label,
}) {
  const defaultRowCount = 5;
  const [habits, setHabits] = useState(Array(defaultRowCount).fill(''));
  const [gridData, setGridData] = useState(
    Array(defaultRowCount).fill(Array(7).fill(false)), // Initialize gridData with defaultRowCount rows and 7 columns
  );
  const [nameButtonStates, setNameButtonStates] = useState(
    Array(defaultRowCount).fill(true),
  ); // Initialize all name buttons to be visible
  const pastelColors = [
    '#B39DDB',
    '#90CAF9',
    '#81D4FA',
    '#80DEEA',
    '#80CBC4',
    '#C5E1A5',
    '#E6EE9C',
    '#FFF59D',
    '#FFE082',
    '#FFCC80',
    '#FFAB91',
    '#BCAAA4',
    '#B0BEC5',
    '#FFCDD2',
    '#F8BBD0',
    '#E1BEE7',
    '#D1C4E9',
    '#C5CAE9',
    '#BBDEFB',
    '#B3E5FC',
    '#B2EBF2',
    '#B2DFDB',
    '#C8E6C9',
    '#DCEDC8',
    '#F0F4C3',
    '#FFF9C4',
    '#FFECB3',
    '#FFE0B2',
    '#FFCCBC',
    '#D7CCC8',
    '#CFD8DC',
  ];

  // Usage example:
  console.log(pastelColors[0]); // Output: #B39DDB

  const handleHabitChange = (index, event) => {
    const updatedHabits = [...habits];
    updatedHabits[index] = event.target.value;
    setHabits(updatedHabits);
  };

  const handleGridClick = (rowIndex, columnIndex) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex][columnIndex] =
      !updatedGridData[rowIndex][columnIndex];
    setGridData(updatedGridData);
  };

  const handleNameSave = (rowIndex) => {
    setNameButtonStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[rowIndex] = false; // Hide the button and show the input
      return updatedStates;
    });
  };

  const generateDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay + 1);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = `${getDayOfWeek(date)} ${
        date.getMonth() + 1
      }/${date.getDate()}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  const dates = generateDates();

  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const bgColor = useColorModeValue('#FFB07C');

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedGridItem(null); // Explicitly setting to null to reapply nonExpandedStyle
  };

  return (
    <>
      <Box bg={bgColor} color="white" py={2} px={6} borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size={headingSize} lineHeight="shorter">
            Habit Tracker
          </Heading>
          <Button
            background="transparent"
            border="none"
            onClick={(e) => handleClose(e)}
          >
            ×
          </Button>
        </Flex>
      </Box>
      <Grid templateColumns={`auto repeat(${dates.length}, 1fr)`} gap={4} p={4}>
        {/* Render the top row with dates */}
        {dates.map((date, columnIndex) => (
          <GridItem key={columnIndex} colStart={columnIndex + 2}>
            <Box bg="transparent" textAlign="center">
              {date}
            </Box>
          </GridItem>
        ))}

        {/* Render the left column with habit inputs and name buttons */}
        {habits.map((habit, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <GridItem colSpan={1} colStart={1} rowStart={rowIndex + 2}>
              {nameButtonStates[rowIndex] ? ( // Render the button if the state is true
                <IconButton
                  aria-label="Add note"
                  icon={<AddIcon />}
                  size="lg"
                  colorScheme="green"
                  onClick={() => handleNameSave(rowIndex)}
                  bgGradient="linear(to-r, green.200, green.500)"
                  _hover={{
                    bgGradient: 'linear(to-r, green.500, green.200)',
                  }}
                />
              ) : (
                // Render the input if the state is false
                <Input
                  placeholder="Enter name"
                  value={habit}
                  onChange={(event) => handleHabitChange(rowIndex, event)}
                />
              )}
            </GridItem>
          </React.Fragment>
        ))}

        {/* Render the grid */}
        {habits.map((_, rowIndex) =>
          dates.map((_, columnIndex) => (
            <Box
              key={`${rowIndex}-${columnIndex}`}
              bg={gridData[rowIndex][columnIndex] ? 'blue.500' : 'transparent'}
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleGridClick(rowIndex, columnIndex)}
            />
          )),
        )}
      </Grid>
    </>
  );
}

export default HabitTrackerContainer;
