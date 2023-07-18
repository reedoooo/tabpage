import { ChakraProvider, useDisclosure, extendTheme } from '@chakra-ui/react';
import AddTabFormsModal from '../../components/modals/AddTabFormsModal';
import { useState, useEffect } from 'react';

import TabGridContainer from '../../containers/tabGridContainer/TabGridContainer';
import axios from 'axios';
// import AddTabModalButton from "../../components/buttons/AddTabModalButton";
// import OpenSettingsButton from "../../components/buttons/OpenSettingsButton";
import OpenSettingsModal from '../../components/modals/OpenSettingsModal';
import Header from '../../containers/header/Header';

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
            minHeight: '320px',
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
        `${process.env.REACT_APP_SERVER}/api/tab`,
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
        `${process.env.REACT_APP_SERVER}/api/settings`,
      );
      console.log(response.data);

      const savedSettings = response.data
        .filter((item) => item)
        .map((item) => ({
          name: item.name,
          color: item.color,
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
        `${process.env.REACT_APP_SERVER}/api/tab`,
        newLink,
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
        `${process.env.REACT_APP_SERVER}/api/settings`,
        newSetting,
      );
      console.log(response.data);
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

  return (
    <ChakraProvider theme={theme}>
      <Header
        addTabModalDisclosure={addTabModalDisclosure}
        settingsModalDisclosure={settingsModalDisclosure}
      />

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
