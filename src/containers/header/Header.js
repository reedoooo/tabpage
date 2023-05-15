import React from "react";
import "./header.css";
import { Box } from "@chakra-ui/react";
import AddTabButton from "../../components/buttons/AddTabModalButton";

function Header({ onOpen }) {
  return (
    <header id="header" style={{ display: "block", minHeight: "10vh" }}>
      <Box>
        <AddTabButton onOpen={onOpen} />
      </Box>
    </header>
  );
}

export default Header;
