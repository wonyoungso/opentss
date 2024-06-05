import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import { store } from "../providers/TSSProvider";

import accepted_icon from "../assets/accepted_icon.svg";
import denied_icon from "../assets/denied_icon.svg";

function numberToCurrency(number, options = {}) {
  // Set default options

  const defaultOptions = {
    unit: "$",
    precision: 2,
    separator: ".",
    delimiter: ","
  };
  
  let formattedNumber;

  try {
    // Override default options with user-provided options
    const opts = { ...defaultOptions, ...options };

    // Round the number to the specified precision
    const roundedNumber = number.toFixed(opts.precision);

    // Split the number into integer and fractional parts
    const parts = roundedNumber.split(".");

    // Add the delimiter to the integer part
    const integerPartWithDelimiter = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, opts.delimiter);

    // Combine the integer part with the fractional part and the unit
    formattedNumber = opts.unit + integerPartWithDelimiter;

    // Only add the fractional part if the precision is greater than 0
    if (opts.precision > 0) {
        formattedNumber += opts.separator + parts[1];
    }
  } catch(err){

    formattedNumber = "N/A"

  }



  return formattedNumber;
}

const ApplicantTooltip = (props) => {
  const { criteria } = useContext(store);
  const popupWidth = 480; // Set the pop-up width
  const popupHeight = 150; // Set an arbitrary height or adjust as necessary

  function getCriminalRecordsYou(){
    if ( _.isNull(criteria.criminal_history_been_arrested) &&
         _.isNull(criteria.criminal_history_charged_misdemeanor) &&
         _.isNull(criteria.criminal_history_charged_felony) &&
         _.isNull(criteria.criminal_history_convicted_misdemeanor) &&
         _.isNull(criteria.criminal_history_convicted_felony)
       ) {
      return "N/A";
    } else {
      if (criteria.criminal_history_been_arrested === "yes") {
        return "Arrested";
      } else if (criteria.criminal_history_charged_misdemeanor === "yes") {
        return "Charged Misdemeanor";
      } else if (criteria.criminal_history_charged_felony === "yes") {
        return "Charged Felony";
      } else if (criteria.criminal_history_convicted_misdemeanor === "yes") {
        return "Convicted Misdemeanor";
      } else if (criteria.criminal_history_convicted_felony === "yes") {
        return "Convicted Felony";
      } 
    }
  }

  return (
    <div className="flex justify-center">
      <div className=" bg-white-bg pt-2 pb-5 border-gray border p-2" style={{width: popupWidth}}>
        <div className="text-sm font-bold pb-2">
          Summary of you
        </div>

    
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b-dark-blue-bg border-b">
              <th className="text-xs text-left pt-2 pb-2">
                Criterion
              </th>
              <th className="text-xs text-right pt-2 pb-2">
                You
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Miminum Credit Score
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                {criteria.credit_score}
              </td>
            </tr>
            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Rent-to-income Ratio (RTI)
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                Vary by property
              </td>
            </tr>
            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Rent-to-net-income Ratio (RTNI)
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                Vary by property
              </td>
            </tr>
            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Debt-to-income Ratio (DTI)
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                {`${((criteria.monthly_debt_service) / (criteria.monthly_income) * 100).toFixed(1)}%`}
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                No Rental Debt
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                {`${criteria.rental_debt > 0 ? "Has rental debt" : "Don't have rental debt"}`}
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Allowed Rental Debt
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {criteria.rental_debt ? `${numberToCurrency(criteria.rental_debt, {precision: 0})}` : "N/A"}
              </td>
            </tr>
            
            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                No Collections
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                {`${criteria.collections > 0 ? "Has collections" : "Don't have collections"}`}
              </td>
            </tr>
            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Allowed Collections Amount
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                {criteria.collections ? `${numberToCurrency(criteria.collections, {precision: 0})}` : "N/A"}
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                No Other Debts
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {`${criteria.other_debts > 0 ? "Has debts" : "Don't have debts"}`}
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Allowed Debt Amount
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {criteria.other_debts ? `${numberToCurrency(criteria.other_debts, {precision: 0})}` : "N/A"}
              </td>
            </tr>
            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                No Bankruptcy
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {`${criteria.bankruptcy > 0 ? "Filed bankruptcy" : "Don't file bankruptcy"}`}
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Allowed Bankruptcy Year
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {criteria.bankruptcy > 0 ? criteria.bankruptcy : "N/A"}
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                No Eviction
              </td>

              <td className={`text-xs text-right pt-2 pb-2`}>
                { 
                  criteria.eviction_history_had_judgments ? 
                    "Has Eviction Judgment" : 
                    (
                      criteria.eviction_history_had_eviction_case_dismissed ? 
                      "Has Eviction Filing" : "N/A"
                    )
                }
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Allowed Eviction Year
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {criteria.most_recent_eviction > 0 ? criteria.most_recent_eviction : "N/A"}
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2 `}>
                No Criminal Records
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {  getCriminalRecordsYou() }
              </td>
            </tr>

            <tr className="border-b-gray-border border-b">
              <td className={`text-xs text-left pt-2 pb-2`}>
                Allowed Criminal Record Year
              </td>


              <td className={`text-xs text-right pt-2 pb-2`}>
                {criteria.most_recent_criminal > 0 ? criteria.most_recent_criminal : "N/A"}
              </td>
            </tr>

          </tbody>
        </table>
        </div>
    </div>
  )
};

export default ApplicantTooltip;