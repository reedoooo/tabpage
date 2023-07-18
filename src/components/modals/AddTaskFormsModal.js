import React from 'react';
import {
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import CreateTask from '../todolist/CreateTask';

export default function ToDoListModal({ isOpen, onClose }) {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const secondaryTextColor = useColorModeValue('gray.700', 'gray.50');

  return (
    <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundColor={bgColor}
        color={secondaryTextColor}
        borderRadius="8px"
      >
        <Box borderBottom="1px" borderBottomColor={secondaryTextColor} p={4}>
          <ModalHeader fontSize="2xl" fontWeight="bold">
            Todo List
          </ModalHeader>
          <ModalCloseButton />
        </Box>
        <ModalBody p={4}>
          <Center>
            <VStack
              spacing={4}
              align="stretch"
              w="full"
              h="full"
              p={5}
              rounded="xl"
              borderWidth={1}
              borderColor={secondaryTextColor}
            >
              <CreateTask />
            </VStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
