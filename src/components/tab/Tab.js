import React from "react";
import { Button, AspectRatio, GridItem } from "@chakra-ui/react";
import EditButton from "../buttons/EditTabModalButton";

function Tab({ link }) {
  const buttonStyle = {
    backgroundImage: `url(${link.imgUrl})`,
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

  const handleEditLink = (e) => {
    e.preventDefault();
    const { name, size, color, linkUrl, imgUrl } = e.target.elements;

    // link.index = index.value;
    link.name = name.value;
    link.size = size.value;
    link.color = color.value;
    link.linkUrl = linkUrl.value;
    link.imgUrl = imgUrl.value;
  };

  return (
    <GridItem width="100%" height="100%" boxSizing="border-box">
      <AspectRatio ratio={1}>
        <Button
          as="a"
          href={link.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          backgroundColor={link.color}
          style={buttonStyle}
        >
          <EditButton link={link} handleEditLink={handleEditLink} />
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
              <h2 id="button-content">{link.name}</h2>
            </div>
          </section>
        </Button>
      </AspectRatio>
    </GridItem>
  );
}

export default Tab;
