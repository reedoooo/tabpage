import { ChakraProvider, useDisclosure, extendTheme } from "@chakra-ui/react";
import EditModal from "../../components/modals/EditModal";
import { useState, useEffect } from "react";
import Header from "../../containers/header/Header";
import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
import axios from "axios";

function ProTabs() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);
  const [savedTabsData, setSavedTabsData] = useState([]);

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
  }, []);

  const fetchSavedTabsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/myTabRoutes`);

      const savedTabsDatax = response.data
        .filter(item => item.tab)
        .map(item => ({
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

  const handleAddTabToServer = async (newLink) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/myTabRoutes`, newLink);
      const savedData = response.data;
      console.log(savedData);
      fetchSavedTabsData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, size, color, url, url2 } = e.target.elements;

    if (name.value && size.value && color.value && url.value && url2.value) {
      const newLink = {
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
      <TabGridContainer links={links} savedTabsData={savedTabsData} />

      <EditModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} />
    </ChakraProvider>
  );
}

export default ProTabs;

// import { ChakraProvider, useDisclosure, extendTheme } from "@chakra-ui/react";
// import EditModal from "../../components/modals/EditModal";
// import { useState, useEffect } from "react";
// import Header from "../../containers/header/Header";
// import TabGridContainer from "../../containers/tabGridContainer/TabGridContainer";
// import axios from "axios";

// function ProTabs() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [links, setLinks] = useState([]);
//   const [savedTabsData, setSavedTabsData] = useState([]);

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

//   useEffect(() => {
//     fetchSavedTabsData();
//   }, []);

//   const fetchSavedTabsData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/myTabRoutes`);

//       const savedTabsDatax = [];
//       for (let i = 0; i < response.data.length; i++) {
//         if (!response.data[i].tab) {
//           console.log('Unexpected structure for item at index', i, ':', response.data[i]);
//           continue;
//         }
//         savedTabsDatax.push({
//           name: response.data[i].tab.name,
//           size: response.data[i].tab.size,
//           color: response.data[i].tab.color,
//           linkUrl: response.data[i].tab.url,
//           imgUrl: response.data[i].tab.url2,
//         });
//       }
      
//       console.log(savedTabsDatax);
//       setSavedTabsData(savedTabsDatax); // Setting the savedTabsData state with the fetched data
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleAddTabToServer = async (newLink) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/myTabRoutes`, newLink);
//       const savedData = response.data; // Extract the saved data from the response
//       console.log(savedData); // Display the saved data
//       fetchSavedTabsData(); // Fetch the updated saved data
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddLink = (e) => {
//     e.preventDefault();
//     const { name, size, color, url, url2 } = e.target.elements;

//     if (name.value && size.value && color.value && url.value && url2.value) {
//       const newLink = {
//         name: name.value,
//         size: size.value,
//         color: color.value,
//         linkUrl: url.value,
//         imgUrl: url2.value,
//       };

//       setLinks((prevLinks) => [...prevLinks, newLink]);

//       handleAddTabToServer(newLink);
//     }

//     onClose();
//   };

//   console.log("protabs reached");

//   return (
//     <ChakraProvider theme={theme}>
//       <Header onOpen={onOpen} />
//       {/* <TabGridContainer links={links} savedTabsData={savedTabsData} savedTabData={savedTabsData[0]} /> */}
//       {/* <TabGridContainer links={links} savedTabsData={savedTabsData} savedTabData={savedTabsData[0]} /> */}
//       <TabGridContainer links={links} savedTabsData={savedTabsData} />

//       <EditModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} />
//     </ChakraProvider>
//   );
// }

// export default ProTabs;