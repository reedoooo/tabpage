import {
  ChakraProvider,
  useDisclosure,
  extendTheme,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import AddTabFormsModal from "../../components/modals/AddTabFormsModal";
import { useState, useEffect } from "react";
// import Header from "../../containers/header/Header";
import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
import axios from "axios";
import AddTabModalButton from "../../components/buttons/AddTabModalButton";
import OpenSettingsButton from "../../components/buttons/OpenSettingsButton";
import OpenSettingsModal from "../../components/modals/OpenSettingsModal";
// import OpenSettingsModal from "../../components/modals/OpenSettingsModal";

function Home() {
  // Creating state variables and hooks
  const { onClose } = useDisclosure(); // useDisclosure hook from Chakra UI to handle modal visibility
  const addTabModalDisclosure = useDisclosure();
  const settingsModalDisclosure = useDisclosure();
  const [savedTabsData, setSavedTabsData] = useState([]); // State variable to store saved tabs data
  const [savedSettingsData, setSavedSettingsData] = useState([]); // State variable to store saved settings data
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

        .filter((item) => item)
        .map((item) => ({
          name: item.tab.name,
          size: item.tab.size,
          color: item.tab.color,
          linkUrl: item.tab.linkUrl,
          imgUrl: item.tab.imgUrl,
          id: item._id,
        }));

      // console.log(savedTabsDatax);
      setSavedTabsData(savedTabsDatax);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedSettings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/mySettingsRoutes`
      );

      const savedSettings = response.data

        .filter((item) => item)
        .map((item) => ({
          name: item.tab.name,
          color: item.tab.color,
          id: item._id,
        }));

      // console.log(savedTabsDatax);
      setSavedSettingsData(savedSettings);
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

  const saveSettingsChangesToServer = async (newSetting) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/mySettingsRoutes`,
        newSetting
      );
      const savedSettings = response.data;
      console.log(savedSettings);
      fetchSavedSettings();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle adding a new link
  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, size, color, linkUrl, imgUrl } = e.target.elements;

    if (
      // id.value &&
      name.value &&
      size.value &&
      color.value &&
      linkUrl.value &&
      imgUrl.value
    ) {
      const newLink = {
        // id: id.value,
        name: name.value,
        size: size.value,
        color: color.value,
        linkUrl: linkUrl.value,
        imgUrl: imgUrl.value,
      };

      // setLinks((prevLinks) => [...prevLinks, newLink]);
      handleAddTabToServer(newLink);
    }

    onClose();
  };

  // Function to handle adding a new link
  const handleChangeSettings = (e) => {
    e.preventDefault();
    const { name, color } = e.target.elements;

    if (name.value && color.value) {
      const newSetting = {
        name: name.value,
        color: color.value,
      };

      // setLinks((prevLinks) => [...prevLinks, newLink]);
      saveSettingsChangesToServer(newSetting);
    }

    onClose();
  };
  const bg = useColorModeValue("gray.50", "gray.700");
  const color = useColorModeValue("gray.700", "gray.50");

  // console.log("protabs reached");
  console.log(savedTabsData);
  // Rendered JSX elements
  return (
    <ChakraProvider theme={theme}>
      {/* <Header onOpen={onOpen} isOpen={isOpen} /> */}
      <header
        id="header"
        style={{
          display: "block",
        }}
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          templateRows={"repeat(2, 1fr)"}
          gap={2}
          minHeight="10vh"
          minWidth="100vw"
          padding={4}
          bg={bg}
          color={color}
        >
          <GridItem colSpan={1} rowSpan={1} colStart={8} rowStart={1}>
            <AddTabModalButton
              isOpen={addTabModalDisclosure.isOpen}
              onOpen={addTabModalDisclosure.onOpen}
            />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} colStart={8} rowStart={2}>
            <OpenSettingsButton
              isOpen={settingsModalDisclosure.isOpen}
              onOpen={settingsModalDisclosure.onOpen}
            />
          </GridItem>
        </Grid>
      </header>
      <AddTabFormsModal
        isOpen={addTabModalDisclosure.isOpen}
        onClose={addTabModalDisclosure.onClose}
        onSubmit={handleAddLink}
      />

      <OpenSettingsModal
        isOpen={settingsModalDisclosure.isOpen}
        onClose={settingsModalDisclosure.onClose}
        onSubmit={handleChangeSettings}
      />
      <TabGridContainer
        savedTabsData={savedTabsData}
        savedSettingsData={savedSettingsData}
      />
    </ChakraProvider>
  );
}

export default Home;
