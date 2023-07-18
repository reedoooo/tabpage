import React from 'react';
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
  Grid,
  IconButton,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

function EditModal({ isOpen, onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Additional styling
  const color = useColorModeValue('gray.700', 'gray.50');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverColor = useColorModeValue('blue.100', 'blue.900');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="md"
      >
        <ModalHeader color={color}>Add a Tab</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <FormControl id="name">
                <FormLabel color={color}>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  required
                  borderColor={borderColor}
                  _hover={{ borderColor: hoverColor }}
                />
              </FormControl>
              <FormControl id="size">
                <FormLabel color={color}>Size</FormLabel>
                <Select
                  placeholder="Select Size"
                  name="size"
                  required
                  borderColor={borderColor}
                  _hover={{ borderColor: hoverColor }}
                >
                  <option value="small">Small</option>
                  <option value="large">Large</option>
                </Select>
              </FormControl>
              <FormControl id="color">
                <FormLabel color={color}>Color</FormLabel>
                <Select
                  placeholder="Select a color"
                  name="color"
                  required
                  borderColor={borderColor}
                  _hover={{ borderColor: hoverColor }}
                >
                  <option value="red.500">Red</option>
                  <option value="blue.500">Blue</option>
                  <option value="green.500">Green</option>
                  <option value="yellow.500">Yellow</option>
                  <option value="purple.500">Purple</option>
                  <option value="white.500">White</option>
                </Select>
              </FormControl>
              <FormControl id="linkUrl">
                <FormLabel color={color}>Link URL</FormLabel>
                <Input
                  type="url"
                  name="linkUrl"
                  required
                  borderColor={borderColor}
                  _hover={{ borderColor: hoverColor }}
                />
              </FormControl>
              <FormControl id="imgUrl">
                <FormLabel color={color}>Image URL</FormLabel>
                <Input
                  type="url"
                  name="imgUrl"
                  required
                  borderColor={borderColor}
                  _hover={{ borderColor: hoverColor }}
                />
              </FormControl>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Grid
              templateColumns="repeat(2, 2fr)"
              templateRows="repeat(1fr, 1fr)"
              width="100%"
              gap={6}
            >
              <IconButton
                type="submit"
                colorScheme="blue"
                icon={<CheckIcon />}
                aria-label="Add Link"
              />
              <IconButton
                onClick={onClose}
                colorScheme="red"
                icon={<CloseIcon />}
                aria-label="Cancel"
              />
            </Grid>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
