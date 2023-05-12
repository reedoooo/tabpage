// import { Box, Grid } from "@chakra-ui/react";
// import Tab from "../../components/buttons/Tab";
// import React from "react";

// const TabGridContainer = React.memo(({ links, savedTabsData }) => {
//   return (
//     <Box width="100vw" height="100vh" padding={4}>
//       <Grid
//         templateColumns="repeat(6, 1fr)"
//         templateRows="repeat(5, 1fr)"
//         gap={4}
//         minHeight="100%"
//         minWidth="100%"
//       >
//         {savedTabsData.map((savedTabData, index) => (
//           <Tab key={index} link={savedTabData} />
//         ))}
//         {links.map((link, index) => (
//           <Tab key={index + savedTabsData.length} link={link} />
//         ))}
//       </Grid>
//     </Box>
//   );
// });

// export default TabGridContainer;

import { Box, Grid } from "@chakra-ui/react";
import Tab from "../../components/buttons/Tab";

function TabGridContainer({ links, savedTabsData }) {
  return (
    <Box width="100vw" height="100vh" padding={4}>
      <Grid
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(5, 1fr)"
        gap={4}
        minHeight="100%"
        minWidth="100%"
      >
        {savedTabsData.map((savedTabData, index) => (
          <Tab key={index} link={savedTabData} />
        ))}
        {links.map((link, index) => (
          <Tab key={index + savedTabsData.length} link={link} />
        ))}
      </Grid>
    </Box>
  );
}

export default TabGridContainer;

// import { Box, Grid } from "@chakra-ui/react";
// import Tab from "../../components/buttons/Tab";

// function TabGridContainer({ links, savedTabsData }) {
//   return (
//     <Box width="100vw" height="100vh" padding={4}>
//       <Grid
//         templateColumns="repeat(6, 1fr)"
//         templateRows="repeat(5, 1fr)"
//         gap={4}
//         minHeight="100%"
//         minWidth="100%"
//       >
//         {/* {links.map((link, index) => (
//           <Tab
//             key={index}
//             link={link}
//             savedTabData={savedTabsData.find((tab) => tab._id === link._id)}
//           />
//         ))} */}
//         {/* {savedTabsData.map((savedTabData, index) => (
//           <Tab key={index} savedTabData={savedTabData} />
//         ))} */}

//         {links.map((link, index) => (
//           <Tab key={index} link={link} />
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default TabGridContainer;

// import { Box, Grid } from "@chakra-ui/react";
// import Tab from "../../components/buttons/Tab";

// function TabGridContainer({ links, savedTabsData }) {
//   return (
//     <Box width="100vw" height="100vh" padding={4}>
//       <Grid
//         templateColumns="repeat(6, 1fr)"
//         templateRows="repeat(5, 1fr)"
//         gap={4}
//         minHeight="100%"
//         minWidth="100%"
//       >
//         {links.map((link, index) => (
//           <Tab
//             key={index}
//             link={link}
//             savedTabData={savedTabsData.find(
//               (savedTab) => savedTab._id === link._id
//             )}
//           />
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default TabGridContainer;

// import { Box, Grid } from "@chakra-ui/react";
// import Tab from "../../components/buttons/Tab";

// function TabGridContainer({ links, savedTabsData }) {
//   return (
//     <Box width="100vw" height="100vh" padding={4}>
//       <Grid
//         templateColumns="repeat(6, 1fr)"
//         templateRows="repeat(5, 1fr)"
//         gap={4}
//         minHeight="100%"
//         minWidth="100%"
//       >
//         {links.map((link, index) => (
//           <Tab key={index} link={link} savedTabData={savedTabsData[index]} />
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default TabGridContainer;
