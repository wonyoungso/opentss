import * as React from "react";
import { useContext, useEffect } from "react";
import Header from "../components/Header";
import ConsentForm from "../components/ConsentForm";
import { store } from "../providers/TSSProvider";
import UploadReport from "../components/UploadReport";
import TenantDemographics from "../components/TenantDemographics";
import ApplicationChars from "../components/ApplicationChars";
import FinalStep from "../components/FinalStep";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation, Trans } from "react-i18next";
import {useNavigate, useLoaderData, useParams, useSearchParams} from 'react-router-dom';

const SubmissionsNew = () => {

  const { setMenuOpen, submissionStep } = useContext(store);

  const { responseJson } = useLoaderData();
  const navigate = useNavigate();
  let { locale } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Submit Your Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  const renderStep = () => {
    if (submissionStep === 1) {
      return <ConsentForm />;
    } else if (submissionStep === 2) {
      return <UploadReport />;
    } else if (submissionStep === 3) {
      return <TenantDemographics />;
    } else if (submissionStep === 4) {
      return <ApplicationChars />;
    } else if (submissionStep === 5) {
      return <FinalStep />;
    }
  }
  const goBack = () => {

    window.scrollTo(0, 0);
    navigate(`/${locale}`);
  }
  const { t } = useTranslation();

  return (
    <>
      <Header bg="bright" mode="focus" />
      {
        responseJson.publish_survey ?

        renderStep() :
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>

            <button onClick={goBack}><ArrowBack /> { t("Back") }</button><br/><br/>
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                Stay Tuned for the Workshops!
              </h2>
              <div className="pt-3"></div>
              We are sorry to inform you that we have closed down the report donation. But we will open the submission form in the workshops anticipated. Please stay tuned! 
            </div>
          </div>
        </div>
      
      }
      
      
    </>
  );
};

export default SubmissionsNew;