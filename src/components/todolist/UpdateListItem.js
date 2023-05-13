import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import DeleteTodoItemButton from './DeleteItem';

function UpdateListItem({ itemId }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/myTodoRoutes/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, dueDate, status }),
    });
    const data = await response.json();
    console.log(data);
  };  

  return (
    // <Box w="50%" p={4} bg="gray.100" borderRadius="md" mt={6}>
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </FormControl>

        <FormControl id="due-date">
          <FormLabel>Due Date</FormLabel>
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </FormControl>

        <FormControl id="status">
          <FormLabel>Status</FormLabel>
          <Input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
        </FormControl>

        <Button type="submit" colorScheme="teal">Update Todo Item</Button>
        <DeleteTodoItemButton itemId={itemId} />

      </VStack>
    // </Box>
  );
}

export default UpdateListItem;
