import React from "react";
import { Circle } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function AddTabModalButton({ onOpen }) {
  return (
    <Circle
      id="add-tab-button"
      size="50px"
      backgroundColor="teal.500"
      color="white"
      onClick={onOpen}
      
    >
      <FaPlus />
    </Circle>
  );
}

export default AddTabModalButton;
