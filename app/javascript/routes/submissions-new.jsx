import * as React from "react";
import { useContext, useEffect } from "react";
import Header from "../components/Header";
import ConsentForm from "../components/ConsentForm";
import { store } from "../providers/TSSProvider";
import UploadReport from "../components/UploadReport";
import TenantDemographics from "../components/TenantDemographics";

const SubmissionsNew = () => {

  const { setMenuOpen, submissionStep } = useContext(store);

  useEffect(() => {
    document.title = "Submit Your Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  const renderStep = () => {
    if (submissionStep == 1) {
      return <ConsentForm />;
    } else if (submissionStep == 2) {
      return <UploadReport />;
    } else if (submissionStep == 3) {
      return <TenantDemographics />;
    } else {
      return <></>;
    }
  }


  return (
    <>
      <Header bg="bright" />
      {
        renderStep()
      }
    </>
  );
};

export default SubmissionsNew;