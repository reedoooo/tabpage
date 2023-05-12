import {
  Box,
  ChakraProvider,
  Grid,
  useDisclosure,
  extendTheme,
} from "@chakra-ui/react";
import EditModal from "../../components/modals/EditModal";
import { useState } from "react";
import Header from "../../containers/header/Header";
import Tab from "../../components/buttons/Tab"; // Import the new component

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

  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, color, url, url2 } = e.target.elements;

    // Check if the elements exist before accessing their values
    if (name && color && url && url2) {
      setLinks((prevLinks) => [
        ...prevLinks,
        {
          name: name.value,
          color: color.value,
          linkUrl: url.value,
          imgUrl: url2.value,
        },
      ]);
    }

    onClose();
  };

  console.log("protabs reached");

  return (
    <ChakraProvider theme={theme}>
      <Header onOpen={onOpen} />

      <Box width="100vw" height="100vh" padding={4}>
        <Grid
          templateColumns="repeat(6, 1fr)"
          templateRows="repeat(5, 1fr)"
          gap={4}
          minHeight="100%"
          minWidth="100%"
        >
          {links.map((link, index) => (
            <Tab key={index} link={link} /> // Use the new component here
          ))}
        </Grid>

        <EditModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} />
      </Box>
    </ChakraProvider>
  );
}

export default ProTabs;
