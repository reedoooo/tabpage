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

  const handleEditLink = (e) => {
    e.preventDefault();
    const { name, color, url, url2 } = e.target.elements;

    link.name = name.value;
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

// import React, { useState } from "react";
// import { Button, AspectRatio, GridItem, useDisclosure } from "@chakra-ui/react";
// import EditSpecTabModal from "../modals/EditSpecTabModal";

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
//   const [editLink, setEditLink] = useState(link);

//   const handleEditLink = (e) => {
//     e.preventDefault();
//     const { name, color, url, url2 } = e.target.elements;

//     setEditLink({
//       ...editLink,
//       name: name.value,
//       color: color.value,
//       linkUrl: url.value,
//       imgUrl: url2.value,
//     });

//     onClose();
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
//               link={editLink}
//               isOpen={isOpen}
//               onClose={onClose}
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



// import React, { useState } from "react";
// import { Button, AspectRatio, GridItem, useDisclosure } from "@chakra-ui/react";
// import EditSpecTabModal from "../modals/EditSpecTabModal";

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
//   const [links, setLinks] = useState([link]);

//   const handleEditLink = (e) => {
//     e.preventDefault();
//     const { name, color, url, url2 } = e.target.elements;

//     // Check if the elements exist before accessing their values
//     if (name && color && url && url2) {
//       setLinks((prevLinks) =>
//         prevLinks.map((prevLink) =>
//           prevLink === link
//             ? {
//                 ...prevLink,
//                 name: name.value,
//                 color: color.value,
//                 linkUrl: url.value,
//                 imgUrl: url2.value,
//               }
//             : prevLink
//         )
//       );
//     }

//     onClose();
//   };

//   return (
//     <GridItem width="100%" height="100%" boxSizing="border-box">
//       <AspectRatio ratio={1}>
//         {links.map((link, index) => (
//           <Button
//             as="a"
//             key={index} link={link}
//             href={link.linkUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             backgroundColor={link.color}
//             style={buttonStyle}
//           >
//             <section
//               id="edit-specific-tab-button-section"
//               style={{ position: "absolute", top: 0, right: 0 }}
//             >
//               <Button id="edit-specific-tab-button" onClick={onOpen} />
//               <EditSpecTabModal
//                 id="edit-specific-tab-button"
//                 isOpen={isOpen}
//                 onClose={onClose}
//                 onSubmit={handleEditLink}
//               />
//             </section>
//             <section
//               id="tab-title-section"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "100%",
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 position: "absolute",
//                 bottom: 0,
//               }}
//             >
//               <div style={{ marginBottom: "10%", marginTop: "1%" }}>
//                 <h2 id="button-content">{link.name}</h2>
//               </div>
//             </section>
//           </Button>
//         ))}
//       </AspectRatio>
//     </GridItem>
//   );
// }

// export default Tab;

// import EditSpecTabModal from "../modals/EditSpecTabModal";
// import "./buttons.css";
// import { Button, AspectRatio, GridItem } from "@chakra-ui/react";

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
//     // position: "relative",
//   };

  
//   return (
//     <GridItem width="100%" height="100%" boxSizing="border-box">
//       <AspectRatio ratio={1}>
//         {/* <Button
//           as="a"
//           href={link.linkUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           backgroundColor={link.color}
//           backgroundImage={`url(${link.imgUrl})`}
//           padding={0}
//           gridColumn="auto"
//           gridRow="auto"
//           width="100%"
//           height="100%"
//           // display={'flex'}
//           flexGrow="1"
//           alignItems={"center"}
//           justifyContent={"center"}
//         > */}
//         <Button
//           as="a"
//           href={link.linkUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           backgroundColor={link.color}
//           style={buttonStyle} // Apply the buttonStyle directly
//         >
//           <section id="edit-specific-tab-button-section" style={{ position: 'absolute', top: 0, right: 0 }} >
//             <Button id="edit-specific-tab-button" />
//             {/* <EditSpecTabModal id="edit-specific-tab-button" isOpen={isOpen} onClose={onClose} onSubmit={handleAddLink} /> */}
//           </section>
//           <section
//             id="tab-title-section"
//             style={{ display: "flex", alignContent: 'center', justifyContent: "center", width: "100%", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", bottom: 0 }}
//           >
//             <div style={{ marginBottom: "10%", marginTop: '1%' }}>
//               <h2 id="button-content">{link.name}</h2>
//             </div>
//           </section>
//         </Button>
//       </AspectRatio>
//     </GridItem>
//   );
// }

// export default Tab;
