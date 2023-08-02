import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import FormControl from '@mui/joy/FormControl';
import Button from "@mui/joy/Button";
import tss_image from "../assets/tss_image.png";
import { useTranslation, Trans } from "react-i18next";

const SubmissionsNew = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  let { locale } = useParams();
  const { t } = useTranslation();
  const { setSubmissionStep } = useContext(store);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSubmissionStep(1);
    document.title = "Submit Your Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  const goToNextStep = () => {
    navigate(`/${locale}/submissions/new`);
  }



  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            { t("Donate Tenant Screening Report") }
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              { t("Donate your tenant screening report securely, and get a $50 gift card.") }
            </h2>
            <div className="pb-5"></div>

            <img src={tss_image} alt="Tenant screening report images" />

            <p className="mb-5">
              { t("By collecting these denied reports from tenants, this project hopes to better understand the patterns of denying tenants based on such algorithms and expose the discriminatory impact of employing tenant screening services.") }
            </p>
            
            <p className="mb-10">
              { t("In this submission, you will provide your copy of tenant screening reports, and we will additionally ask you about you and the rental property you applied for, such as your age, gender, race, income, zip code, number of children, and rent and property types, among others.") }
           </p>
            <div className="pb-5"></div>
            <FormControl>
              <Button onClick={goToNextStep} size="lg">
                { t("Start Here!") }
              </Button>  
            </FormControl>
            <div className="pb-5"></div>
          
            <div className="h-6"></div>  
          </div>
          <div className="lg:col-span-2"></div>

          <div>
            { t("Read before donating") }
          </div>
          <div className="lg:col-span-3">

            <h2 className="font-bold text-4xl">
              { t("Please carefully read below before starting submission.") }
            </h2>

            <h2 className="font-bold text-4xl pt-3">
              { t("How can I participate in OpenTSS?") }
            </h2>

            <p className="text-xl font-bold pt-4 pb-2">
              <Trans i18nKey="submissions.copy_desc_01">
                If you do not have your copy of tenant screening report: <Link to={`/${locale}/request-copy`} className="underline decoration-1">we help you request a tenant screening report to tenant screening services.</Link>
              </Trans>
            </p>

            <p className="text-white-op-70">
              <Trans i18nKey="submissions.copy_desc_02">
                <span className="text-dark-blue font-bold">You have the right to request your copy of the report from the tenant screening services</span>, mostly free of charge (in every 12-month period or when you were denied and request within 60 days). We provide a tool for you to easily request your copy of the report. Using that letter, you can send the letter to tenant screening services.
              </Trans>
            </p>

            <div className="h-5"></div>
            <p className="text-xl font-bold pt-4 pb-2">
              { t("If you have your copy of tenant screening report, please make sure you have the following:" )}
            </p>

            <ol className="font-bold text-dark-blue list-decimal">
              <li>
                <Trans i18nKey="submissions.submit_desc_01">
                  Ensure you have digital files (e.g., PDF, JPG, PNG) of the tenant screening report ready. <span className="font-normal text-white-op-70">Scan or take photos of your tenant screening report if you have the report in paper. Please check the reports are legible.</span>
                </Trans>
              </li>
              <li>
                <Trans i18nKey="submissions.submit_desc_02">
                  Ensure you have an email address. <span className="font-normal text-white-op-70">This is to receive your compensation. After we check the submission is valid, we will send an e-gift card ($50) to your email address.</span> 
                </Trans>
              </li>
            </ol>

            <p className="text-white-op-70 pt-5">
              <Trans i18nKey="submissions.submit_desc_03">
                Additionally, We will ask a few questions about you, such as your age, gender, race, income, zip code, number of children, and the conditions of the rental property you applied for, such as rent, number of bedrooms, and the scale of landlords (number of units). <span className="text-dark-blue font-bold">Every information you submit to us will be encrypted, so only we can see it. Also, we will remove your sensitive information on the report.</span>  
              </Trans>
              
            </p>

            <div className="h-5"></div>

            <Trans i18nKey="submissions.submit_desc_04">
              <h2 className="font-bold text-4xl pb-2">
                What will OpenTSS do with my data?
              </h2>

              <p className="font-bold pt-3">
                First, we are interested in the discriminatory impact of tenant screening practices by protected groups (e.g., race, gender, source of income)
              </p>
              <p className="text-white-op-70">
                We will analyze the tenant screening data to see if any discriminatory impact exists based on race, gender, family status, or source of income, and also analyze the mechanisms of scoring or decision-making processes. We will publish the results in this website in aggregated form.
              </p>

              <p className="font-bold pt-3">
                We are also interested in the impact of algorithmic recommendation done by tenant screening services on landlords' decision making.
              </p>

              <p className="text-white-op-70">
                We hope to measure discriminatory impact of algorithmic scoring system on tenant screening practices. 
              </p>

              <div className="h-5"></div>
              <h2 className="font-bold text-4xl">
                How will you protect my data?
              </h2>

              <p className="text-xl font-bold pt-4 pb-2">
                You send your report through end-to-end-encryption. We will remove every identifiable information and save it to encrypted, secure storage.
              </p>

              <p className="text-white-op-70">
                We are only interested in the data of your tenant screening reports, not your name, your SSN, nor your address. After you send your report, we will remove your identifiable information on the report and store it on our server. We will ask for additional demographic information to be able to analyze the tenant screening report more accurately, to ascertain how different profiles are treated differently by the tenant screening companies. The report and data will be transferred with an end-to-end encryption and stored on our server. The data will only be used to analyze the tenant screening algorithms. It will neither be forwarded to third parties nor sold.
              </p>

              <div className="h-5"></div>
              <h2 className="font-bold text-4xl">
                Can I donate multiple tenant screening reports?
              </h2>

              <div className="h-5"></div>
              <p className="text-white-op-70">
                Yes! We consider a submission as unique one if these two combinations are unique:<br/>
                1) Tenant screening report (and underlying display of data)<br/>
                2) Property and rental decisions (i.e., you apply for multiple housing in your search process) 
                <br/><br/>
                For instance, suppose you applied for landlord A got your tenant screening report from the company B, and then applied for landlord C and got your tenant screening report again from B, then you can submit two times and get two $50 gift cards. <br/><br/>
                But in this case, we may ask you to verify the report is indeed generated by landlord C.
              </p>
            </Trans>
            


            <div className="h-5"></div>
            <FormControl>
              <Button onClick={goToNextStep} size="lg">
                { t("Start Here!") }
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