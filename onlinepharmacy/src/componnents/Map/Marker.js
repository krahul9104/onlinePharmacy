import React from "react";
const Marker = (props) => (
    <div
      style={{
        color: "white",
        background: "#c1a6e0",
        padding: "10px 10px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div>{props.name}</div>
      <div>{props.price + " RS"}</div>
    </div>
  );

  export default Marker;