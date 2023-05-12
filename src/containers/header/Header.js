import React from 'react';
import './header.css'
import { Box } from "@chakra-ui/react";
import ModalAddTab from "../../components/buttons/ModalAddTab";

function Header({ onOpen }) {
  return (
    <header id="header" style={{ display: "block", minHeight: "10vh" }}>
      <Box>

          <ModalAddTab onOpen={onOpen} />

      </Box>
    </header>
  );
}

export default Header;
