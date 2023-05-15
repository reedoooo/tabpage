import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import EditTabFormsModal from "../modals/EditTabFormsModal";

function EditTabModalButton({
  allTabs,
  selectedTab,
  onClose,
  tab,
  isOpen,
  onOpen,
}) {

  const handleSubmit = async (updatedTab) => {
    const id = updatedTab.id;
    console.log(id);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/myTabRoutes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedTab }),
      });
      window.location.reload();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (deletedTab) => {
    const id = deletedTab.id;
    console.log(id);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/myTabRoutes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <section
      id="edit-specific-tab-button-section"
      style={{ position: "absolute", top: 0, right: 0 }}
    >
      <Button onClick={onOpen}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalHeader>Edit Tab</ModalHeader>
        <ModalContent>
          <EditTabFormsModal
            initialValues={tab}
            onSubmit={handleSubmit}
            onClose={onClose}
            onDelete={handleDelete}
            selectedTab={selectedTab}
            allTabs={allTabs}
          />
        </ModalContent>
      </Modal>
    </section>
  );
}

export default EditTabModalButton;
