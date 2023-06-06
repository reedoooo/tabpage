import React from "react";
import { Button, AspectRatio, GridItem, useMediaQuery } from "@chakra-ui/react";
import EditTabModalButton from "../buttons/EditTabModalButton";

function Tab({ allTabs, tab, onOpenModal, onClose }) {
  const buttonStyle = {
    backgroundImage: `url(${tab.imgUrl})`,
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

  const [isLargerThanMd] = useMediaQuery("(min-width: 80em)", "(min-height: 80em)");

  const gridItemStyle = isLargerThanMd
    ? {
        width: "100%",
        height: "100%",
        flexBasis: "100%",
      }
    : {
        width: "100%",
        height: "50%",
        flexBasis: "auto",
      };

  return (
    <GridItem
      width="100%"
      height="100%"
      boxSizing="border-box"
      style={{ flexGrow: 1, flexShrink: 1, ...gridItemStyle }}
      id="tab-container"
    >
      <AspectRatio ratio={1}>
        <Button
          as="a"
          href={tab.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          backgroundColor={tab.color}
          style={buttonStyle}
          onClick={onOpenModal}
        >
          <EditTabModalButton
            allTabs={allTabs}
            onOpen={onOpenModal}
            onClose={onClose}
            tab={tab}
          />
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
              <h2 id="button-content">{tab.name}</h2>
            </div>
          </section>
        </Button>
      </AspectRatio>
    </GridItem>
  );
}

export default Tab;
