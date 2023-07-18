import React from 'react';
import {
  IconButton,
  AspectRatio,
  GridItem,
  useDisclosure,
  Box,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import AddTaskFormsModal from '../../components/modals/AddTaskFormsModal';
import { EditIcon } from '@chakra-ui/icons';

function Tab4ToDoApp({ allTabs }) {
  const buttonStyle = {
    backgroundImage:
      "url('https://cdn-icons-png.flaticon.com/512/3235/3235042.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '15px',
    padding: 0,
    gridColumn: 'auto',
    gridRow: 'auto',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpperButtonClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating further
    onOpen();
  };

  // Use the useBreakpointValue hook to get the current screen size
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  // Apply different styles based on the screen size
  const gridItemStyle = isSmallScreen
    ? {
        colSpan: 2,
        rowSpan: 2,
      }
    : {
        colSpan: 1,
        rowSpan: 1,
      };

  const fontSize = useBreakpointValue({ base: 'md', md: 'xl', lg: '2xl' });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  return (
    <GridItem
      width="100%"
      height="100%"
      boxSizing="border-box"
      id="modal-tab-container"
      colSpan={gridItemStyle.colSpan}
      rowSpan={gridItemStyle.rowSpan}
      style={{ flexGrow: 1, flexShrink: 1, ...gridItemStyle }}
    >
      <AspectRatio ratio={1}>
        <Box
          target="_blank"
          rel="noopener noreferrer"
          backgroundColor={allTabs.color}
          style={buttonStyle}
          onClick={handleUpperButtonClick}
        >
          <section
            id="edit-specific-tab-button-section"
            style={{ position: 'absolute', top: 0, right: 0 }}
          >
            <IconButton
              id="edit-specific-tab-button"
              icon={<EditIcon />}
              onClick={onOpen}
              size={buttonSize}
            />
            <AddTaskFormsModal
              isOpen={isOpen}
              onClose={onClose}
              link={allTabs}
            />
          </section>

          <section
            id="tab-title-section"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              bottom: 0,
            }}
          >
            <div
              style={{
                marginBottom: '10%',
                marginTop: '1%',
                zIndex: 5,
                color: 'white',
              }}
            >
              <h2 color="white">{'todo app'}</h2>
            </div>
          </section>
        </Box>
      </AspectRatio>
    </GridItem>
  );
}

export default Tab4ToDoApp;
