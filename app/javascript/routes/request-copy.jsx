import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import FormControl from '@mui/joy/FormControl';
import { Button } from "@mui/joy";
import { useTranslation, Trans } from "react-i18next";

const RequestCopy = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  let { locale } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);
  }, []);

  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            { t("Request Copy") }
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              <Trans i18nKey="request_copy.title">
                Request a copy of your<br/>
                tenant screening report
              </Trans>
            </h2>
            <p className="my-2">
              <Trans i18nKey="request_copy.title_desc">
                This is a tool that guides you through the process of requesting a copy of your tenant screening report from a tenant screening service.
              </Trans>
            </p>
            <div className="h-5"></div>            

            <FormControl>
              <Button onClick={() => { navigate(`/${locale}/request-copy/new`) }}  size="lg">
                <Trans i18nKey="request_copy.start_process">
                  Start Process
                </Trans>
              </Button>  
            </FormControl>

            <div className="h-6"></div>  
          </div>
          <div className="lg:col-span-2"></div>

          <div>
            { t("How it works") }
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-bold text-md">
              <Trans i18nKey="request_copy.step_1_title">
                Step 1. Identify the tenant screening services which you screened.
              </Trans>
            </h3>
            <p className="text-white-op-70 pt-1 pb-5">
              <Trans i18nKey="request_copy.step_1_desc">
                To request a copy of your tenant screening report, it is crucial to accurately identify the company associated with the screening process. <span className="font-bold text-dark-blue">Each tenant screening service operates with distinct protocols for submitting such requests.</span> For instance, you may have received an email from the tenant screening company, seeking your consent to collect and provide data to the landlord. Alternatively, when completing a rental application, landlords frequently disclose the name of the tenant screening company they employ. These sources of information assist in determining the appropriate entity to approach when requesting your report.
              </Trans>
            </p>

            <h3 className="font-bold text-md">
              <Trans i18nKey="request_copy.step_2_title">
                Step 2. Fill out the form and send the request.
              </Trans>
            </h3>
            <p className="text-white-op-70 pt-1 pb-5">
              <Trans i18nKey="request_copy.step_2_desc">
                Based on the guidance, you send the request and wait until tenant screening or landlords respond and send a copy of your report.
              </Trans>
            </p>

            <h3 className="font-bold text-md">
              <Trans i18nKey="request_copy.step_3_title">
                Step 3. Donate the copy of your tenant screening report to us!
              </Trans>
            </h3>
            <p className="text-white-op-70 pt-1 pb-5">
              <Trans i18nKey="request_copy.step_3_desc">
                After you receive the copy, please <Link className="underline" to={`/${locale}/submissions/new`}>donate it to us</Link> to contribute to the research.
              </Trans>
            </p>
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default RequestCopy;