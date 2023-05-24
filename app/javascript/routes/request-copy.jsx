import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import FormControl from '@mui/joy/FormControl';
import { Button } from "@mui/joy";

const RequestCopy = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();


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
            Request a copy
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              Request a copy of<br/>
              tenant screening report
            </h2>
            <p className="my-2">
              This is a tool that guides you through a process of requesting a letter to tenant screening services.
            </p>
            <div className="h-5"></div>            

            <FormControl>
              <Button onClick={() => { navigate("/request-copy/new") }}  size="lg">
                Start Process
              </Button>  
            </FormControl>

            <div className="h-6"></div>  
          </div>
          <div className="lg:col-span-2"></div>

          <div>
            How it works
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-bold text-md">
              Step 1. Identify the tenant screening services which you screened.
            </h3>
            <p className="text-white-op-70 pt-1 pb-5">
              To request a copy of your tenant screening report, it is crucial to accurately identify the company associated with the screening process. <span className="font-bold text-dark-blue">Each tenant screening service operates with distinct protocols for submitting such requests.</span> For instance, you may have received an email from the tenant screening company, seeking your consent to collect and provide data to the landlord. Alternatively, when completing a rental application, landlords frequently disclose the name of the tenant screening company they employ. These sources of information assist in determining the appropriate entity to approach when requesting your report.
            </p>

            <h3 className="font-bold text-md">
              Step 2. Fill out the form and send the request.
            </h3>
            <p className="text-white-op-70 pt-1 pb-5">
              Based on the guidance, you send the request and wait until tenant screening or landlords respond and send a copy of your report.
            </p>

            <h3 className="font-bold text-md">
              Step 3. Donate the copy of your tenant screening report to us!
            </h3>
            <p className="text-white-op-70 pt-1 pb-5">
              After you received the copy, please <Link className="underline" to="/submissions/new">donate it to us</Link> to contribute to the research.
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