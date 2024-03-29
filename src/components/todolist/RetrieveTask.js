import React, { useState } from 'react';
import {
  VStack,
  Button,
  useColorModeValue,
  Collapse,
  Box,
  Text,
  Badge,
} from '@chakra-ui/react';
import UpdateTask from './UpdateTask'; // Assuming you have this component in the same directory

function TaskAccordion({ onClose, onOpenModal, task, allTasks }) {
  const [show, setShow] = useState(false);
  const color = useColorModeValue('gray.700', 'gray.50');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const buttonColor = useColorModeValue('gray.200', 'gray.700');
  const boxBgColor = useColorModeValue('gray.100', 'gray.600');

  const handleToggle = () => setShow(!show);
  return (
    <VStack spacing={4} id="task-accordion-container">
      <Button
        onClick={handleToggle}
        colorScheme="teal"
        variant="outline"
        width="100%"
        _hover={{ bg: buttonColor }}
      >
        {show ? `Hide ${task.name}` : `${task.name}`}
      </Button>
      <Collapse in={show}>
        <Box
          border="1px"
          borderColor={borderColor}
          p={5}
          borderRadius="md"
          w={'100%'}
          bg={boxBgColor}
        >
          <Text fontSize="lg" color={color} fontWeight="bold">
            Task: {task.name}
          </Text>
          <Text fontSize="sm" color={color}>
            Created At: {task.createdAt}
          </Text>
          <Text fontSize="sm" color={color}>
            Description: {task.description}
          </Text>
          <Text fontSize="sm" color={color}>
            Status:
            <Badge colorScheme={task.status ? 'green' : 'red'} ml="2">
              {task.status ? 'completed' : 'incomplete'}
            </Badge>
          </Text>
          <Button colorScheme="blue" onClick={onOpenModal} mt="4">
            Edit
          </Button>
          <UpdateTask
            id={task._id}
            task={task}
            allTasks={allTasks}
            onClose={onClose}
          />
        </Box>
      </Collapse>
    </VStack>
  );
}

export default TaskAccordion;
