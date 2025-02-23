import * as React from "react";
import { useContext, useEffect } from "react";
import { store } from "../providers/TSSProvider";
import Button from "@mui/joy/Button";
import _ from 'lodash';
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@mui/joy/Input";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { useForm } from "react-hook-form";
import FormHelperText from '@mui/joy/FormHelperText';
import { useTranslation, Trans } from "react-i18next";


const ConsentForm = () => {
  let { locale } = useParams();
  const { t } = useTranslation();

  const { submission, setSubmission, setSubmissionStep, revisitedSubmission, setRevisitedSubmission, setHeaderMode } = useContext(store);
  const { register, trigger, handleSubmit, watch, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange",
    defaultValues: submission
  });

  const navigate = useNavigate();
  
  const goToNextStep = (data) => {

    window.scrollTo(0, 0);

    const jsDate = new Date();
    const timestamp = jsDate.getTime();
    const utcOffset = jsDate.getTimezoneOffset();
    const utcTime = timestamp - utcOffset * 60 * 1000; // convert to milliseconds
    const isoString = new Date(utcTime).toISOString();


    setSubmission({
      ...submission,
      consented: true,
      consented_at: isoString,
      printed_name: data.printed_name
    });

    setSubmissionStep(2);
  }

  const goBack = () => {

    window.scrollTo(0, 0);
    setSubmission({
      ...submission,
      printed_name: watch("printed_name")
    });
    navigate(`/${locale}/submissions`);
  }

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  useEffect(() => {
    setHeaderMode("focus");
    if (revisitedSubmission[1]) {
      trigger();
    }
    
    setRevisitedSubmission({
      ...revisitedSubmission,
      1: true
    });

    return () => {

      setHeaderMode("normal");
    };
  }, []);

  return (
    <>
       <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            <button onClick={goBack}><ArrowBack /> { t("Back") }</button><br/><br/>
            { t("Informed Consent") }
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              { t("Before you submit the report, please read this and consent to participate.") }
            </h2>
            <div className="pb-5"></div>

            <Trans i18nKey="consent.title_part">
              <p className="mb-5 font-bold">
                CONSENT TO PARTICIPATE IN RESEARCH
              </p>

              <p className="mb-5">
                You have been asked to participate in a research study conducted by Wonyoung So, from the Department of Urban Studies and Planning at the Massachusetts Institute of Technology (M.I.T.). This study is sponsored by the Mozilla Foundation.
              </p>

              <p className="mb-2 text-white-op-70">
                You were selected as a possible participant in this study because you are previously screened by landlords who use tenant screening services to make decisions about the tenancy.
              </p>
            </Trans>
           

            <div className="border-dark-blue border-b py-4"></div>
            
            <Trans i18nKey="consent.summary">
              <p className="mt-4 mb-2">
                The information below provides a summary of the research. Your participation in this research is voluntary and you can withdraw at any time.
              </p>

              <p className="mb-2 text-white-op-70">
                <span className="font-bold text-dark-blue">Purpose</span><br/>
                The purpose of this study is to audit tenant screening services and reveal the patterns of their inner algorithms, data structures, and representations. This study is collecting tenant screening reports and denied renters’ experiences, with the goal of measuring the discriminatory and racialized impact of employing tenant screening services.
              </p>


              <p className="mb-2 text-white-op-70">
                <span className="font-bold text-dark-blue">Study Procedures</span><br/>
                This study will gather tenant screening reports from tenants. It will collect the report, the demographic information, and the result of the tenancy decision (e.g., accepted or denied, security deposits). The study will analyze the data and share the aggregated results with the public through a form of digital storytelling website. A report will be submitted to the Mozilla Foundation. Participation in the study will take approximately 15 minutes to complete.
              </p>


              <p className="text-white-op-70">
                <span className="font-bold text-dark-blue">Risks & Potential Discomfort</span><br/>
                There are potential risks to participants' privacy as the study will collect sensitive, personally identifiable information and the sensitive information contained in tenant screening reports. To minimize these risks, the study will use MIT’s secure database, full encryption, and anonymization procedures. 
              </p>
              
              <div className="border-dark-blue border-b py-4"></div>
              <div className="h-6"></div>  

              <p className="mb-5">
                You should read the information below, and ask questions about anything you do not understand before deciding whether or not to participate.
              </p>

            </Trans>

            <div className="h-6"></div>  
            
            <Trans i18nKey="consent.participation_withdrawal">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">PARTICIPATION AND WITHDRAWAL</span><br/>
                Your participation in this research is completely VOLUNTARY. If you choose to participate you may subsequently withdraw from the study at any time without penalty or consequences of any kind. If you choose not to participate, that will not affect your relationship with M.I.T. or your right to health care or other services to which you are otherwise entitled.
              </p>
            </Trans>
            
            
            <Trans i18nKey="consent.purpose_study">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">PURPOSE OF THE STUDY</span><br/>
                The research is to investigate the discriminatory and racialized impact of using tenant screening services. The project aims to create a crowdsourced database by collecting denied tenant screening reports and data from tenants who were rejected based on such reports, to understand the patterns of denying tenants and the disparate impact of employing tenant screening services by landlords. The research is interested in the credit history, eviction records, and criminal records used in tenant screening reports, and how these measures affect the tenant scoring algorithms. The goal of the research is to advocate for the regulation of tenant screening services' practice and policy and gain a better understanding of the tenant screening industry.
              </p>
            </Trans>
            
            
            <Trans i18nKey="consent.procedures">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">PROCEDURES</span><br/>
                If you volunteer to participate in this study, we would ask you to do the following things:
                Submit your tenant screening report to us. Send your tenant screening reports to us digitally.
                Participate in the survey tool. Please complete the survey tool to record your experiences, as well as your demographic information including race, gender, and income, among others. Participation in the study will take approximately 15 minutes to complete.
              </p>
            </Trans>
            

            <Trans i18nKey="consent.risks">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">POTENTIAL RISKS AND DISCOMFORTS</span><br/>
                There are potential risks to participants' privacy as the study will collect sensitive, personally identifiable information (e.g. name, DOB, SSN, address, phone, race, gender, income, credit score, credit history, eviction records, criminal records). To minimize these risks, the study will use MIT’s secure database and go through full encryption, and anonymization procedures.
                The raw data will never be shared and the research result will be shared in analysis with aggregation with regard to how tenant screening services score tenants. However, the interview excerpt might be shared anonymously (e.g., P1, P2, …). This research result is expected to be published in the form of a report to the Mozilla Foundation.
              </p>
            </Trans>
            

            <Trans i18nKey="consent.benefits">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">ANTICIPATED BENEFITS TO SUBJECTS</span><br/>
                There are no direct benefits to participating in the research.
              </p>

              <p className="mb-1 text-white-op-70">
                <span className="font-bold text-dark-blue">ANTICIPATED BENEFITS TO SOCIETY</span><br/>
                The potential benefits that society can expect from the study include:
              </p>
              <ul className="list-disc mb-5 text-white-op-70">
                <li className="pt-2">
                  Increased transparency and accountability of tenant screening services: The study aims to audit and reveal the patterns of algorithms and data structures used by tenant screening services. This could lead to increased transparency and accountability of these services and potentially result in more fair and just decision-making processes.
                </li>
                <li className="pt-2">
                  Improved understanding of the impact of tenant screening services: By analyzing denied tenant screening reports, the study will provide insights into the ways in which credit history, eviction records, and criminal records impact tenant scoring algorithms. This could lead to a better understanding of the discriminatory and racialized impact of employing these services.
                </li>
                <li className="pt-2">
                  Advocating for fair housing policies: The findings of the study could be used to advocate for the regulation of tenant screening services' practice and policy based on the Fair Housing Act's disparate impact standard. This could result in a more just and equitable housing system for all renters.
                </li>
              </ul>
            </Trans>


            <Trans i18nKey="consent.payment">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">PAYMENT FOR PARTICIPATION</span><br/>
                Every tenant who participates in the crowdsourcing tool and submits a tenant screening report will be compensated $100. Tenants who are interviewed will be compensated $25. Compensation will be paid out via Visa gift cards.
              </p>
            </Trans>

            <Trans i18nKey="consent.privacy">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">PRIVACY AND CONFIDENTIALITY</span><br/>
                The only people who will know that you are a research subject are members of the research team which might include outside collaborators not affiliated with MIT. No information about you, or provided by you during the research will be disclosed to others without your written permission, except: if necessary to protect your rights or welfare, or if required by law. In addition, your information may be reviewed by authorized MIT representatives to ensure compliance with MIT policies and procedures.<br/><br/>

                All the data is stored in a server that is maintained by MIT, and the admin server is only accessible via MIT’s VPN and the team’s admin account, meaning that only people with MIT affiliation and proper authorization will be having access. Throughout the data collection process, all the transactions and data will be transmitted with HTTP with Secure Sockets Layer (SSL), and the transmitted data will be stored with encryption. After the research is done, the data and reports will be destroyed. The raw data will never be shared and the research result will be shared in analysis with aggregation with regard to how tenant screening services score tenants. The interview excerpt might be shared anonymously (e.g., P1, P2, …). This research result is expected to be published in the form of a report to the Mozilla Foundation.
              </p>
            </Trans>


            <Trans i18nKey="consent.data_use">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">FUTURE DATA USE</span><br/>
                Your data collected as part of the research, even if identifiers are removed, will not be used or distributed for future research studies. When the study is completed, the team will destroy the data and print copies.
                <br/><br/>
                Traditionally used identifying information about you such as your name, address, phone number, medical record, social security number, identifiable features, or your voice, etc. will be removed before storing, using, or distributing for future research. When the study is completed, all identifiable data will be destroyed after the required data retention period.
              </p>
            </Trans>

            <Trans i18nKey="consent.withdrawal_by_inv">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">WITHDRAWAL OF PARTICIPATION BY THE INVESTIGATOR</span><br/>
                The investigator may withdraw you from participating in this research if circumstances arise which warrant doing so. The investigator, Wonyoung So, will make the decision and let you know if it is not possible for you to continue. The decision may be made either to protect your safety, or because it is part of the research plan that people who develop certain conditions may not continue to participate.<br/><br/>
                If you must drop out because the investigator asks you to or because you have decided on your own to withdraw, you will be paid a Visa gift card valued $25.
              </p>
            </Trans>

            <Trans i18nKey="consent.new_findings">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">NEW FINDINGS</span><br/>
                During the course of the study, you will be informed of any significant new findings (either good or bad), such as changes in the risks or benefits resulting from participation in the research or new alternatives to participation, that might cause you to change your mind about continuing in the study. If new information is provided to you, your consent to continue participating in this study will be re-obtained.
              </p>
            </Trans>
            

            <Trans i18nKey="consent.emergency">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">EMERGENCY CARE AND COMPENSATION FOR INJURY</span><br/>
                If you feel you have suffered an injury, which may include emotional trauma, as a result of participating in this study, please contact the person in charge of the study as soon as possible.<br/><br/>
                In the event you suffer such an injury, M.I.T. may provide itself, or arrange for the provision of, emergency transport or medical treatment, including emergency treatment and follow-up care, as needed, or reimbursement for such medical services. M.I.T. does not provide any other form of compensation for injury. In any case, neither the offer to provide medical assistance nor the actual provision of medical services shall be considered an admission of fault or acceptance of liability. Questions regarding this policy may be directed to MIT’s Insurance Office, at (617) 253-2823.
              </p>
            </Trans>


            <Trans i18nKey="consent.identity_inv">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">IDENTIFICATION OF INVESTIGATORS</span><br/>
                In the event of a research-related injury or if you experience an adverse reaction, please immediately contact one of the investigators listed below. If you have any questions about the research, please feel free to contact Wonyoung So (wso@mit.edu, 617-949-6602).
              </p>
            </Trans>
            

            <Trans i18nKey="consent.rights">
              <p className="mb-5 text-white-op-70">
                <span className="font-bold text-dark-blue">RIGHTS OF RESEARCH SUBJECTS</span><br/>
                You are not waiving any legal claims, rights or remedies because of your participation in this research study. If you feel you have been treated unfairly, or you have questions regarding your rights as a research subject, you may contact the Chairman of the Committee on the Use of Humans as Experimental Subjects, M.I.T., Room E25-143B, 77 Massachusetts Ave, Cambridge, MA 02139, phone 1-617-253 6787.
              </p>
            </Trans>

            <div className="h-60"></div>
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>

      <div className="fixed bottom-0 py-4 w-full z-50 bg-white-bg">
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div className="hidden lg:block"></div>
            <div className="lg:col-span-3">
              <div className="font-bold">
                { t("BY PRESSING THIS BUTTON, I WILLINGLY AGREE TO PARTICIPATE IN THE RESEARCH IT DESCRIBES.") }
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-2"></div>
            <div className="hidden lg:block"></div>
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(goToNextStep)}  onKeyDown={(e) => checkKeyDown(e)}>
                <FormControl>
                  <FormLabel>{ t("Name") }</FormLabel>
                  <Input color={errors["printed_name"] ? "danger" : "primary"} {...register("printed_name", { required: { value: true, message: t("This field is required.")} })} />
                  <FormHelperText>
                    {
                      errors["printed_name"] ? 
                      <span className="text-red">{errors["printed_name"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>  
                <div className="p-1"></div>
                <FormControl>
                  <Button disabled={!isValid} type="submit">{ t("I AGREE TO PARTICIPATE") }</Button>
                </FormControl>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsentForm;