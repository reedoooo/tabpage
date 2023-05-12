import React from "react";
import { Circle } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function ModalAddTab({ onOpen }) {
  return (
    <Circle
    id="add-tab-button"
    // zIndex = '100'
      position="fixed"
      top={8}
      right={8}
      size="50px"
      backgroundColor="teal.500"
      color="white"
      onClick={onOpen}
    >
      <FaPlus />
    </Circle>
  );
}

export default ModalAddTab;