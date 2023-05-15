import React from "react";
import {
  Button,
  ButtonGroup,
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

function EditTabFormsModal({ isOpen, onClose, onDelete, onSubmit, id, index, 
  onNameChange, onSizeChange, onColorChange, onLinkUrlChange, onImgUrlChange }) {
  
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h2>Edit a Link</h2>
          <h3>Current id: {`${id}`}</h3>
          <h3>Current index: {`${index}`}</h3>

        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" onChange={onNameChange} required />
            </FormControl>
            <FormControl mt={4} id="size">
              <FormLabel>Size</FormLabel>
              <Select placeholder="Select Size" name="size" onChange={onSizeChange} >
                <option value="small">Small</option>
                <option value="large">Large</option>
              </Select>
            </FormControl>
            <FormControl mt={4} id="color">
              <FormLabel>Color</FormLabel>
              <Select placeholder="Select a color" name="color" onChange={onColorChange} >
                <option value="red.500">Red</option>
                <option value="blue.500">Blue</option>
                <option value="green.500">Green</option>
                <option value="yellow.500">Yellow</option>
                <option value="purple.500">Purple</option>
              </Select>
            </FormControl>
            <FormControl mt={4} id="linkUrl">
              <FormLabel>Link URL</FormLabel>
              <Input type="url" name="linkUrl" onChange={onLinkUrlChange} />
            </FormControl>
            <FormControl mt={4} id="imgUrl">
              <FormLabel>Image URL</FormLabel>
              <Input type="url" name="imgUrl" onChange={onImgUrlChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={onDelete}
                colorScheme="red"
                marginRight={3}
              >
                Delete
              </Button>
              <Button type="submit" colorScheme="blue" marginRight={3}>
                Save Changes
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditTabFormsModal;
