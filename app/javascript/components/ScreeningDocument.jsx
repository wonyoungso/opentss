import * as React from "react";
import accepted_icon from "../assets/accepted_icon.svg";
import denied_icon from "../assets/denied_icon.svg";

const ScreeningDocument = (props) => {
  return (
    <div className="hover:opacity-70 transition-opacity cursor-pointer" onClick={(e) => { props.onDocClick(e, props.id) }}>
      {
        props.overall_accepted ? 
        <img src={accepted_icon} alt="accepted icon" /> : 
        <img src={denied_icon} alt="denied icon" />
      }
      
    </div>
  )
};

export default ScreeningDocument;