import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Heading,
  useColorModeValue,
  VStack,
  Progress,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import TaskAccordion from "../../components/todolist/RetrieveTask";
import UpdateTask from "../../components/todolist/UpdateTask";

function ToDoList({ task }) {
  const [selectedTask, setSelectedTask] = useState(task);
  const [savedTasks, setSavedTasks] = useState([]);

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
              };
            });
            savedTasksData = [...savedTasksData, ...tasks];
          }
        });
        setSavedTasks(savedTasksData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoLists();
    setSelectedTask(task);
  }, [task]);

  const bg = useColorModeValue("gray.50", "gray.700");

  const handleOpenModal = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  // Compute the progress
  const completedTasks = savedTasks.filter(task => task.status === "completed").length;
  const totalTasks = savedTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <>
        {/* <VStack
      spacing={5}
      align="stretch"
      bg={bg}
      borderRadius="md"
      boxShadow="md"
      p={5}
    ></VStack> */}
      <Flex justify="space-between" alignItems="center">
        <Heading size="md">
          My To-Do List
        </Heading>
        <Box w="50%">
          <Progress colorScheme="green" value={progress} size="xs" />
        </Box>
      </Flex>

      <Grid
        templateColumns="repeat(1, 1fr)" // for 1 column grid, adjust as needed
        // gap={4} // spacing between grid items
      >
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
          size="xs"
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={handleCloseModal} // added this line
        />
      )}
    </>
  );
}

export default ToDoList;
