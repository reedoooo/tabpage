import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ToDoListContext = createContext();

export function useToDoList() {
  return useContext(ToDoListContext);
}

export function ToDoListProvider({ children }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [savedTasks, setSavedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        // Assuming your server API supports a 'limit' parameter to limit the number of tasks
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/todo?limit=7`,
        );
        let savedTasksData = response.data
          .map((taskData) => {
            // Assuming each taskData contains an array called 'task'
            return taskData.task.map((task) => {
              return {
                name: task.name,
                description: task.description,
                status: task.status,
                dueDate: task.dueDate,
                id: taskData._id,
                statusText: task.status ? 'completed' : 'incomplete',
              };
            });
          })
          .flat();

        setSavedTasks(savedTasksData);

        const completed = savedTasksData.filter((task) => task.status === true);
        const incomplete = savedTasksData.filter(
          (task) => task.status !== true,
        );

        setCompletedTasks(completed);
        setIncompleteTasks(incomplete);
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

  const addTask = async (newTask) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/todo`,
        newTask,
      );
      // Update state based on the new task
      setSavedTasks([...savedTasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    console.log('updateTask', taskId, updatedTask);
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER}/api/todo/${taskId.toString()}`, // Convert taskId to string
        updatedTask,
      );
      // Update local state
      setSavedTasks(
        savedTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!taskId) {
      console.error('Task ID is undefined');
      return;
    }
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/todo/${taskId.toString()}`,
      );
      // Update local state
      setSavedTasks(savedTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    selectedTask,
    savedTasks,
    completedTasks,
    incompleteTasks,
    handleOpenModal,
    // setSavedTasks,
    handleCloseModal,
    addTask,
    updateTask,
    deleteTask,
  };

  useEffect(() => {
    console.log('TODOLIST CONTEXT:', {
      value,
    });
  }, [value]);

  return (
    <ToDoListContext.Provider value={value}>
      {children}
    </ToDoListContext.Provider>
  );
}
