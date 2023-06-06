import {
  ChakraProvider,
  useDisclosure,
  extendTheme,
  Grid,
  GridItem,
  useColorModeValue,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import AddTabFormsModal from "../../components/modals/AddTabFormsModal";
import { useState, useEffect } from "react";

import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
import axios from "axios";
import AddTabModalButton from "../../components/buttons/AddTabModalButton";
import OpenSettingsButton from "../../components/buttons/OpenSettingsButton";
import OpenSettingsModal from "../../components/modals/OpenSettingsModal";

function Home() {
  const { onClose } = useDisclosure();
  const addTabModalDisclosure = useDisclosure();
  const settingsModalDisclosure = useDisclosure();
  const [savedTabsData, setSavedTabsData] = useState([]);
  const [savedSettingsData, setSavedSettingsData] = useState([]);

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

  useEffect(() => {
    fetchSavedTabsData();
    fetchSavedSettings();
  }, []);

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

      setSavedSettingsData(savedSettings);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, size, color, linkUrl, imgUrl } = e.target.elements;

    if (name.value && size.value && color.value && linkUrl.value && imgUrl.value) {
      const newLink = {
        name: name.value,
        size: size.value,
        color: color.value,
        linkUrl: linkUrl.value,
        imgUrl: imgUrl.value,
      };

      handleAddTabToServer(newLink);
    }

    onClose();
  };

  const handleChangeSettings = (e) => {
    e.preventDefault();
    const { name, color } = e.target.elements;

    if (name.value && color.value) {
      const newSetting = {
        name: name.value,
        color: color.value,
      };

      saveSettingsChangesToServer(newSetting);
    }

    onClose();
  };

  const bg = useColorModeValue("gray.50", "gray.700");
  const color = useColorModeValue("gray.700", "gray.50");

  const addButtonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <ChakraProvider theme={theme}>
      <header id="header">
        <Grid
          templateColumns="repeat(1, 1fr)"
          templateRows={{ base: "repeat(2, 1fr)", md: "1fr" }}
          gap={2}
          zIndex={1}
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
              buttonSize={addButtonSize}
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

      <Box height="calc(100vh - 10vh)" overflow="hidden">
        <TabGridContainer
          savedTabsData={savedTabsData}
          savedSettingsData={savedSettingsData}
        />
      </Box>
    </ChakraProvider>
  );
}

export default Home;
