import React, { useState } from "react";
import './schedule.css';
import { Button, AspectRatio, GridItem, Collapse } from "@chakra-ui/react";

function Tab4Schedule({ allTabs, colSpan, rowSpan }) { // Added colSpan and rowSpan props here
  const [expanded, setExpanded] = useState(false); // Track the expansion state

  const buttonStyle = {
    backgroundImage: `url('https://www.iconarchive.com/download/i103365/paomedia/small-n-flat/calendar.1024.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: 0,
    gridColumn: "auto",
    gridRow: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease-in-out", // Add transition CSS property
  };

  const handleUpperButtonClick = () => {
    setExpanded(!expanded); // Toggle the expansion state
  };

  // Use the colSpan and rowSpan props directly from the parameters
  const gridItemStyle = {
    colSpan: expanded ? 2 : colSpan, // Update width dynamically based on expanded state
    rowSpan: expanded ? 2 : rowSpan, // Update height dynamically based on expanded state
    transition: "all 1.9s ease-in-out", // Add transition CSS property
  };
  
  return (
    <GridItem
      width="100%"
      height="100%"
      boxSizing="border-box"
      id="modal-tab-container"
      colSpan={gridItemStyle.colSpan}
      rowSpan={gridItemStyle.rowSpan}
      transition={gridItemStyle.transition}
      borderRadius='15%'
    >
      <AspectRatio ratio={1}>
        <Collapse startingHeight="20" in={expanded}>
          <Button
            target="_blank"
            borderRadius='15%'
            rel="noopener noreferrer"
            backgroundColor={allTabs.color}
            style={buttonStyle}
            onClick={handleUpperButtonClick}
          >
            <section
              id="tab-title-section-schedule"
              
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
          </Button>
        </Collapse>
      </AspectRatio>
    </GridItem>
  );
}

export default Tab4Schedule;
