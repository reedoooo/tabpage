import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Stack } from "@chakra-ui/react";

const EditTabFormsModal = ({ initialValues, onSubmit, onClose, onDelete }) => {
  const [name, setName] = useState(initialValues.name);
  const [size, setSize] = useState(initialValues.size);
  const [color, setColor] = useState(initialValues.color);
  const [linkUrl, setLinkUrl] = useState(initialValues.linkUrl);
  const [imgUrl, setImgUrl] = useState(initialValues.imgUrl);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialValues.id, name, size, color, linkUrl, imgUrl });
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    onDelete({ id: initialValues.id, name, size, color, linkUrl, imgUrl });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleFormSubmit}>
          <ModalHeader>Edit Tab</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Size</FormLabel>
                <Select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="small">Small</option>
                  <option value="large">Large</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Color</FormLabel>
                <Select value={color} onChange={(e) => setColor(e.target.value)}>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Link URL</FormLabel>
                <Input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input type="url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="green" mr={3}>Save Changes</Button>
            <Button onClick={handleFormDelete} colorScheme="red" mr={3}>Delete</Button>
            <Button onClick={onClose} colorScheme="gray">Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditTabFormsModal;
