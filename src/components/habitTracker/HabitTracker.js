import React, { useState } from 'react';
import { Grid, Box, Text, useDisclosure, GridItem } from '@chakra-ui/react';
import ScheduleModal from '../../components/modals/ScheduleModal';

const HabitTracker = () => {
  const [habits, setHabits] = useState({
    lifting: [],
    sleep: [],
    brushedTeeth: [],
    noSugar: [],
    screenTime: [],
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    onOpen();
  };

  //   const handleModalSubmit = (eventData) => {
  //     setSchedules((prev) => ({
  //       ...prev,
  //       [selectedDay]: [...prev[selectedDay], eventData],
  //     }));
  //     onClose();
  //   };

  return (
    <GridItem
      templateColumns="repeat(12, 1fr)"
      gap={6}
      padding={4}
      gridColumn="span 12"
      gridRow="span 12"
    >
      <Box
        gridColumn="span 12"
        gridRow="span 12"
        p={5}
        boxShadow="xl"
        bg="white"
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={6} mt={4}>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
            (day) => (
              <Box
                key={day}
                onClick={() => handleDayClick(day)}
                cursor="pointer"
              >
                <Text fontWeight="bold" mb={2}>
                  {day}
                </Text>
                {schedules[day].map((event, index) => (
                  <Text key={index}>
                    {event.name} at {event.time} in {event.place}
                  </Text>
                ))}
              </Box>
            ),
          )}
        </Grid>
      </Box>
      <ScheduleModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleModalSubmit}
      />
    </GridItem>
  );
};

export default HabitTracker;
