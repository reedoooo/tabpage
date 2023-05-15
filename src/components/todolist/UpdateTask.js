import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import DeleteTask from './DeleteTask';

function UpdateTask({ id }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false); // State variable to manage the visibility of the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/myTodoRoutes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, dueDate, status }),
    });
    const data = await response.json();
    console.log(data);
  };  

  return (
    <VStack>
      <Button onClick={() => setShow(!show)} colorScheme="teal">
        Make Changes
      </Button>

      {show && (
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
          <FormControl id="updatename">
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </FormControl>

          <FormControl id="updatedescription">
            <FormLabel>Description</FormLabel>
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          </FormControl>

          <FormControl id="updatedue-date">
            <FormLabel>Due Date</FormLabel>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </FormControl>

          <FormControl id="updatestatus">
            <FormLabel>Status</FormLabel>
            <Input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
          </FormControl>

          <Button type="submit" colorScheme="teal">Update Todo Item</Button>
          <DeleteTask itemId={id} />
        </VStack>
      )}
    </VStack>
  );
}

export default UpdateTask;
