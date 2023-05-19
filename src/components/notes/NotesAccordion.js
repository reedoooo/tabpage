import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";

function NotesAccordion({ note, setNote, allNotes }) {
  const buttonColor = useColorModeValue("gray.200", "gray.700");

  return (
    <div className="container">
      {allNotes.map((noteItem, index) => (
        <div key={index}>
          <Button
            colorScheme="teal"
            variant="outline"
            width="100%"
            _hover={{ bg: buttonColor }}
            onClick={() => setNote(noteItem)} // Clicking on a note loads it into the editing area
          >
            Show {noteItem.title}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default NotesAccordion;

// // import React, { useState } from "react";
// // import { Button, useColorModeValue, Collapse, Box, Text, Badge } from "@chakra-ui/react";

// // // import UpdateNote from "./UpdateNote"; // Assuming you have this component in the same directory

// // function NotesAccordion({ onClose, onOpenModal, note, setNote, allNotes }) {
// //   const [show, setShow] = useState(false);

// //   const color = useColorModeValue("gray.700", "gray.50");
// //   const borderColor = useColorModeValue("gray.200", "gray.600");
// //   const buttonColor = useColorModeValue("gray.200", "gray.700");
// //   const boxBgColor = useColorModeValue("gray.100", "gray.600");

// //   // const handleToggle = () => setShow(!show);
// //   const handleToggle = () => {
// //     setNote(note); // change: set the note when the button is clicked

// //     setShow(!show);
// //   };

// //   return (
// //     <div className="container">
// //       {/* // <VStack spacing={4} align="stretch" id="task-accordion-container"> */}
// //       {/* <div id="task-accordion-container"> */}
// //       {allNotes.map((noteItem, index) => (
// //         <div key={index}>
// //           <Button
// //             colorScheme="teal"
// //             variant="outline"
// //             width="100%"
// //             _hover={{ bg: buttonColor }}
// //             onClick={() => setNote(noteItem)} // Clicking on a note loads it into the editing area
// //           >
// //             Show {noteItem.title}
// //           </Button>
// //           <Collapse in={note && note.id === noteItem.id}>
// //             <Box
// //               border="1px"
// //               borderColor={borderColor}
// //               p={5}
// //               borderRadius="md"
// //               w={"100%"}
// //               bg={boxBgColor}
// //             >
// //               {/* Note details removed as they are now displayed in the input area */}
// //             </Box>
// //           </Collapse>
// //         </div>
// //       ))}
// //       ;
// //     </div>
// //   );
// // }

// // export default NotesAccordion;

// import React, { useState } from "react";
// import {
//   // VStack,
//   Button,
//   useColorModeValue,
//   Collapse,
//   Box,
//   Text,
// } from "@chakra-ui/react";
// import UpdateNote from "./UpdateNote"; // Assuming you have this component in the same directory

// function NotesAccordion({ onClose, onOpenModal, note, setNote }) {
//   const [show, setShow] = useState(false);

//   const color = useColorModeValue("gray.700", "gray.50");
//   const borderColor = useColorModeValue("gray.200", "gray.600");
//   const buttonColor = useColorModeValue("gray.200", "gray.700");
//   const boxBgColor = useColorModeValue("gray.100", "gray.600");
//   const handleOpenModal = (note) => {
//     onOpenModal(note);
//   };
//   // const handleToggle = () => setShow(!show);
//   const handleToggle = () => {
//     setNote(note); // change: set the note when the button is clicked

//     setShow(!show);
//   };

//   return (
//     <div className="container">
//       {/* // <VStack spacing={4} align="stretch" id="task-accordion-container"> */}
//       {/* <div id="task-accordion-container"> */}

//       <Button
//         onClick={handleToggle}
//         colorScheme="teal"
//         variant="outline"
//         width="100%"
//         _hover={{ bg: buttonColor }}
//       >
//         {show ? `Hide ${note.title}` : `Show ${note.title}`}
//       </Button>
//       <Collapse in={show}>
//         <Box
//           border="1px"
//           borderColor={borderColor}
//           p={5}
//           borderRadius="md"
//           w={"100%"}
//           bg={boxBgColor}
//         >
//           <Text fontSize="lg" color={color} fontWeight="bold">
//             Title: {note.title}
//           </Text>
//           <Text fontSize="sm" color={color}>
//             Body: {note.notes}
//           </Text>
//           <button onClick={() => handleOpenModal(note)}>Load Note</button>

//           <UpdateNote
//             id={note._id}
//             note={note}
//             // allTasks={allTasks}
//             onClose={onClose}
//           />
//         </Box>
//       </Collapse>
//     </div>
//     // </VStack>
//   );
// }

// export default NotesAccordion;
