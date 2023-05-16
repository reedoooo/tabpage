import React, { useState } from "react";
import {
  Button,
  AspectRatio,
  GridItem,
  Container,
  //   useDisclosure,
} from "@chakra-ui/react";
// import AnimatedBoxComponent from "../weeklySchedule/AnimatedBoxComponent";

function Tab4Schedule({ allTabs }) {
  const buttonStyle = {
    backgroundImage: `url('https://www.iconarchive.com/download/i103365/paomedia/small-n-flat/calendar.1024.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "15px",
    padding: 0,
    gridColumn: "auto",
    gridRow: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <GridItem
      width="100%"
      height="100%"
      boxSizing="border-box"
      id="modal-tab-container"
    >
      <AspectRatio ratio={1}>
        <Container>
          <Button
            onClick={toggleOpen}
            w="100%"
            h="100%"
            style={buttonStyle}
          >
            {/* <AnimatedBoxComponent open={open} /> */}
          </Button>
          <section
            id="tab-title-section"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              bottom: 0,
            }}
          >
            <div style={{ marginBottom: "10%", marginTop: "1%" }}>
              <h2 id="button-content">{"ToDo App"}</h2>
            </div>
          </section>
        </Container>
      </AspectRatio>
    </GridItem>
  );
}

export default Tab4Schedule;
