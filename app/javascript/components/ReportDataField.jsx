import { Report } from "@mui/icons-material";
import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";

const ReportDataField = (props) => {

  const { company } = props;
  return (
    <>
     <div className="text-sm">Data Type</div>

      <div className="lg:col-span-2 text-3xl">
        { company.name } collects <></>
        <span className="font-bold">
          Credit Score,
          Credit History,
          Income verification,
          Employment History,
          and Eviction History.
        </span>

      </div>

      <div className="">
        Transunion eviction record card
      </div>


      <div className="">
        Transunion criminal record card
      </div>

      <div>

      </div>
      <div className="lg:col-span-6 pb-10">
        
      </div>
    </>
  )
};

export default ReportDataField;