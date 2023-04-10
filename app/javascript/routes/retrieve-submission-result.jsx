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

              <Table aria-label="basic table"  stripe="2n" hoverRow>
                <thead>
                  <tr>
                    <th className="w-16">#</th>
                    <th>Email</th>
                    <th className="w-32">Submission Date</th>
                    <th className="w-24">Status</th>
                  </tr>
                </thead>
                <tbody>
                {
                  _.map(responseJson.submissions, submission => {
                    return (
                    <tr key={submission.id}>
                      <td>{ submission.id }</td>
                      <td className="overflow-clip overflow-ellipsis whitespace-nowrap">{ submission.email }</td>
                      <td>{ moment(submission.created_at).format("MM/DD/YYYY") }</td>
                      <td>{ toTitleCase(submission.status) } </td>
                    </tr>
                    )
                  })
                }
                </tbody>
              </Table>
              
            </div>
            <div className="lg:col-span-2"></div>
          </div>
        </div>
      <Footer bg="bright" />
    </>
  );
};

export default RetrieveSubmissionResult;