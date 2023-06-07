import React from "react";
import {
  Box,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import AddTabModalButton from "../../components/buttons/AddTabModalButton";
import OpenSettingsButton from "../../components/buttons/OpenSettingsButton";

function Header({ addTabModalDisclosure, settingsModalDisclosure }) {
  const bg = useColorModeValue("linear(to-r, pink.500, purple.500)", "gray.700");
  const color = useColorModeValue("white", "gray.50");
  const addButtonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <header id="header">
      <Grid
        templateColumns="repeat(1, 1fr)"
        templateRows={{ base: "repeat(2, 1fr)", md: "1fr" }}
        gap={2}
        zIndex={1}
        minHeight="5vh"
        minWidth="100vw"
        padding={4}
        bg={bg}
        color={color}
        borderRadius="lg"
        boxShadow="2xl"
        backdropFilter="saturate(180%) blur(5px)"
        opacity="0.8"
      >
        <GridItem colSpan={1} rowSpan={1} colStart={9} rowStart={1}>
          <AddTabModalButton
            isOpen={addTabModalDisclosure.isOpen}
            onOpen={addTabModalDisclosure.onOpen}
            buttonSize={addButtonSize}
            _hover={{
              scale: "1.2",
              boxShadow: "xl",
            }}
            transition="all 0.2s ease-in-out"
          />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} colStart={9} rowStart={2}>
          <OpenSettingsButton
            isOpen={settingsModalDisclosure.isOpen}
            onOpen={settingsModalDisclosure.onOpen}
            _hover={{
              scale: "1.2",
              boxShadow: "xl",
            }}
            transition="all 0.2s ease-in-out"
          />
        </GridItem>
      </Grid>
    </header>
  );
}

export default Header;
