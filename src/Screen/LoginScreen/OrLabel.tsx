import React from "react";

function OrLabel() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "10%",
          height: "0.2px",
          background: "gray",
          opacity: "0.5",
          margin: "0 10px",
        }}
      />
      or
      <div
        style={{
          width: "10%",
          height: "0.2px",
          background: "gray",
          opacity: "0.5",
          margin: "0 10px",
        }}
      />
    </div>
  );
}

export default OrLabel;
