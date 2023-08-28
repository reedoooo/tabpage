import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Progress,
  Flex,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import TaskAccordion from '../../components/todolist/RetrieveTask'; // make sure this path is correct
import UpdateTask from '../../components/todolist/UpdateTask'; // make sure this path is correct

function ToDoListContainer() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [savedTasks, setSavedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const bgColor = useBreakpointValue({ base: 'green.400', md: 'green.700' });
  const progressColor = useBreakpointValue({
    base: 'teal.400',
    md: 'teal.600',
  });

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/todo`,
        );
        const savedTasksData = response.data.map((taskData) => ({
          ...taskData,
          statusText: taskData.status ? 'completed' : 'incomplete',
        }));

        setSavedTasks(savedTasksData);
        setCompletedTasks(savedTasksData.filter((task) => task.status));
        setIncompleteTasks(savedTasksData.filter((task) => !task.status));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoLists();
  }, []);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const progress =
    savedTasks.length > 0
      ? (completedTasks.length / savedTasks.length) * 100
      : 0;

  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });

  return (
    <>
      <Box bg={bgColor} color="white" py={2} px={6} borderRadius="md">
        <Heading size={headingSize} lineHeight="shorter">
          My To-Do List
        </Heading>
        <Flex justify="space-between" alignItems="center" mt={2}>
          <Text color="white">Progress</Text>
          <Flex align="center">
            <Progress
              colorScheme={progressColor}
              value={progress}
              size="lg"
              borderRadius="md"
              h={8}
              flex={1}
              mr={2}
            />
            <Text color="white">{`${Math.round(progress)}%`}</Text>
          </Flex>
        </Flex>
      </Box>

      <Grid templateColumns="repeat(1, 1fr)" gap={4} p={4}>
        {savedTasks.map((task, i) => (
          <TaskAccordion
            key={i}
            task={task}
            allTasks={savedTasks}
            onClose={handleCloseModal}
            onOpenModal={() => handleOpenModal(task)}
          />
        ))}
      </Grid>

      {selectedTask && (
        <UpdateTask
          task={selectedTask}
          allTasks={savedTasks}
          isOpen={!!selectedTask}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default ToDoListContainer;
