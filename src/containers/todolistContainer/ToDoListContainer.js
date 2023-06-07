import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Progress,
  Flex,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import TaskAccordion from "../../components/todolist/RetrieveTask";
import UpdateTask from "../../components/todolist/UpdateTask";

function ToDoList({ task }) {
  const [selectedTask, setSelectedTask] = useState(task);
  const [savedTasks, setSavedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const bgColor = useBreakpointValue({ base: "green.400", md: "green.700" });
  const progressColor = useBreakpointValue({ base: "teal.400", md: "teal.600" });

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`
        );
        let savedTasksData = [];
        response.data.forEach((taskData) => {
          if (Array.isArray(taskData.task)) {
            const tasks = taskData.task.map((task) => {
              return {
                name: task.name,
                description: task.description,
                status: task.status,
                dueDate: task.dueDate,
                id: taskData._id,
                statusText: task.status ? "completed" : "incomplete",
              };
            });
            savedTasksData = [...savedTasksData, ...tasks];
          }
        });
        setSavedTasks(savedTasksData);

        const completed = savedTasksData.filter(
          (task) => task.status === true
        );
        const incomplete = savedTasksData.filter(
          (task) => task.status !== true
        );

        setCompletedTasks(completed);
        setIncompleteTasks(incomplete);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoLists();
    setSelectedTask(task);
  }, [task]);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const progress =
    savedTasks.length > 0 ? (completedTasks.length / savedTasks.length) * 100 : 0;

  const headingSize = useBreakpointValue({ base: "sm", md: "lg" });

  return (
    <>
      <Box 
      bg={bgColor} 
      color="white" 
      py={2} 
      px={6}
      borderRadius="md"
      >
        <Heading size={headingSize} lineHeight="shorter">
          My To-Do List
        </Heading>
        <Flex justify="space-between" alignItems="center" mt={2}>
          <Text color="white" >
            Progress
          </Text>
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

      <Grid
        templateColumns="repeat(1, 1fr)"
        gap={4}
        p={4}
        // mt={-3}
        bg="rgba(255, 255, 255, 0.5)"
      >
        {savedTasks.map((task, i) => (
          <TaskAccordion
            key={i}
            task={task}
            allTasks={savedTasks}
            onClose={handleCloseModal}
            onOpenModal={() => handleOpenModal(task)}
            statusText={task.statusText}
          />
        ))}
      </Grid>

      {selectedTask && (
        <UpdateTask
          size="xs"
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default ToDoList;
