import { ChakraProvider, useDisclosure, extendTheme } from "@chakra-ui/react";
import EditModal from "../../components/modals/AddTabFormsModal";
import { useState, useEffect } from "react";
import Header from "../../containers/header/Header";
import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
import axios from "axios";

function Home() {
  // Creating state variables and hooks
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure hook from Chakra UI to handle modal visibility
  const [links, setLinks] = useState([]); // State variable to store links
  const [savedTabsData, setSavedTabsData] = useState([]); // State variable to store saved tabs data

  // Creating a custom Chakra UI theme
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

  // useEffect hook with an empty dependency array to fetch saved tabs data when the component mounts
  useEffect(() => {
    fetchSavedTabsData();
  }, []);

  // Function to fetch saved tabs data from the server
  const fetchSavedTabsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/myTabRoutes`
      );

      const savedTabsDatax = response.data
        .filter((item) => item.tab)
        .map((item) => ({
          name: item.tab.name,
          size: item.tab.size,
          color: item.tab.color,
          linkUrl: item.tab.linkUrl,
          imgUrl: item.tab.imgUrl,
        }));

      console.log(savedTabsDatax);
      setSavedTabsData(savedTabsDatax);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle adding a new tab to the server
  const handleAddTabToServer = async (newLink) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/myTabRoutes`,
        newLink
      );
      const savedData = response.data;
      console.log(savedData);
      fetchSavedTabsData();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle adding a new link
  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, size, color, linkUrl, imgUrl } = e.target.elements;

    if (
      name.value &&
      size.value &&
      color.value &&
      linkUrl.value &&
      imgUrl.value
    ) {
      const newLink = {
        name: name.value,
        size: size.value,
        color: color.value,
        linkUrl: linkUrl.value,
        imgUrl: imgUrl.value,
      };

      setLinks((prevLinks) => [...prevLinks, newLink]);

      handleAddTabToServer(newLink);
    }

    onClose();
  };

  console.log("protabs reached");

  // Rendered JSX elements
  return (
    <ChakraProvider theme={theme}>
      <Header onOpen={onOpen} />
      <EditModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} />
      <TabGridContainer links={links} savedTabsData={savedTabsData} />
    </ChakraProvider>
  );
}

export default Home;
