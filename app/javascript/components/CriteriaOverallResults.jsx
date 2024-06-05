import * as React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import _ from 'lodash';
import { store } from "../providers/TSSProvider";
import ScreeningDocument from "./ScreeningDocument";
import RentToIncomeRatioCriterion from "./RentToIncomeRatioCriterion";
import RentToNetIncomeRatioCriterion from "./RentToNetIncomeRatioCriterion";
import MinimumCreditScoreCriterion from "./MinimumCreditScoreCriterion";
import DebtToIncomeRatioCriterion from "./DebtToIncomeRatioCriterion";
import NoRentalDebtCriterion from "./NoRentalDebtCriterion";
import AllowedRentalDebtCriterion from "./AllowedRentalDebtCriterion";
import NoOpenCollectionsCriterion from "./NoOpenCollectionsCriterion";
import AllowedOpenCollectionCriterion from "./AllowedOpenCollectionCriterion";
import NoOtherDebtCriterion from "./NoOtherDebtCriterion";
import AllowedOtherDebtsCriterion from "./AllowedOtherDebtsCriterion";
import NoBankruptcyCriterion from "./NoBankruptcyCriterion";
import AllowedBankruptcyYearCriterion from "./AllowedBankruptcyYearCriterion";
import NoEvictionCriterion from "./NoEvictionCriterion";
import AllowedEvictionYearCriterion from "./AllowedEvictionYearCriterion";
import NoCriminalCriterion from "./NoCriminalCriterion";
import AllowedCriminalYearCriterion from "./AllowedCriminalYearCriterion";
import DocumentTooltip from "./DocumentTooltip";
import ApplicantTooltip from "./ApplicantTooltip";



