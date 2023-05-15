import React from "react";
// import { GridItem } from "@chakra-ui/react";
// import ToDoListModal from "../../components/todolist/ToDoListModal";
import { Box, Container, Heading } from "@chakra-ui/react";
import RetrieveTask from "../../components/todolist/RetrieveTask";

function ToDoList(link) {
  return (
    <>
      {/* <ToDoListModal /> */}
      <Box
        bgColor="grey"
        border="thin solid black"
        borderRadius="15px"
        padding="10px"
        height="100%"
      >
        <Heading size="md" textAlign="left" mb={2} alignItems='center' mt={2}>
          My To-Do List
        </Heading>
        <Container p={0} >
          <RetrieveTask link={link} />
        </Container>
      </Box>
    </>
  );
}

export default ToDoList;
