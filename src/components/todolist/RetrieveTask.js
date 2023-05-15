import {
  Box,
  Text,
  VStack,
  Collapse,
  Button,
  useStyleConfig,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateTask from "./UpdateTask";

function RetrieveTask() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const fetchTodoItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`
      );

      const savedNotes = response.data.map((item) => ({
        name: item.name,
        tasks: item.tasks,
        createdAt: item.createdAt,
      }));

      setItems(savedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  // A softer background color for the container
  const bg = useColorModeValue("gray.50", "gray.700");

  return (
    <VStack spacing={4} align="stretch" bg={bg} p={5} borderRadius="md" boxShadow="md">
      {items.flatMap((item, i) =>
        item.tasks.map((task, j) => (
          <TaskAccordion key={`${i}-${j}`} task={task} item={item} />
        ))
      )}
    </VStack>
  );
}

function TaskAccordion({ task, item }) {
  const [show, setShow] = useState(false);
  const styles = useStyleConfig("Button", {
    variant: "outline",
    size: "md",
    colorScheme: "teal",
  });

  const handleToggle = () => setShow(!show);

  // Additional styling for text and box elements
  const color = useColorModeValue("gray.700", "gray.50");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <VStack spacing={4} align="stretch" id="task-accordion-container">
      <Button
        onClick={handleToggle}
        sx={styles}
        _hover={{ opacity: 1 }}
        opacity={0.5}
        width="100%"
      >
        {show ? "Hide" : "Show"} {task.title}
      </Button>
      <Collapse in={show}>
        <Box border="1px" borderColor={borderColor} p={5} pl={0} pr={0} borderRadius="md" w={'100%'} bg={borderColor}>
          <Text fontSize="sm" color={color}>Task: {task.name}</Text>
          <Text fontSize="sm" color={color}>Created At: {item.createdAt}</Text>
          <Text fontSize="sm" color={color}>Description: {task.description}</Text>
          <Text fontSize="sm" color={color}>
            Status: {task.completed ? "Completed" : "Incomplete"}
          </Text>
{console.log(task._id)}
          <UpdateTask id={task._id} size="xs" />
        </Box>
      </Collapse>
    </VStack>
  );
}

export default RetrieveTask;
