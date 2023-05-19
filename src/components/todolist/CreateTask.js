import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
// import DeleteTodoItemButton from './DeleteTask';

function CreateTask() {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [name, setname] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/myTodoRoutes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, dueDate, status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>

      <FormControl id="description">
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name" />
      </FormControl>

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

      <Button type="submit" colorScheme="blue">Create Todo Item</Button>
      {/* <DeleteTodoItemButton itemId={itemId} /> */}

    </VStack>
  );
}

export default CreateTask;
