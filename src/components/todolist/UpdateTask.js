import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useColorModeValue
} from "@chakra-ui/react";
import EditTaskFormsModal from "../modals/EditTaskFormsModal";

function UpdateTask({ id, task, onClose, isOpen, selectedTask, allTasks }) {
  const modalBgColor = useColorModeValue("white", "gray.700");
  const headerColor = useColorModeValue("gray.700", "gray.50");

  const handleSubmit = async (updatedTask) => {
    const id = updatedTask.id;
    const task = updatedTask.task;
    const completed = updatedTask.status;
    console.log(task);
    console.log(completed);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedTask }),
      });
      window.location.reload();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (deletedTask) => {
    const id = deletedTask.id;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBgColor}>
          <ModalHeader color={headerColor}>Edit Task</ModalHeader>
          <ModalCloseButton color={headerColor} />
          <ModalBody>
            <EditTaskFormsModal
              initialValues={task}
              onSubmit={handleSubmit}
              onClose={onClose}
              onDelete={handleDelete}
              selectedTask={selectedTask}
              allTasks={allTasks}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateTask;
