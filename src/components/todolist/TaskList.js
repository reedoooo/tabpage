import { Grid } from '@chakra-ui/react';
import { useToDoList } from './ToDoListContext';
import TaskAccordion from './TaskAccordion';

export function TaskList() {
  const { savedTasks, handleOpenModal, handleCloseModal } = useToDoList();

  // Limit the number of tasks to a maximum of 7
  const limitedTasks = savedTasks.slice(0, 7);

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={4} p={4}>
      {limitedTasks.map((task, i) => (
        <TaskAccordion
          key={i}
          task={task}
          allTasks={savedTasks}
          onClose={handleCloseModal}
          onOpenModal={() => handleOpenModal(task)}
        />
      ))}
    </Grid>
  );
}
