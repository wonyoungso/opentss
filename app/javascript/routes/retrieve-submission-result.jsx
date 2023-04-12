import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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

const RetrieveSubmissionResult = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const { responseJson } = useLoaderData();

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
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
              Retrieve Submission
            </div>
            <div className="lg:col-span-3">
              {
                responseJson.submissions.length > 1 ?
                <>
                  <h2 className="font-bold text-4xl">
                    Your submissions
                  </h2>
                  <div className="py-3">
                    Here are your submissions.
                  </div>
                </> :
                <>
                  <h2 className="font-bold text-4xl">
                    Your submission
                  </h2>
                  <div className="py-3">
                    Here is your submission.
                  </div>
                </>
              }
                
              <div className="hidden lg:flex lg:justify-between lg:gap-2 border-y border-y-dark-blue py-3">
                <div className="lg:w-4">#</div>
                <div className="lg:w-2/5">Email</div>
                <div className="lg:w-1/5">Data<br/>They Collect</div>
                <div className="lg:w-1/5">Report<br/>Collected</div>
              </div>


              {
                _.map(responseJson.submissions, submission => {
                  return (
                  <div key={submission.id} className="lg:flex lg:justify-between lg:gap-2 cursor-pointer hover:bg-white-op-10 border-b border-b-white-op-50 py-1">
                    <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-4 overflow-hidden overflow-ellipsis text-dark-blue">{ submission.id }</div>
                    <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-2/5 text-white-op-70 overflow-clip overflow-ellipsis whitespace-nowrap">{ submission.email }</div>
                    <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">{ moment(submission.created_at).format("MM/DD/YYYY") }</div>
                    <div className="pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">{ toTitleCase(submission.status) } </div>
                  </div>
                  )
                })
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