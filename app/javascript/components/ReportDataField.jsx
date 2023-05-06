import { Report } from "@mui/icons-material";
import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import EvictionRecordsCard from "./EvictionRecordsCard";
import CriminalRecordsCard from "./CriminalRecordsCard";

const ReportDataField = (props) => {

  const { company } = props;

  let dataCollectionList = null;

  if (!(_.isNull(company.data_collection))){
    dataCollectionList = company.data_collection.split(",");
  }

  const renderEmpty = () => {
    return (
      <div className="lg:grid lg:grid-cols-6 lg:gap-x-5 lg:gap-y-2">

        <div className="text-sm">Data Type</div>
        <div className="lg:col-span-2 text-sm">
          No available data.
        </div>
      </div>
    )
  }
  
  const renderContent = () => {
    return (
      
      <div className="lg:grid lg:grid-cols-6 lg:gap-x-5 lg:gap-y-2">
        <div className="text-sm">Data Type</div>
          <div className="lg:col-span-2">
            <span className="text-3xl">{ company.name } collects</span><>&nbsp;&nbsp;</>
            <span className="text-3xl font-bold">
              {
                _.map(dataCollectionList, (field, idx) => {
                  return (
                    <span key={field} className="text-3xl">
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
                      
                    </span>
                  );
                })
              }

            </span>
            <div className="text-right text-sm mt-5">
              {
                company.eviction_data_fields | company.criminal_data_fields ?
                <div className="bg-bright-blue rounded-md p-3" style={{maxWidth: 220}}>
                  <div className="flex flex-row-reverse items-center">
                    <div className="bg-yellow px-1 py-0.25 mx-1">
                      A
                    </div>
                    <div className="mx-1">
                      Critical Data Field 
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-center">
                    <div className="text-gray px-1 py-0.25 mx-1">
                      A
                    </div>
                    <div className="mx-1">
                      Missing Data Field
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-center">
                    <div className="bg-yellow text-gray relative px-1 py-0.25 mx-1">
                      A
                      <div className="w-full left-0 border-b-2 border-b-red absolute" style={{top: "calc(50% - 1px)"}}></div>
                    </div>
                    <div className="mx-1">
                    Missing Critical Data Field 
                    </div>
                  </div>
                </div> : null
              }
            </div>

          </div>

          <div className="text-sm">
            {
              company.eviction_data_fields ? 
              <EvictionRecordsCard name={company.name} fields={company.eviction_data_fields} /> :
              <>No data available for eviction data fields.</>
            }
          </div>


          <div className="text-sm">
            {
              company.criminal_data_fields ? 
            <CriminalRecordsCard name={company.name} fields={company.criminal_data_fields} /> :
              <>No data available for criminal data fields.</>
            }
          </div>

          <div>

          </div>
          <div className="lg:col-span-6 pb-10">

          </div>
        
        </div>
    ) 
  }

  return (
    <>
      {
        _.isNull(company.data_collection) ?
        renderEmpty() :
        renderContent()
      }
    </>
  )
};

export default ReportDataField;