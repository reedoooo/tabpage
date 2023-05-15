import React, { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const EditTaskFormsModal = ({
  initialValues,
  onSubmit,
  onClose,
  onDelete,
}) => {
  const [name, setName] = useState(initialValues.name || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [status, setStatus] = useState(initialValues.status || "");
  const [dueDate, setDueDate] = useState("");
console.log(initialValues)
  let id = initialValues.id;
  let deleteId = initialValues.id;

  useEffect(() => {
    const date = new Date(initialValues.dueDate);
    const formattedDueDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setDueDate(formattedDueDate);
  }, [initialValues.dueDate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, name, status, description, dueDate });
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    let id = deleteId;
    onDelete({ id, name, status, description, dueDate });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl id="description">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </FormControl>

      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </FormControl>

      <FormControl id="due-date">
        <FormLabel>Due Date</FormLabel>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormControl>

      <FormControl id="status">
        <FormLabel>Status</FormLabel>
        <Input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
      </FormControl>

      <Button type="submit" colorScheme="green">
        Save
      </Button>
      <Button onClick={handleFormDelete} colorScheme="red" mt={4}>
        Delete
      </Button>
      <Button onClick={onClose} colorScheme="gray" mt={4}>
        Cancel
      </Button>
    </form>
  );
};

export default EditTaskFormsModal;
