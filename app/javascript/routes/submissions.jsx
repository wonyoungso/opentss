import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import FormControl from '@mui/joy/FormControl';
import Button from "@mui/joy/Button";
import tss_image from "../assets/tss_image.png";

const SubmissionsNew = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Submit Your Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  const goToNextStep = () => {
    navigate("/submissions/new");
  }

  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            Send <br/>
            Tenant Screening Report
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              Send your tenant screening report, and get a $50 gift card.
            </h2>
            <div className="pb-5"></div>
            <FormControl>
              <Button onClick={goToNextStep} size="lg">
                Start
              </Button>  
            </FormControl>
            <div className="pb-5"></div>

            <p className="mb-5">
              Tenant screening services and their inner algorithms and data collection processes are proprietary, it is only possible to audit them externally.
            </p>

            <p className="mb-5">
              So by collecting these denied reports from tenants, this project hopes to better understand the patterns of denying tenants based on such algorithms and expose the discriminatory impact of employing tenant screening services.
            </p>
            
            <p className="mb-10">
              You will provide your copy of tenant screening reports, and we will additionally ask you about you and the rental property you applied for, such as your age, gender, race, income, zip code, number of children, and rent and property types, among others.
           </p>
          
            <div className="h-6"></div>  
          </div>
          <div className="lg:col-span-2"></div>

          <div>
            Frequently Asked Questions
          </div>
          <div className="lg:col-span-3">
            <img src={tss_image} alt="Tenant screening report images" />
            <h2 className="font-bold text-4xl">
              How can I participate in OpenTSS?
            </h2>

            <p className="text-xl font-bold pt-4 pb-2">
              If you do not have your copy of tenant screening report: we will help you request a tenant screening report to tenant screening services.
            </p>

            <p className="text-white-op-70">
              You have the right to request your copy of the report from the tenant screening services, mostly free of charge. We provide a tool to request the letter. Using that letter, you can send the letter to tenant screening services.
            </p>

            <div className="h-5"></div>
            <p className="text-xl font-bold pt-4 pb-2">
              If you do not have your copy of tenant screening report: we will help you request a tenant screening report to tenant screening services.
            </p>

            <p className="text-white-op-70">
              Scan or take photos of your tenant screening report (We will remove your sensitive information), and upload it here. Additionally, we will ask a few questions about you, such as your age, gender, race, income, zip code, number of children, and the conditions of the rental property you applied for, such as rent, number of bedrooms, and the scale of landlords (number of units).
              <br/><br/>
              <span className="font-bold text-dark-blue">We will compensate you for a $50-worth Visa gift card.</span>
            </p>

            <div className="h-5"></div>
            <h2 className="font-bold text-4xl pb-2">
              What will OpenTSS do with my data?
            </h2>

            <p className="text-white-op-70">
              We will analyze the tenant screening data to see if any discriminatory impact exists based on race, gender, family status, or source of income, and also analyze the mechanisms of scoring or decision-making processes. We will publish the results in this website in aggregated form.
            </p>

            <div className="h-5"></div>
            <h2 className="font-bold text-4xl">
              How will you protect my data?
            </h2>

            <p className="text-xl font-bold pt-4 pb-2">
              You send the report through end-to-end-encryption. We will remove every identifiable information and save it to a safe.
            </p>

            <p className="text-white-op-70">
              We are only interested in the data of your tenant screening reports, not your name, your SSN, nor your address. After you send your report, we will remove your identifiable information on the report and store it on our server. We will ask for additional demographic information to be able to analyze the tenant screening report more accurately, to ascertain how different profiles are treated differently by the tenant screening companies. The report and data will be transferred with an end-to-end encryption and stored on our server. The data will only be used to analyze the tenant screening algorithms. It will neither be forwarded to third parties nor sold.
            </p>

            <div className="h-5"></div>
            <h2 className="font-bold text-4xl">
              Can I submit multiple tenant screening reports?
            </h2>

            <p className="text-xl font-bold pt-4 pb-2">
              Yes, if you have multiple reports created by multiple companies!
            </p>

            <p className="text-white-op-70">
              We compensate per company. Suppose you have one tenant screening report by Rentgrow and one by SafeRent. Then we will accept both reports as valid submission and compensate two $50 gift cards (total $100). 
            </p>
            <div className="h-5"></div>
            <FormControl>
              <Button onClick={goToNextStep} size="lg">
                Start
              </Button>  
            </FormControl>
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default SubmissionsNew;