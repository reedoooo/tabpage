import React from "react";
import { Button, AspectRatio, GridItem, useDisclosure } from "@chakra-ui/react";
import EditSpecTabModal from "../modals/EditSpecTabModal";

function Tab({ link }) {
  const buttonStyle = {
    backgroundImage: `url(${link.imgUrl})`,
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
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleUpdateTab = async (newLink) => {
  //   const optionsForPost = {
  //     method: "POST",
  //     url: `${process.env.REACT_APP_SERVER}/api/myTabRoutes`,
  //     data: newLink,
  //   };
  //   try {
  //     const response = await axios(optionsForPost);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleEditLink = (e) => {
    e.preventDefault();
    const { name, size, color, url, url2 } = e.target.elements;

    // link.index = index.value;
    link.name = name.value;
    link.size = size.value;
    link.color = color.value;
    link.linkUrl = url.value;
    link.imgUrl = url2.value;

    onClose();
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
          <section
            id="edit-specific-tab-button-section"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <Button id="edit-specific-tab-button" onClick={onOpen} />
            <EditSpecTabModal
              link={link}
              size={link.size}
              // index={link.index}
              isOpen={isOpen}
              onClose={onClose}
              onSubmit={handleEditLink}
            />
          </section>
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
