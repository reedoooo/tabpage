import React, { useEffect, useState } from 'react';
import { useColorModeValue, VStack } from '@chakra-ui/react';
import axios from 'axios';

function TcgPlaerContainer({ task }) {
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/token`,
        );
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error in token generation:', error);
      }
    };

    getToken();
  }, []);

  const getCategories = async () => {
    if (!token) {
      console.error('Token is not yet generated');
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/catalog/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategories(response.data.results);
    } catch (error) {
      console.error('Error in getting catalog categories:', error);
    }
  };

  const bg = useColorModeValue('gray.50', 'gray.700');

  //   const handleOpenModal = (task) => {
  //     setSelectedTask(task);
  //   };

  //   const handleCloseModal = () => {
  //     setSelectedTask(null);
  //   };

  return (
    <VStack
      spacing={5}
      align="stretch"
      bg={bg}
      borderRadius="md"
      boxShadow="md"
      p={5}
    >
      <div>
        <button onClick={getCategories}>Get Categories</button>
        {categories && (
          <ul>
            {categories.map((category) => (
              <li key={category.categoryId}>{category.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* <Grid
        templateColumns="repeat(1, 1fr)" // for 1 column grid, adjust as needed
        gap={4} // spacing between grid items
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
      )} */}
    </VStack>
  );
}

export default TcgPlaerContainer;
