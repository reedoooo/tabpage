import React from "react";
import { Button } from "@chakra-ui/react";
import EditSpecTabModal from "../modals/EditTabFormsModal";
import { useDisclosure } from "@chakra-ui/react";

function EditButton({ link, handleEditLink }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpperButtonClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating further
    onOpen();
  };

  return (
    <section
      id="edit-specific-tab-button-section"
      style={{ position: "absolute", top: 0, right: 0 }}
    >
      <Button
        id="edit-specific-tab-button"
        onClick={handleUpperButtonClick}
        style={{ zIndex: "100" }}
      />
      <EditSpecTabModal
        link={link}
        size={link.size}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleEditLink}
      />
    </section>
  );
}

export default EditButton;
