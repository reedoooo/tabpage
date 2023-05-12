// import React from "react";
// import { Button, AspectRatio, GridItem, useDisclosure } from "@chakra-ui/react";
// import EditSpecTabModal from "../modals/EditSpecTabModal";
// import axios from "axios";

// function Tab({ link }) {
//   const buttonStyle = {
//     backgroundImage: `url(${link.imgUrl})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     padding: 0,
//     gridColumn: "auto",
//     gridRow: "auto",
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleUpdateTab = async (newLink) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/myTabRoutes/${link._id}`, newLink);
//       console.log(response.data);
//       // Perform any additional operations or update state if needed
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteTab = async () => {
//     try {
//       const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/myTabRoutes/${link._id}`);
//       console.log(response.data);
//       // Perform any additional operations or update state if needed
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditLink = (e) => {
//     e.preventDefault();
//     const { index, name, size, color, linkUrl, imgUrl } = e.target.elements;

//     const updatedLink = {
//       ...link,
//       index: index.value,
//       name: name.value,
//       size: size.value,
//       color: color.value,
//       linkUrl: linkUrl.value,
//       imgUrl: imgUrl.value,
//     };

//     handleUpdateTab(updatedLink);
//     onClose();
//   };

//   const handleDeleteLink = () => {
//     handleDeleteTab();
//     // Perform any additional operations or update state if needed
//   };

//   return (
//     <GridItem width="100%" height="100%" boxSizing="border-box">
//       <AspectRatio ratio={1}>
//         <Button
//           as="a"
//           href={link.linkUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           backgroundColor={link.color}
//           style={buttonStyle}
//         >
//           <section
//             id="edit-specific-tab-button-section"
//             style={{ position: "absolute", top: 0, right: 0 }}
//           >
//             <Button id="edit-specific-tab-button" onClick={onOpen} />
//             <EditSpecTabModal
//               link={link}
//               size={link.size}
//               index={link.index}
//               isOpen={isOpen}
//               onClose={onClose}
//               onDelete={handleDeleteLink}
//               onSubmit={handleEditLink}
//             />
//           </section>
//           <section
//             id="tab-title-section"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "100%",
//               backgroundColor: "rgba(0,0,0,0.5)",
//               position: "absolute",
//               bottom: 0,
//             }}
//           >
//             <div style={{ marginBottom: "10%", marginTop: "1%" }}>
//               <h2 id="button-content">{link.name}</h2>
//             </div>
//           </section>
//         </Button>
//       </AspectRatio>
//     </GridItem>
//   );
// }

// export default Tab;

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

    // const handleDeleteLink = async (itemId) => {
    //   const response = await fetch(`${process.env.REACT_APP_SERVER}/api/myTabRoutes/${itemId}`, {
    //     method: 'DELETE',
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // };

    // onClose();



  // const handleDeleteLink = ( itme.id) => {
  //   e.preventDefault();
  //   const { name, size, color, url, url2 } = e.target.elements;

  //   // link.index = index.value;
  //   link.name = name.value;
  //   link.size = size.value;
  //   link.color = color.value;
  //   link.linkUrl = url.value;
  //   link.imgUrl = url2.value;

  //   onClose();
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
              // onDelete={handleDeleteLink}
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
