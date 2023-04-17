import { Report } from "@mui/icons-material";
import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import { evictionDataFields } from "../providers/data_fields";


const EvictionRecordsCard = (props) => {
  const bgColor = props.mode === "dark" ? "very-dark-blue" : "bright-blue";
  const fields = props.sample ? evictionDataFields : props.fields;

  return (
    <div className={`bg-${bgColor} rounded-md p-3 text-sm`} style={{maxWidth: 220}}>
      <h5 className="px-0.5 font-bold pb-2 leading-4">
        {
          props.sample ? 
          <>Data Fields of Eviction Records</> : 
          <>{ props.name } <br/>
            Eviction Data Fields</>
        }
        
      </h5>
      {
        _.map(fields, (props, key) => {
          return (
            <div key={key} className={`relative px-0.5 my-0.5 ${props.critical ? "bg-yellow" : ""} ${props.value ? "" : "text-gray"}`}>
              {key}
              {
                props.critical && !props.value ?
                <div className="w-full left-0 border-b-2 border-b-red absolute" style={{top: "calc(50% - 1px)"}}></div> : null
              }
            </div>
          )
        })
      }
    </div>
  )
};

export default EvictionRecordsCard;