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
} from "@chakra-ui/react";

function EditModal({ isOpen, onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Link</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" required />
            </FormControl>
            <FormControl mt={4} id="size">
              <FormLabel>Size</FormLabel>
              <Select placeholder="Select Size" id='size' name="size" required>
                <option value="small">Small</option>
                <option value="large">Large</option>
              </Select>
            </FormControl>
            <FormControl mt={4} id="color">
              <FormLabel>Color</FormLabel>
              <Select placeholder="Select a color" name="color" required>
                <option value="red.500">Red</option>
                <option value="blue.500">Blue</option>
                <option value="green.500">Green</option>
                <option value="yellow.500">Yellow</option>
                <option value="purple.500">Purple</option>
              </Select>
            </FormControl>
            <FormControl mt={4} id="linkUrl">
              <FormLabel>Link URL</FormLabel>
              <Input type="url" name="linkUrl" required />
            </FormControl>
            <FormControl mt={4} id="imgUrl">
              <FormLabel>Image URL</FormLabel>
              <Input type="url" name="imgUrl" required />
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
  );
}

export default EditModal;
