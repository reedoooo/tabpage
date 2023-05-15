import React, { useCallback } from "react";
import { Button, AspectRatio, GridItem } from "@chakra-ui/react";
import EditTabModalButton from "../buttons/EditTabModalButton";

function Tab({
  tabIndex,
  allTabs,
  selectedTab,
  isOpen,
  onOpen,
  tabId,
  onClose,
  handleButtonClick,
}) {
  const handleClick = useCallback(
    () => handleButtonClick(tabIndex),
    [handleButtonClick, tabIndex]
  );

  // Check if selectedTab is defined
  if (!selectedTab) {
    // If not, you can return a default UI or null
    return null; // Or some default UI
  }

  const buttonStyle = {
    backgroundImage: `url(${selectedTab.imgUrl})`,
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

  return (
    <GridItem width="100%" height="100%" boxSizing="border-box">
      <AspectRatio ratio={1}>
        <Button
          as="a"
          href={selectedTab.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          backgroundColor={selectedTab.color}
          style={buttonStyle}
        >
          <EditTabModalButton
            allTabs={allTabs}
            tabId={tabId}
            onClick={handleClick}
            isOpen={isOpen}
            selectedTab={selectedTab} // pass the current tab data
            onOpen={onOpen}
            onClose={onClose}
            tabIndex={tabIndex}
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
              <h2 id="button-content">{selectedTab.name}</h2>
            </div>
          </section>
        </Button>
      </AspectRatio>
    </GridItem>
  );
}

export default Tab;
