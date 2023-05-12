import { Box, Grid } from "@chakra-ui/react";
import Tab from "../../components/buttons/Tab";

function TabGridContainer({ links }) {
  return (
    <Box
      width="100vw"
      height="100vh"
      padding={4}
    >
      <Grid
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(5, 1fr)"
        gap={4}
        minHeight="100%"
        minWidth="100%"
      >
        {links.map((link, index) => (
          <Tab key={index} link={link} />
        ))}
      </Grid>
    </Box>
  );
}

export default TabGridContainer;
