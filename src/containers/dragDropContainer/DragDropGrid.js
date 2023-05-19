import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box } from '@chakra-ui/react';

// Mock data
const itemsFromBackend = [...Array(7).keys()].map((i) => ({
  id: `item-${i}`,
  content: `item ${i}`,
}));
const grid = Array.from({ length: 6 }, () => Array(6).fill(null));

// Styles
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 16,
  margin: "0 0 8px 0",
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: 250,
});

const DragDropGrid = () => {
  const [state, setState] = React.useState({
    items: itemsFromBackend,
    grid,
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...state.items];
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);

    setState({ items });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {state.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    shadow="md"
                  >
                    {item.content}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropGrid;
