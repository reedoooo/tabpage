import React, { useContext } from 'react';
import { ChakraProvider, useDisclosure, extendTheme } from '@chakra-ui/react';
import AddTabFormsModal from '../../components/modals/AddTabFormsModal';
import TabGridContainer from '../../containers/tabGridContainer/TabGridContainer';
import OpenSettingsModal from '../../components/modals/OpenSettingsModal';
import Header from '../../containers/header/Header';
import { TabsContext } from '../../context/Tabs/tabsContext';

function Home() {
  const { onClose } = useDisclosure();
  const addTabModalDisclosure = useDisclosure();
  const settingsModalDisclosure = useDisclosure();

  // Use the context
  const {
    savedTabsData,
    savedSettingsData,
    handleAddTabToServer,
    saveSettingsChangesToServer,
  } = useContext(TabsContext);

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
