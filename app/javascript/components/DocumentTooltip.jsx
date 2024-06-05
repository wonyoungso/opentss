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

const DocumentTooltip = (props) => {
  const { criteria } = useContext(store);
  const popupWidth = 480; // Set the pop-up width
  const popupHeight = 150; // Set an arbitrary height or adjust as necessary

  // Calculate the right and bottom bounds
  const rightBound = props.x + popupWidth;
  const bottomBound = props.y + popupHeight;

  // Adjust position if the pop-up overflows the window dimensions
  const adjustedX = rightBound > window.innerWidth + window.scrollX ? window.innerWidth + window.scrollX - popupWidth : props.x;
  const adjustedY = bottomBound > window.innerHeight + window.scrollY?  window.innerHeight + window.scrollY - popupHeight : props.y;

  const style = {
    top: `${adjustedY}px`,
    left: `${adjustedX}px`,
    zIndex: 999,
    width: popupWidth - 40
  };

  function getCriminalRecordsPolicy(){
    if ( props.criminal_no_arrest &&
         props.criminal_no_charge_misdeam &&
         props.criminal_no_charge_felony &&
         props.criminal_no_conviction_misdeam &&
         props.criminal_no_conviction_felony)  {
      return "N/A";
    } else {
      if (props.criminal_no_arrest) {
        return "No Arrest";
      } else if (props.criminal_no_charge_misdeam) {
        return "No Charged Misdemeanor";
      } else if (props.criminal_no_charge_felony) {
        return "No Charged Felony";
      } else if (props.criminal_no_conviction_misdeam) {
        return "No Convicted Misdemeanor";
      } else if (props.criminal_no_conviction_felony) {
        return "No Convicted Felony";
      } else {
        return "N/A"
      }
    }
  }

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
    <div className="absolute bg-white-bg pt-2 pb-2 border-gray border p-2" style={style}>
      <div className="flex justify-between items-center pb-2">
        <div className="flex gap-2 pb-2 items-center">
          <div className="text-xs font-bold leading-4">
            Criteria Document <br/>
            #{props.id}
          </div>
          <div>
            {
              props.overall_accepted ? 
              <img src={accepted_icon} alt="accepted icon" /> : 
              <img src={denied_icon} alt="denied icon" />
            }
            
          </div>
        </div>
        {
          props.property_addr_city === "N/A" && 
          props.property_addr_state === "N/A" ? 
          null :
          <div className="text-xs leading-4 text-right">
            Property in<br/>
            {props.property_addr_city}, {props.property_addr_state}
          </div>
        }
        
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-dark-blue-bg border-b">
            <th className="text-xs text-left pt-2 pb-2">
              Criterion
            </th>
            <th className="text-xs text-right pt-2 pb-2">
              Document
            </th>
            <th className="text-xs text-right pt-2 pb-2">
              You
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.minimum_credit_score_accepted ? "bg-accepted" : "bg-denied"}`}>
              Miminum Credit Score
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.minimum_credit_score_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.minimum_credit_score ? props.minimum_credit_score : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.minimum_credit_score_accepted ? "bg-accepted" : "bg-denied"}`}>
              {criteria.credit_score}
            </td>
          </tr>
          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.rti_accepted ? "bg-accepted" : "bg-denied"}`}>
              Rent-to-income Ratio (RTI)
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.rti_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.rent_to_income_ratio ? `${props.rent_to_income_ratio.toFixed(1)}%` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.rti_accepted ? "bg-accepted" : "bg-denied"}`}>
              {`${props.calculated_rti.toFixed(1)}%`}
            </td>
          </tr>
          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.rtni_accepted ? "bg-accepted" : "bg-denied"}`}>
              Rent-to-net-income Ratio (RTNI)
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.rtni_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.rent_to_netincome_ratio ? `${props.rent_to_netincome_ratio.toFixed(1)}%` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.rtni_accepted ? "bg-accepted" : "bg-denied"}`}>
              {`${props.calculated_rtni.toFixed(1)}%`}
            </td>
          </tr>
          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.dti_accepted ? "bg-accepted" : "bg-denied"}`}>
              Debt-to-income Ratio (DTI)
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.dti_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.debt_to_income_ratio ? `${props.debt_to_income_ratio.toFixed(1)}%` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.dti_accepted ? "bg-accepted" : "bg-denied"}`}>
              {`${props.calculated_dti.toFixed(1)}%`}
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.no_rental_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              No Rental Debt
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_rental_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.no_rental_debt ? `${props.no_rental_debt ? "Yes": "No"}` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_rental_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              {`${criteria.rental_debt > 0 ? "Has rental debt" : "Don't have rental debt"}`}
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.allowed_rental_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              Allowed Rental Debt
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.allowed_rental_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.allowable_amount_rental_debt ? `${numberToCurrency(props.allowable_amount_rental_debt, {precision: 0})}` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.allowed_rental_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              {criteria.rental_debt ? `${numberToCurrency(criteria.rental_debt, {precision: 0})}` : "N/A"}
            </td>
          </tr>
          
          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.no_open_collections_accepted ? "bg-accepted" : "bg-denied"}`}>
              No Collections
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_open_collections_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.no_open_collections ? `${props.no_open_collections ? "Yes": "No"}` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_open_collections_accepted ? "bg-accepted" : "bg-denied"}`}>
              {`${criteria.collections > 0 ? "Has collections" : "Don't have collections"}`}
            </td>
          </tr>
          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.allowable_amount_open_collections_accepted ? "bg-accepted" : "bg-denied"}`}>
              Allowed Collections Amount
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.allowable_amount_open_collections_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.allowable_amount_open_collections ? `${numberToCurrency(props.allowable_amount_open_collections, {precision: 0})}` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.allowable_amount_open_collections_accepted ? "bg-accepted" : "bg-denied"}`}>
              {criteria.collections ? `${numberToCurrency(criteria.collections, {precision: 0})}` : "N/A"}
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.no_other_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              No Other Debts
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_other_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.other_debts ? `${props.other_debts ? "Yes": "No"}` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_other_debt_accepted ? "bg-accepted" : "bg-denied"}`}>
              {`${criteria.other_debts > 0 ? "Has debts" : "Don't have debts"}`}
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.allowable_amount_other_debts_accepted ? "bg-accepted" : "bg-denied"}`}>
              Allowed Debt Amount
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.allowable_amount_other_debts_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.allowable_amount_other_debts ? `${numberToCurrency(props.allowable_amount_other_debts, {precision: 0})}` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.allowable_amount_other_debts_accepted ? "bg-accepted" : "bg-denied"}`}>
              {criteria.other_debts ? `${numberToCurrency(criteria.other_debts, {precision: 0})}` : "N/A"}
            </td>
          </tr>
          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.tenant_no_bankruptcy_accepted ? "bg-accepted" : "bg-denied"}`}>
              No Bankruptcy
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.tenant_no_bankruptcy_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.tenant_no_bankruptcy ? `${props.tenant_no_bankruptcy ? "Yes": "No"}` : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.tenant_no_bankruptcy_accepted ? "bg-accepted" : "bg-denied"}`}>
              {`${criteria.bankruptcy > 0 ? "Filed bankruptcy" : "Don't file bankruptcy"}`}
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.bankruptcy_allow_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              Allowed Bankruptcy Year
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.bankruptcy_allow_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              {props.bankruptcy_allow_years ? props.bankruptcy_allow_years : "N/A"}
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.bankruptcy_allow_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              {criteria.bankruptcy > 0 ? criteria.bankruptcy : "N/A"}
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.no_eviction_accepted ? "bg-accepted" : "bg-denied"}`}>
              No Eviction
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_eviction_accepted ? "bg-accepted" : "bg-denied"}`}>
              { 
                props.tenant_no_eviction ? 
                  "No Eviction" : 
                  (
                    props.tenant_no_eviction_judgment ? 
                    "No Eviction Judgment" : "N/A"
                  )
              }
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_eviction_accepted ? "bg-accepted" : "bg-denied"}`}>
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
            <td className={`text-xs text-left pt-2 pb-2 ${props.eviction_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              Allowed Eviction Year
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.eviction_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              { 
                props.tenant_can_eviction_years ? 
                  props.tenant_can_eviction_years : 
                  (
                    props.tenant_no_eviction_judgment ? 
                    props.tenant_can_eviction_judgment_years : "N/A"
                  )
              }
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.eviction_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              {criteria.most_recent_eviction > 0 ? criteria.most_recent_eviction : "N/A"}
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.no_criminal_accepted ? "bg-accepted" : "bg-denied"}`}>
              No Criminal Records
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_criminal_accepted ? "bg-accepted" : "bg-denied"}`}>
              { 
                getCriminalRecordsPolicy()
              }
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.no_criminal_accepted ? "bg-accepted" : "bg-denied"}`}>
              {  getCriminalRecordsYou() }
            </td>
          </tr>

          <tr className="border-b-gray-border border-b">
            <td className={`text-xs text-left pt-2 pb-2 ${props.criminal_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              Allowed Criminal Record Year
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.criminal_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              { 
                props.criminal_conviction_felony_year ? 
                  `Felony: ${props.criminal_conviction_felony_year}` : 
                  (
                    props.criminal_conviction_misdeam_year ? 
                    `Misdemeanor: ${props.criminal_conviction_misdeam_year}` : "N/A"
                  )
              }
            </td>

            <td className={`text-xs text-right pt-2 pb-2 ${props.criminal_years_accepted ? "bg-accepted" : "bg-denied"}`}>
              {criteria.most_recent_criminal > 0 ? criteria.most_recent_criminal : "N/A"}
            </td>
          </tr>

        </tbody>
      </table>
      <div className="flex gap-1 items-center pt-1">
        <div className="bg-accepted" style={{width: 14, height:14}}></div>
        <div className="text-xs">Accepted</div>
        <div></div>
        <div className="bg-denied" style={{width: 14, height:14}}></div>
        <div className="text-xs">Not Accepted</div>
      </div>
    </div>
  )
};

export default DocumentTooltip;


