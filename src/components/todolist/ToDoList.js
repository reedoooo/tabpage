import React, { useState } from 'react';
import UpdateTask from '../../components/todolist/UpdateTask';
import { ToDoListHeader } from './ToDoListHeader';
import { TaskList } from './TaskList';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]); // Example State for holding tasks
  const [selectedTask, setSelectedTask] = useState(null); // Example State for selected task
  const [isModalOpen, setModalOpen] = useState(false); // Example State for controlling modal

  const onOpenModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
  };

  return (
    <>
      <ToDoListHeader />
      <TaskList tasks={tasks} onOpenModal={onOpenModal} />
      {isModalOpen && (
        <UpdateTask
          task={selectedTask}
          allTasks={tasks}
          onClose={onCloseModal}
        />
      )}
    </>
  );
}
