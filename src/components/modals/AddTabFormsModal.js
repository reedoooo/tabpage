import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

function EditModal({ isOpen, onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Additional styling
  const color = useColorModeValue("gray.700", "gray.50");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverColor = useColorModeValue("blue.100", "blue.900");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderColor={borderColor} borderWidth="1px" borderRadius="md">
        <ModalHeader color={color}>Add a Link</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormControl id="name">
              <FormLabel color={color}>Name</FormLabel>
              <Input type="text" name="name" required borderColor={borderColor} _hover={{ borderColor: hoverColor }} />
            </FormControl>
            <FormControl mt={4} id="size">
              <FormLabel color={color}>Size</FormLabel>
              <Select placeholder="Select Size" id='size' name="size" required borderColor={borderColor} _hover={{ borderColor: hoverColor }}>
                <option value="small">Small</option>
                <option value="large">Large</option>
              </Select>
            </FormControl>
            <FormControl mt={4} id="color">
              <FormLabel color={color}>Color</FormLabel>
              <Select placeholder="Select a color" name="color" required borderColor={borderColor} _hover={{ borderColor: hoverColor }}>
                <option value="red.500">Red</option>
                <option value="blue.500">Blue</option>
                <option value="green.500">Green</option>
                <option value="yellow.500">Yellow</option>
                <option value="purple.500">Purple</option>
              </Select>
            </FormControl>
            <FormControl mt={4} id="linkUrl">
              <FormLabel color={color}>Link URL</FormLabel>
              <Input type="url" name="linkUrl" required borderColor={borderColor} _hover={{ borderColor: hoverColor }} />
            </FormControl>
            <FormControl mt={4} id="imgUrl">
              <FormLabel color={color}>Image URL</FormLabel>
              <Input type="url" name="imgUrl" required borderColor={borderColor} _hover={{ borderColor: hoverColor }} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" marginRight={3}>
              Add Link
            </Button>
            <Button variant="outline" colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
