import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import DeleteListItem from "./DeleteListItem";
import axios from "axios";

function RetreiveListItem() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const fetchTodoItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`
      );

      const savedNotes = response.data
        .map((item) => ({
          name: item.name,
          tasks: item.tasks,
          createdAt: item.createdAt,
        }));

      console.log(savedNotes);
      setItems(savedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      {items.map((item) => (
        <Box key={item._id} p={4} bg="gray.200" borderRadius="md">
          <Heading size="md">{item.name}</Heading>
          <Text mt={2}>Created At: {item.createdAt}</Text>
          {item.tasks.map((task, index) => (
            <VStack key={index}>
              <Heading size="sm">{task.title}</Heading>
              <Text>Description: {task.description}</Text>
              <Text>Status: {task.completed ? "Completed" : "Incomplete"}</Text>
            </VStack>
          ))}
          <DeleteListItem itemId={item._id} />
        </Box>
      ))}
    </VStack>
  );
}

export default RetreiveListItem;


// import React, { useEffect, useState } from 'react';

// function TodoItemList() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchTodoItems = async () => {
//       const response = await fetch('/myTodoRoutes');
//       const data = await response.json();
//       setItems(data);
//     };

//     fetchTodoItems();
//   }, []);

//   return (
//     <div>
//       {items.map((item) => (
//         <div key={item._id}>
//           <h2>{item.description}</h2>
//           <p>Due Date: {item.dueDate}</p>
//           <p>Status: {item.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TodoItemList;
