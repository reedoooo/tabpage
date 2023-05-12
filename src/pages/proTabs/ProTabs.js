import { ChakraProvider, useDisclosure, extendTheme } from "@chakra-ui/react";
import EditModal from "../../components/modals/EditModal";
import { useState } from "react";
import Header from "../../containers/header/Header";
import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
import axios from "axios";

function ProTabs() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);

  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: {
          dialog: {
            minHeight: "320px",
          },
        },
      },
    },
  });

  const handleAddTabToServer = async (newLink) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/myTabRoutes`, newLink);
      const savedData = response.data; // Extract the saved data from the response
      console.log(savedData); // Display the saved data
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, size, color, url, url2 } = e.target.elements;

    if (name.value && size.value && color.value && url.value && url2.value) {
      const newLink = {
        // index: index.value,
        name: name.value,
        size: size.value,
        color: color.value,
        linkUrl: url.value,
        imgUrl: url2.value,
      };

      setLinks((prevLinks) => [...prevLinks, newLink]);

      handleAddTabToServer(newLink);
    }

    onClose();
  };

  console.log("protabs reached");

  return (
    <ChakraProvider theme={theme}>
      <Header onOpen={onOpen} />
      <TabGridContainer links={links} />
      <EditModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} />
    </ChakraProvider>
  );
}

export default ProTabs;

// import { ChakraProvider, useDisclosure, extendTheme } from "@chakra-ui/react";
// import EditModal from "../../components/modals/EditModal";
// import { useState } from "react";
// import Header from "../../containers/header/Header";
// import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
// import axios from "axios";

// function ProTabs() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [links, setLinks] = useState([]);

//   const theme = extendTheme({
//     components: {
//       Modal: {
//         baseStyle: {
//           dialog: {
//             minHeight: "320px",
//           },
//         },
//       },
//     },
//   });

//   const handleAddTabToServer = async (newLink) => {
//     const optionsForPost = {
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ newLink }),
//       url: `${process.env.REACT_APP_SERVER}/api/myTabRoutes`,
//     };
//     try {
//       const response = await axios(optionsForPost);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddLink = (e) => {
//     e.preventDefault();
//     const { name, color, url, url2 } = e.target.elements;

//     if (name && color && url && url2) {
//       const newLink = {
//         name: name.value,
//         color: color.value,
//         linkUrl: url.value,
//         imgUrl: url2.value,
//       };

//       setLinks((prevLinks) => [
//         ...prevLinks,
//         newLink,
//       ]);

//       handleAddTabToServer(newLink);
//     }

//     onClose();
//   };

//   console.log("protabs reached");

//   return (
//     <ChakraProvider theme={theme}>
//       <Header onOpen={onOpen} />
//       <TabGridContainer links={links} />
//       <EditModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} />
//     </ChakraProvider>
//   );
// }

// export default ProTabs;

// import { ChakraProvider, useDisclosure, extendTheme } from "@chakra-ui/react";
// import EditModal from "../../components/modals/EditModal";
// import { useState } from "react";
// import Header from "../../containers/header/Header";
// import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
// import axios from "axios";

// function ProTabs() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [links, setLinks] = useState([]);

//   const theme = extendTheme({
//     components: {
//       Modal: {
//         baseStyle: {
//           dialog: {
//             minHeight: "320px",
//           },
//         },
//       },
//     },
//   });

//   const handleAddTabToServer = async (newLink) => {
//     const optionsForPost = {
//       method: "POST",
//       url: `${process.env.REACT_APP_SERVER}/api/myTabRoutes`,
//       data: newLink,
//     };
//     try {
//       const response = await axios(optionsForPost);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddLink = (e) => {
//     e.preventDefault();
//     const { name, color, url, url2 } = e.target.elements;

//     if (name && color && url && url2) {
//       const newLink = {
//         name: name.value,
//         color: color.value,
//         linkUrl: url.value,
//         imgUrl: url2.value,
//       };

//       setLinks((prevLinks) => [
//         ...prevLinks,
//         newLink,
//       ]);

//       handleAddTabToServer(newLink);
//     }

//     onClose();
//   };

//   console.log("protabs reached");

//   return (
//     <ChakraProvider theme={theme}>
//       <Header onOpen={onOpen} />
//       <TabGridContainer links={links} />
//       <EditModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} />
//     </ChakraProvider>
//   );
// }

// export default ProTabs;