const calculateOverallPerc = (criteria, screening_documents) => {
  let numberOfAcceptedReports = 0;
  let processedScreeningDocuments = [...screening_documents];
  
  _.each(processedScreeningDocuments, (screeningDocument, i) => {
    
    processedScreeningDocuments[i]["minimum_credit_score_accepted"] = _.isNull(screeningDocument.minimum_credit_score) || (screeningDocument.minimum_credit_score < criteria.credit_score);

    processedScreeningDocuments[i]["calculated_rti"] = (screeningDocument.safmr_1br / criteria.monthly_income) * 100
    processedScreeningDocuments[i]["rti_accepted"] = _.isNull(screeningDocument.rent_to_income_ratio) ||
    (screeningDocument.rent_to_income_ratio > processedScreeningDocuments[i]["calculated_rti"])
    

    processedScreeningDocuments[i]["calculated_rtni"] = ((screeningDocument.safmr_1br + criteria.monthly_debt_service) / criteria.monthly_income) * 100
    processedScreeningDocuments[i]["rtni_accepted"] = _.isNull(screeningDocument.rent_to_netincome_ratio) ||
    (screeningDocument.rent_to_netincome_ratio > processedScreeningDocuments[i]["calculated_rtni"])
    


    processedScreeningDocuments[i]["calculated_dti"] = (criteria.monthly_debt_service) / (criteria.monthly_income) * 100;
    processedScreeningDocuments[i]["dti_accepted"] = _.isNull(screeningDocument.debt_to_income_ratio) ||
    (screeningDocument.debt_to_income_ratio > processedScreeningDocuments[i]["calculated_dti"])

    processedScreeningDocuments[i]["no_rental_debt_accepted"] = _.isNull(screeningDocument.no_rental_debt) || (criteria.rental_debt <= 0) || !(screeningDocument.no_rental_debt & criteria.rental_debt > 0)

    processedScreeningDocuments[i]["allowed_rental_debt_accepted"] = _.isNull(screeningDocument.allowable_amount_rental_debt) || (screeningDocument.allowable_amount_rental_debt > criteria.rental_debt)

    processedScreeningDocuments[i]["no_open_collections_accepted"] = _.isNull(screeningDocument.no_open_collections) || (criteria.collections <= 0) || !(screeningDocument.no_open_collections & criteria.collections > 0)

    processedScreeningDocuments[i]["allowable_amount_open_collections_accepted"] = _.isNull(screeningDocument.allowable_amount_open_collections) || (screeningDocument.allowable_amount_open_collections > criteria.collections)

    processedScreeningDocuments[i]["no_other_debt_accepted"] = _.isNull(screeningDocument.no_other_debts) || (criteria.other_debts <= 0) || !(screeningDocument.no_other_debts & criteria.other_debts > 0)

    processedScreeningDocuments[i]["allowable_amount_other_debts_accepted"] = _.isNull(screeningDocument.allowable_amount_other_debts) || (screeningDocument.allowable_amount_other_debts > criteria.other_debts)

    processedScreeningDocuments[i]["tenant_no_bankruptcy_accepted"] = _.isNull(screeningDocument.tenant_no_bankruptcy) || (criteria.bankruptcy <= 0) || !(screeningDocument.tenant_no_bankruptcy & criteria.bankruptcy > 0)


    processedScreeningDocuments[i]["bankruptcy_allow_years_accepted"] = _.isNull(screeningDocument.bankruptcy_allow_years) || (criteria.bankruptcy == 0 || screeningDocument.bankruptcy_allow_years > criteria.bankruptcy)


    

    if ((_.isNull(screeningDocument.tenant_no_eviction) && _.isNull(screeningDocument.tenant_no_eviction_judgment))) {
    
      processedScreeningDocuments[i]["no_eviction_accepted"] = true
    
    } else {

      if (screeningDocument.tenant_no_eviction){

        processedScreeningDocuments[i]["no_eviction_accepted"] = (criteria.eviction_history_had_judgments != "yes" && criteria.eviction_history_had_eviction_case_dismissed != "yes")
      
      } else if (screeningDocument.tenant_no_eviction_judgment){
        
        processedScreeningDocuments[i]["no_eviction_accepted"] = criteria.eviction_history_had_judgments != "yes"

      } else {
        
        processedScreeningDocuments[i]["no_eviction_accepted"] = true

      }
    }


    if (criteria.eviction_history_had_eviction_case_dismissed == "yes"){  
      
      processedScreeningDocuments[i]["eviction_years_accepted"] = 
        (_.isNull(screeningDocument.tenant_no_eviction)) ||
        (screeningDocument.tenant_can_eviction_years < criteria.most_recent_eviction)

    } else if (criteria.eviction_history_had_judgments == "yes") {

      processedScreeningDocuments[i]["eviction_years_accepted"] = 
        (_.isNull(screeningDocument.tenant_no_eviction) && _.isNull(screeningDocument.tenant_no_eviction_judgment)) ||
        ((screeningDocument.tenant_can_eviction_years < criteria.most_recent_eviction) && 
         (screeningDocument.tenant_can_eviction_judgment_years < criteria.most_recent_eviction))
    } else if (criteria.eviction_history_had_eviction_case_dismissed !== "yes" && criteria.eviction_history_had_judgments !== "yes") {
      processedScreeningDocuments[i]["eviction_years_accepted"] = true;
    }
    

    processedScreeningDocuments[i]["no_criminal_accepted"] = ( _.isNull(screeningDocument.criminal_no_arrest) &&
      _.isNull(screeningDocument.criminal_no_charge_misdeam) &&
      _.isNull(screeningDocument.criminal_no_charge_felony) &&
      _.isNull(screeningDocument.criminal_no_conviction_misdeam) &&
      _.isNull(screeningDocument.criminal_no_conviction_felony))  

    processedScreeningDocuments[i]["no_criminal_accepted"] = (!screeningDocument.criminal_no_arrest &&
      !screeningDocument.criminal_no_charge_misdeam &&
      !screeningDocument.criminal_no_charge_felony &&
      !screeningDocument.criminal_no_conviction_misdeam &&
      !screeningDocument.criminal_no_conviction_felony)  
  
    if (screeningDocument.criminal_no_arrest){
      processedScreeningDocuments[i]["no_criminal_accepted"] = 
        criteria.criminal_history_been_arrested !== "yes" &&
        criteria.criminal_history_charged_misdemeanor !== "yes" &&
        criteria.criminal_history_charged_felony !== "yes" &&
        criteria.criminal_history_convicted_misdemeanor !== "yes" &&
        criteria.criminal_history_convicted_felony !== "yes";
    } 

    if (screeningDocument.criminal_no_charge_misdeam){
      processedScreeningDocuments[i]["no_criminal_accepted"] = 
        criteria.criminal_history_charged_misdemeanor !== "yes" &&
        criteria.criminal_history_charged_felony !== "yes" && 
        criteria.criminal_history_convicted_misdemeanor !== "yes" && 
        criteria.criminal_history_convicted_felony !== "yes"
    }  

    if (screeningDocument.criminal_no_charge_felony){
      processedScreeningDocuments[i]["no_criminal_accepted"] = 
        criteria.criminal_history_charged_felony !== "yes" && 
        criteria.criminal_history_convicted_felony !== "yes";
    }  

    if (screeningDocument.criminal_no_conviction_misdeam){
      processedScreeningDocuments[i]["no_criminal_accepted"] = 
        criteria.criminal_history_convicted_misdemeanor !== "yes" && 
        criteria.criminal_history_convicted_felony !== "yes";
    }

    if (screeningDocument.criminal_no_conviction_felony){
      processedScreeningDocuments[i]["no_criminal_accepted"] = criteria.criminal_history_convicted_felony !== "yes"
    }  
    

      
    if (criteria.criminal_history_convicted_felony == "yes") {
      processedScreeningDocuments[i]["criminal_years_accepted"] = 
        _.isNull(screeningDocument.criminal_conviction_felony_year) || 
        screeningDocument.criminal_conviction_felony_year < criteria.most_recent_eviction.most_recent_criminal;

    } else if (criteria.criminal_history_convicted_misdemeanor == "yes") {
    
      processedScreeningDocuments[i]["criminal_years_accepted"] = 
        _.isNull(screeningDocument.criminal_conviction_misdeam_year) || 
        screeningDocument.criminal_conviction_misdeam_year < criteria.most_recent_eviction.most_recent_criminal;

    } else if (criteria.criminal_history_convicted_felony !== "yes" && criteria.criminal_history_convicted_misdemeanor !== "yes") {
      processedScreeningDocuments[i]["criminal_years_accepted"] = true
    }
    

    processedScreeningDocuments[i]["overall_accepted"] = 
      processedScreeningDocuments[i]["minimum_credit_score_accepted"] && 
      processedScreeningDocuments[i]["rti_accepted"] &&
      processedScreeningDocuments[i]["rtni_accepted"] && 
      processedScreeningDocuments[i]["dti_accepted"] &&
      processedScreeningDocuments[i]["no_rental_debt_accepted"] &&
      processedScreeningDocuments[i]["allowed_rental_debt_accepted"] && 
      processedScreeningDocuments[i]["no_open_collections_accepted"] &&
      processedScreeningDocuments[i]["allowable_amount_open_collections_accepted"] &&
      processedScreeningDocuments[i]["no_other_debt_accepted"] &&
      processedScreeningDocuments[i]["allowable_amount_other_debts_accepted"] &&
      processedScreeningDocuments[i]["tenant_no_bankruptcy_accepted"] &&
      processedScreeningDocuments[i]["bankruptcy_allow_years_accepted"] &&
      processedScreeningDocuments[i]["no_eviction_accepted"] && 
      processedScreeningDocuments[i]["eviction_years_accepted"] && 
      processedScreeningDocuments[i]["no_criminal_accepted"] && 
      processedScreeningDocuments[i]["criminal_years_accepted"];
  })

  numberOfAcceptedReports = _.size(_.filter(processedScreeningDocuments, sd => { return sd.overall_accepted == true; }));

  let acceptanceRate = numberOfAcceptedReports / processedScreeningDocuments.length * 100;

  // processedScreeningDocuments = _.orderBy(processedScreeningDocuments, ['overall_accepted'], ["asc"])
  return { acceptanceRate, processedScreeningDocuments };
}


 
const CriteriaOverallResults = (props) => {
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const {selectedScreeningDocument, setSelectedScreeningDocument } = useContext(store);


  const { acceptanceRate, processedScreeningDocuments } = calculateOverallPerc(props.criteria, props.screening_documents)
    
  const acceptedDocuments = _.filter(processedScreeningDocuments, d => d.overall_accepted);
  const deniedDocuments = _.filter(processedScreeningDocuments, d => !d.overall_accepted);

  function onDocClick(e, id){
    const selectedScreeningDocument = _.find(processedScreeningDocuments, d => d.id === id);
    setPopupPosition({ 
      x: e.clientX + window.scrollX, 
      y: e.clientY + window.scrollY 
    });
    setSelectedScreeningDocument(selectedScreeningDocument);
  }


  return (
    <div className="pt-10">
      <ApplicantTooltip />
      {
        selectedScreeningDocument ?
        <DocumentTooltip {...selectedScreeningDocument}  x={popupPosition.x} y={popupPosition.y} /> : null
      }
      <div className="font-bold text-3xl">
        Overall Results
      </div>

      <div className="text-3xl">
        <span className="text-sat-blue">{acceptanceRate.toFixed(2)}%</span> of the properties would accept you<br/>
        based on data you provided. 

      </div>

      <div className="font-bold text-dark-gray pt-5">
        <span className="text-sat-blue">{acceptedDocuments.length}</span> properties accept
      </div>

      <div className="flex gap-2 flex-wrap pt-2">
        {
          _.map(acceptedDocuments, screening_document => {
            return (
              <ScreeningDocument {...screening_document}  key={screening_document.id} onDocClick={onDocClick} />
            )
          })
        }
      </div>
      
      <div className="font-bold text-dark-gray pt-5">
        <span className="text-dark-gray">{deniedDocuments.length}</span> properties not accept
      </div>

      <div className="flex gap-2 flex-wrap pt-2">
        {
          _.map(deniedDocuments, screening_document => {
            return (
              <ScreeningDocument {...screening_document} key={screening_document.id}  onDocClick={onDocClick} />
            )
          })
        }
      </div>

      
      <div className="pt-10"></div>
      <div className="font-bold text-3xl">
        Result by Criterion
      </div>
      
      
      <div className="lg:grid lg:grid-cols-6 lg:gap-5 pt-5">
        <MinimumCreditScoreCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <RentToIncomeRatioCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <RentToNetIncomeRatioCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <DebtToIncomeRatioCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <NoRentalDebtCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <AllowedRentalDebtCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <NoOpenCollectionsCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <AllowedOpenCollectionCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <NoOtherDebtCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <AllowedOtherDebtsCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <NoBankruptcyCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <AllowedBankruptcyYearCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <NoEvictionCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <AllowedEvictionYearCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <NoCriminalCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
        <AllowedCriminalYearCriterion screeningDocuments={processedScreeningDocuments} criteria={props.criteria} />
      </div>
    </div>
  )
};

export default CriteriaOverallResults;

