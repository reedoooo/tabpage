import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import EditTabFormsModal from "../modals/EditTabFormsModal";

function EditTabModalButton({ tabIndex, tabId, allTabs, selectedTab, onOpen, onClose }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  // const handleCloseModal = () => {
  //   // setIsOpen(false);
  // };
  console.log(tabId)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("id: ", tabId);
    const id = tabId;
    const response = await fetch(`/myTabRoutes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, size, color, linkUrl, imgUrl }),
    });
    const data = await response.json();
    console.log(data);
  };

  // console.log(selectedTab);

  return (
    <section
      id="edit-specific-tab-button-section"
      style={{ position: "absolute", top: 0, right: 0 }}
    >
      <Button
        // id="edit-specific-tab-button"
        onClick={onOpen} // Use onOpen passed from the parent
        style={{ zIndex: "100" }}
      >
        Edit
      </Button>

      <EditTabFormsModal
        // isOpen={isOpen}
        onSubmit={handleFormSubmit}
        // onClose={handleCloseModal}
        onClose={onClose}
        tabIndex={tabIndex}
        tabId={tabId}
        selectedTab={selectedTab}
        allTabs={allTabs}
        onNameChange={(e) => setName(e.target.value)}
        onSizeChange={(e) => setSize(e.target.value)}
        onColorChange={(e) => setColor(e.target.value)}
        onLinkUrlChange={(e) => setLinkUrl(e.target.value)}
        onImgUrlChange={(e) => setImgUrl(e.target.value)}
      />
    </section>
  );
}

export default EditTabModalButton;
