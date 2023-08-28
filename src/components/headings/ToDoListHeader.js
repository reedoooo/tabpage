import {
  Box,
  Flex,
  Heading,
  Progress,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useToDoList } from './ToDoListContext';

export function ToDoListHeader() {
  const { savedTasks, completedTasks } = useToDoList();
  const bgColor = useBreakpointValue({ base: 'green.400', md: 'green.700' });
  const progressColor = useBreakpointValue({
    base: 'teal.400',
    md: 'teal.600',
  });
  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const progress = savedTasks.length
    ? (completedTasks.length / savedTasks.length) * 100
    : 0;

  return (
    <Box
      bg={bgColor}
      color="white"
      py={2}
      px={6}
      borderRadius="md"
      maxHeight="5vh"
    >
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
  );
}
