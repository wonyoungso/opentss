import * as React from "react";
import { useContext, useEffect } from "react";
import Header from "../components/Header";
import ConsentForm from "../components/ConsentForm";
import { store } from "../providers/TSSProvider";
import UploadReport from "../components/UploadReport";
import TenantDemographics from "../components/TenantDemographics";
import ApplicationChars from "../components/ApplicationChars";
import FinalStep from "../components/FinalStep";

const SubmissionsNew = () => {

  const { setMenuOpen, submissionStep } = useContext(store);

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


  return (
    <>
      <Header bg="bright" mode="focus" />
      {
        renderStep()
      }
    </>
  );
};

export default SubmissionsNew;