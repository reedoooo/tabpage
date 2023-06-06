import React from "react";

function TabTitleSection({ expanded, handleDoubleClick }) {
  return (
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
      onDoubleClick={handleDoubleClick}
    >
      <div
        style={{
          marginBottom: "10%",
          marginTop: "1%",
        }}
      >
        <h2 id="button-content">{"Calendar"}</h2>
      </div>
    </section>
  );
}

export default TabTitleSection;
