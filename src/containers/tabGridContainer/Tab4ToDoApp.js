import React from "react";
import { Button, AspectRatio, GridItem, useDisclosure, Box } from "@chakra-ui/react";
import AddTaskFormsModal from "../../components/modals/AddTaskFormsModal";

function Tab4ToDoApp({ allTabs }) {
  const buttonStyle = {
    // backgroundImage: `url(${link.imgUrl})`,
    backgroundImage: `url('https://cdn-icons-png.flaticon.com/512/3235/3235042.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "15px",
    padding: 0,
    gridColumn: "auto",
    gridRow: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpperButtonClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating further
    onOpen();
  };

  return (
    <GridItem
      width="100%"
      height="100%"
      boxSizing="border-box"
      id="modal-tab-container"
    >
      <AspectRatio ratio={1}>
        <Box
          // as="a"
          // href={allTabs.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          backgroundColor={allTabs.color}
          style={buttonStyle}
          onClick={handleUpperButtonClick} // Use the updated event handler
        >
          <section
            id="edit-specific-tab-button-section"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <Button id="edit-specific-tab-button" onClick={onOpen} />
            <AddTaskFormsModal
              isOpen={isOpen}
              onClose={onClose}
              link={allTabs}
            />
          </section>

          <section
            id="tab-title-section"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              bottom: 0,
            }}
          >
            <div style={{ marginBottom: "10%", marginTop: "1%" }}>
              <h2 id="button-content">{"ToDo App"}</h2>
            </div>
          </section>
        </Box>
      </AspectRatio>
    </GridItem>
  );
}

export default Tab4ToDoApp;
