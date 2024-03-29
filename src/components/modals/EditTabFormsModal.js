import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Image,
} from '@chakra-ui/react';

const EditTabFormsModal = ({ selectedTab, onSubmit, onClose, onDelete }) => {
  const [name, setName] = useState(selectedTab.name);
  const [size, setSize] = useState(selectedTab.size);
  const [color, setColor] = useState(selectedTab.color);
  const [linkUrl, setLinkUrl] = useState(selectedTab.linkUrl);
  const [imgUrl, setImgUrl] = useState(selectedTab.imgUrl);

  useEffect(() => {
    setName(selectedTab.name);
    setSize(selectedTab.size);
    setColor(selectedTab.color);
    setLinkUrl(selectedTab.linkUrl);
    setImgUrl(selectedTab.imgUrl);
  }, [selectedTab]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: selectedTab.id, name, size, color, linkUrl, imgUrl });
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    onDelete({ id: selectedTab.id, name, size, color, linkUrl, imgUrl });
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
                <Select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
                  <option value="white">White</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Link URL</FormLabel>
                <Input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  type="url"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image Preview</FormLabel>
                <Image
                  src={imgUrl}
                  alt="Image Preview"
                  fallbackSrc="https://via.placeholder.com/150"
                  boxSize="150px"
                  objectFit="cover"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="green" mr={3}>
              Save Changes
            </Button>
            <Button onClick={handleFormDelete} colorScheme="red" mr={3}>
              Delete
            </Button>
            <Button onClick={onClose} colorScheme="gray">
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditTabFormsModal;
