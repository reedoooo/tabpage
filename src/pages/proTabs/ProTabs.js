import React, { useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Circle,
  extendTheme,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          minHeight: "320px",
        },
      },
    },
  },
});

function ProTabs() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);

  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, color, url } = e.target.elements;

    setLinks([
      ...links,
      {
        name: name.value,
        color: color.value,
        url: url.value,
      },
    ]);

    onClose();
  };

  console.log('protabs reached')

  return (
    <ChakraProvider theme={theme}>
      <Box minHeight="100vh" padding="8">
        <Grid
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(4, 1fr)"
          gap={8}
          padding={5}
          minHeight="100vh"
          minWidth="100vw"
        >
          {links.map((link, index) => (
            <Button
              key={index}
              as="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              backgroundColor={link.color}
              gridColumn="auto"
              padding={5}
 
              gridRow="auto"
              width="100%"
              height="100%"
            >
              {link.name}
            </Button>
          ))}
        </Grid>
        <Circle
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a Link</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleAddLink}>
              <ModalBody>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" required />
                </FormControl>
                <FormControl mt={4} id="color">
                  <FormLabel>Color</FormLabel>
                  <Select placeholder="Select a color" required>
                    <option value="red.500">Red</option>
                    <option value="blue.500">Blue</option>
                    <option value="green.500">Green</option>
                    <option value="yellow.500">Yellow</option>
                    <option value="purple.500">Purple</option>
                  </Select>
                </FormControl>
                <FormControl mt={4} id="url">
                  <FormLabel>URL</FormLabel>
                  <Input type="url" required />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" marginRight={3}>
                  Add Link
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default ProTabs;
