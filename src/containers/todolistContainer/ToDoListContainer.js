import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Progress,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import TaskAccordion from "../../components/todolist/RetrieveTask";
import UpdateTask from "../../components/todolist/UpdateTask";

function ToDoList({ task }) {
  const [selectedTask, setSelectedTask] = useState(task);
  const [savedTasks, setSavedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const bgColor = useColorModeValue("teal.200", "teal.700");

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
                statusText: task.status ? 'completed' : 'incomplete',
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
    savedTasks.length > 0
      ? (completedTasks.length / savedTasks.length) * 100
      : 0;

  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const boxSize = useBreakpointValue({ base: "50%", md: "100%" });

  return (
    <>
      <Flex justify="space-between" alignItems="center">
        <Heading size={headingSize} color={"white"}>
          My To-Do List
        </Heading>
        <Box w={boxSize}>
          <Progress colorScheme="teal" value={progress} size="xs" />
        </Box>
      </Flex>

      <Grid
        templateColumns="repeat(1, 1fr)"
        bg={`rgba(220, 220, 220, 0.5)`}
        boxSizing="border-box"
        borderRadius="md"
        id="notes-accordion"
        border="1px solid"
        borderColor={bgColor}
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
