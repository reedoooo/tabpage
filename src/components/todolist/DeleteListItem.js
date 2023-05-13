import React from 'react';
import { Button } from "@chakra-ui/react";

function DeleteListItem({ itemId }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/myTodoRoutes/${itemId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Button onClick={handleDelete} colorScheme="red" mt={4}>Delete Todo Item</Button>
  );
}

export default DeleteListItem;
