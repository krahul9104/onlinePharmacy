import React from "react";

const Marker =(props) =>{
  return (
 <div
    style={{
      color: "white",
      background:props.userLoc? '#29b6f6' : (props.hoverkey === props.store_id)? '#ffa726':"#c1a6e0",
      padding: "10px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    <div nowrap><b>{props.name}</b></div>
    <div>{props.userLoc ?'' : <div>Rs. {props.price}</div>}</div>
    
  </div>)

}

  export default Marker;