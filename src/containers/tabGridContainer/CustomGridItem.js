import React from 'react';
import { css } from '@emotion/react';
import { Box, GridItem, Text } from '@chakra-ui/react';
import NotesContainer from '../notesContainer/NotesContainer';
import ToDoListContainer from '../todolistContainer/ToDoListContainer';
import ChatGPT from '../openAiContainer/OpenAiContainer';
import BlogContainer from '../blogContainer/BlogContainer';
import Tab from '../../components/tab/Tab';
// import { useNavigate } from 'react-router-dom';
import HabitTrackerContainer from '../habitTracker/HabitTrackerContainer';

const getContainerTypeMapping = (index) => {
  return {
    notes: NotesContainer,
    todo: ToDoListContainer,
    chat: ChatGPT,
    blog: BlogContainer,
    habit: HabitTrackerContainer,
    [`tab${index + 1}`]: Tab,
  };
};

const nonExpandedStyle = (bgColor) => css`
  transition: all 0.5s ease-in-out;
  background-color: ${bgColor};
  aspect-ratio: 1 / 1;
  max-width: 400px;
  max-height: 400px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 20px;
`;

const expandedStyle = css`
  transition: all 0.5s ease-in-out;
  aspect-ratio: 1 / 1;
  max-width: 800px;
  max-height: 800px;
  min-width: 40vw;
  min-height: 200px;
  border-radius: 20px;
`;

const expandedBlogAndTrackerStyle = css`
  transition: all 0.5s ease-in-out;
  aspect-ratio: 1 / 1;
  max-width: 800px;
  max-height: 800px;
  min-width: 50vw; // Specific min-width for blog
  min-height: 200px;
  border-radius: 20px;
`;

const expandedStyleSmall = css`
  transition: all 0.5s ease-in-out;
  width: 100%;
  height: auto;
`;

const CustomGridItem = ({
  label,
  tab, // new prop for tab data
  type,
  index,
  ContainerComponent: PropContainerComponent,
  selectedGridItem,
  setSelectedGridItem,
  breakpoint,
  bgColor,
}) => {
  // const navigate = useNavigate();
  const containerTypeMapping = getContainerTypeMapping(index);
  const ContainerComponent =
    containerTypeMapping[type] || PropContainerComponent;

  const handleClick = (type, tab) => {
    if (type.startsWith('tab')) {
      window.open(tab.linkUrl, '_blank'); // Open external URL in a new tab
      return;
    }
    setSelectedGridItem(type);
  };

  const getExpandedStyle = () => {
    if (breakpoint === 'base' || breakpoint === 'sm') {
      return expandedStyleSmall;
    }
    return type === 'blog' || type === 'habit'
      ? expandedBlogAndTrackerStyle
      : expandedStyle;
  };

  return (
    <GridItem
      aria-label={label}
      className="custom-grid-item-container"
      css={
        selectedGridItem === type
          ? getExpandedStyle()
          : nonExpandedStyle(bgColor)
      }
      onClick={() => handleClick(type, tab)}
    >
      {selectedGridItem !== type && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Text fontSize="xl" color="black" fontWeight="bold">
            {label}
          </Text>
        </Box>
      )}
      {selectedGridItem === type && (
        <ContainerComponent
          label={label}
          setSelectedGridItem={setSelectedGridItem}
          selectedGridItem={selectedGridItem}
          type={type} // Pass type as a prop to the component
          tab={tab} // Pass tab data to the component
        />
      )}
    </GridItem>
  );
};

export default CustomGridItem;
