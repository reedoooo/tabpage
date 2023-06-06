import React, { useEffect, useState } from "react";
import { IconButton, FormControl, FormLabel, Input, Grid } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";

const EditTaskFormsModal = ({ initialValues, onSubmit, onClose, onDelete }) => {
  const [name, setName] = useState(initialValues.name || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [status, setStatus] = useState(initialValues.status || "");
  const [dueDate, setDueDate] = useState("");
  console.log(initialValues);
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
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
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

        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <IconButton
            type="submit"
            colorScheme="green"
            icon={<CheckIcon />}
            aria-label="Save"
          />
          <IconButton
            onClick={handleFormDelete}
            colorScheme="red"
            icon={<DeleteIcon />}
            aria-label="Delete"
          />
          <IconButton
            onClick={onClose}
            colorScheme="gray"
            icon={<CloseIcon />}
            aria-label="Cancel"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditTaskFormsModal;
