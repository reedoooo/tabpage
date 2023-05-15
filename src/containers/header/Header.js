import React from "react";
import "./header.css";
import { Grid, GridItem } from "@chakra-ui/react";
import OpenSettingsButton from "../../components/buttons/OpenSettingsButton";
import AddTabModalButton from "../../components/buttons/AddTabModalButton";

function Header( isOpen, onOpen ) {
  // const [isAddTabOpen, setAddTabOpen] = useState(false);
  // const [isSettingsOpen, setSettingsOpen] = useState(false);

  // const handleOpenAddTab = () => setAddTabOpen(true);

  // const handleOpenSettings = () => setSettingsOpen(true);

  return (
    <header
      id="header"
      style={{
        display: "block",
        minHeight: "10vh",
        minWidth: "100vw",
      }}
    >
      <Grid
        templateColumns="repeat(1, 1fr)"
        templateRows={"repeat(2, 1fr)"}
        gap={2}
        minHeight="10vh"
        minWidth="100vw"
        padding={4}
      >
        <GridItem colSpan={1} rowSpan={1} colStart={8} rowStart={1}>
          <AddTabModalButton isOpen={isOpen} onOpen={onOpen} />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} colStart={8} rowStart={2}>
          <OpenSettingsButton isOpen={isOpen} onOpen={onOpen} />
        </GridItem>
      </Grid>
    </header>
  );
}

export default Header;
