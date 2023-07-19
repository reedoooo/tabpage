import React from 'react';
import { Circle } from '@chakra-ui/react';
import { FcSettings } from 'react-icons/fc';

function OpenSettingsButton({ isOpen, onOpen }) {
  return (
    <Circle
      id="open-settings-button"
      size="50px"
      backgroundColor="teal.500"
      color="white"
      onClick={onOpen}
    >
      <FcSettings />
    </Circle>
  );
}

export default OpenSettingsButton;
