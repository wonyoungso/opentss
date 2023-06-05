import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import { useLoaderData } from "react-router-dom";
import { FormControl } from "@mui/joy";
import Button from "@mui/joy/Button";
import Table from '@mui/joy/Table';
import _ from 'lodash';
import moment from "moment";
import { useTranslation, Trans } from "react-i18next";

const RetrieveSubmissionResult = () => {
  const { t } = useTranslation();
  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const { responseJson } = useLoaderData();
  let { locale } = useParams();

  function toTitleCase(str) {
    switch(str) {
      case "submitted":
        return <Trans i18nKey="submitted">
          Submitted:<br/>
          In Proceesing
        </Trans>;
      case "reward_granted":
        return t("Reward Granted");

    } 
  }

  useEffect(() => {
    document.title = "Retrieve Your Submission | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  return (
    <>
      <Header bg="bright" />
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              { t("Retrieve Submission") }
            </div>
            <div className="md:col-span-5 lg:col-span-4">
              {
                responseJson.submissions.length > 0 ?
                <>
                  <h2 className="font-bold text-4xl">
                    { t("Your submission") }
                  </h2>
                  <div className="py-3">
                    { t("Here is your submission.") }
                  </div>
                  <div className="hidden lg:flex lg:gap-2 border-y border-y-dark-blue py-3 text-sm">
                    <div className="lg:w-10">#</div>
                    <div className="lg:w-2/6">{ t("Email") }</div>
                    <div className="lg:w-1/6">{ t("Submitted Date") }</div>
                    <div className="lg:w-1/6">{ t("Status") }</div>
                    <div className="lg:w-1/6">{ t("Consent Form") }</div>
                    <div className="lg:w-1/6">{ t("Re-upload Report") }</div>
                  </div>


                  {
                    _.map(responseJson.submissions, submission => {
                      return (
                      <div key={submission.id} className="text-sm lg:flex lg:gap-2 cursor-pointer hover:bg-white-op-10 border-b border-b-white-op-50 py-3">
                        <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-10 overflow-hidden overflow-ellipsis text-dark-blue">{ submission.id }</div>
                        <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-2/6 text-white-op-70 overflow-hidden">{ submission.email }</div>
                        <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/6 text-white-op-70">{ moment(submission.created_at).format("MM/DD/YYYY") }</div>
                        <div className="pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/6 text-white-op-70">{ toTitleCase(submission.status) } </div>
                        <div className="pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/6 text-white-op-70">
                          <Link to={`/${locale}/retrieve-submission/${responseJson.token}/consent_form`} className="font-bold text-dark-blue underline decoration-1">{ t("View Consent Form") }</Link>
                        </div>
                        <div className="pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/6 text-white-op-70">
                          {
                            submission.status === "submitted" ? 
                            <Link to={`/${locale}/retrieve-submission/${responseJson.token}/reupload_report`} className="font-bold text-dark-blue underline decoration-1">{ t("Re-upload") }</Link> : null
                          }
                          
                        </div>
                      </div>
                      )
                    })
                  }
                  
                </> :
                <>
                  <h2 className="font-bold text-4xl">
                    No Submission
                  </h2>
                  <div className="py-3">
                    There is no submission associated with your email or your token for retriving the submission has been expired.
                  </div>
                </>
              }
                
            
            </div>
            <div className="lg:col-span-2"></div>
          </div>
        </div>
      <Footer bg="bright" />
    </>
  );
};

export default RetrieveSubmissionResult;