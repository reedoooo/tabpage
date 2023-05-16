import React, { useState } from "react";
import { Grid, Box, Text, useDisclosure } from "@chakra-ui/react";
import ScheduleModal from "../../components/modals/ScheduleModal";
import { animated, useSpring } from "react-spring";

const AnimatedBox = animated(Box);

const WeeklySchedule = () => {
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDay, setSelectedDay] = useState(null);

  const animationProps = useSpring({
    to: async (next) => {
      await next({
        gridColumn: open ? "span 5" : "span 1",
        gridRow: open ? "span 2" : "span 1",
      });
    },
    from: {
      gridColumn: "span 1",
      gridRow: "span 1",
    },
  });

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    onOpen();
  };

  const handleModalSubmit = (eventData) => {
    setSchedules((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], eventData],
    }));
  };

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <AnimatedBox style={animationProps} onClick={toggleOpen}>
        {open ? "Close Schedule" : "Open Schedule"}
      </AnimatedBox>
      {open && (
        <AnimatedBox style={animationProps} gridColumn="span 5" gridRow="span 2">
          <Grid templateColumns="repeat(5, 1fr)" gap={6} mt={4}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <Box key={day} onClick={() => handleDayClick(day)}>
                <Text fontWeight="bold" mb={2}>
                  {day}
                </Text>
                {schedules[day].map((event, index) => (
                  <Text key={index}>
                    {event.name} at {event.time} in {event.place}
                  </Text>
                ))}
              </Box>
            ))}
          </Grid>
        </AnimatedBox>
      )}
      <ScheduleModal isOpen={isOpen} onClose={onClose} onSubmit={handleModalSubmit} />
    </Grid>
  );
};

export default WeeklySchedule;
