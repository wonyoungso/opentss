import { Report } from "@mui/icons-material";
import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';

const ReportDataField = (props) => {

  const { company } = props;

  const dataCollectionList = company.data_collection.split(",");

  return (
    <>
     <div className="text-sm">Data Type</div>

      <div className="lg:col-span-2 text-3xl">
        { company.name } collects <></>
        <span className="font-bold">
          {
            _.map(dataCollectionList, (field, idx) => {
              return (
                <Fragment key={field}>
                  {field}
                  {
                    idx < (dataCollectionList.length - 1) ?
                    <>, </>
                    :
                    <>.</>
                  }
                  {
                    idx === dataCollectionList.length - 2 ?
                    <>and </>
                    : null
                  }
                  
                </Fragment>
              );
            })
          }
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