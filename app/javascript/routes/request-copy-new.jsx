import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData, useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Checkbox from '@mui/joy/Checkbox';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { Button } from "@mui/joy";
import _ from 'lodash';
import { useTranslation, Trans } from "react-i18next";


const RequestCopyNew = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  let { locale } = useParams();
  const { companies } = useLoaderData();
  const [moreThan60days, setMoreThan60days] = useState(false);
  const [findNameStatus, setFindNameStatus] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { t } = useTranslation();
  

  useEffect(() => {
    document.title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);
  }, []);

  const onChangeHandler = (event) => {
    setFindNameStatus(event.target.checked);
  };

  const onChangeAutocomplateHandler = (event, value) => {
    setSelectedCompany(value);
  }

  const checkStatus = () => {
    if (findNameStatus) {
      // user should type  
      return companyName.length === 0;
    } else {
      // user should choose
      return _.isNull(selectedCompany);
    }
  };
  

  const goToNextStep = () => {
    if (findNameStatus) {
      navigate(`/${locale}/request-copy/custom-form/${companyName}`);
    } else {
      navigate(`/${locale}/request-copy/companies/${selectedCompany.id}?sixty_days=${moreThan60days ? "t" : "f"}`);
    }
  };

  const hasOnSite = (company) => {
    if (company.id === 6) {
      return true;
    }
    
    let result = false;
    _.each(company.outsourcing_companies, outsourcing_company => {
      if (outsourcing_company.id === 6) {
        result = true;
      }
    });

    return result;
  }

  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            <Trans i18nKey="request_copy_new.step_1_subtitle">
              Step 1. Identify the tenant screening service
            </Trans>
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              <Trans i18nKey="request_copy_new.step_1_title">
                Which is the tenant screening company you were screened?
              </Trans>
            </h2>
            <p className="my-2">
              <Trans i18nKey="request_copy.title_desc">
                This is a tool that guides you through a process of requesting a letter to tenant screening services.
              </Trans>
            </p>
            <div className="h-5"></div>            

            <FormControl>
              <FormLabel>
                <Trans i18nKey="request_copy_new.select_label">
                  Select the tenant screening service here.
                </Trans>
              </FormLabel>
              <Autocomplete placeholder={t("Choose...")} disabled={findNameStatus} getOptionLabel={option => option.name} options={companies} value={selectedCompany} onChange={onChangeAutocomplateHandler} />
            </FormControl>
            <div className="h-5"></div>

            <Checkbox label={t("I can't find the name in the list")} checked={findNameStatus} onChange={onChangeHandler} />
            <div className="h-5"></div>
            {
              findNameStatus ?
              <FormControl>
                <FormLabel>{t("Enter the name of the tenant screening company")}</FormLabel>
                <Input value={companyName} placeholder={t("e.g., TransUnion")} onChange={(e) => { setCompanyName(e.target.value)}} />
                <div className="h-5"></div>
              </FormControl>
              : null
            }
            {
              !_.isNull(selectedCompany) && hasOnSite(selectedCompany) ? 
              <>
                <FormControl>
                  <Checkbox label="My rental application was screened more than 60 days ago" checked={moreThan60days} onChange={(e) => { setMoreThan60days(e.target.checked) }} />
                </FormControl>
                <div className="h-5"></div>
              </> : null
            }
            
            <FormControl>
              <Button disabled={checkStatus()} onClick={goToNextStep} size="lg">
                {t("Next")}
              </Button>  
            </FormControl>


            <div className="h-6"></div>  
          </div>
          <div className="lg:col-span-2"></div>

          <div>
            { t("FAQ")}
          </div>
          <div className="lg:col-span-3">
            <p className="text-white-op-70 pt-1 pb-5">
              <Trans i18nKey="request_copy_new.faq_q_1">
                Q: How can I determine which company is conducting the tenant screening?
              </Trans>
            </p>
            
            <h3 className="font-bold text-md">
              <Trans i18nKey="request_copy_new.faq_a_1_title">
                A: There are several avenues to explore for identifying the tenant screening company.
              </Trans>
            </h3>
            
              <p className="text-white-op-70 pt-1 pb-5">
                <span className="font-bold">{t("1. Review your email correspondence.")}</span><br/>
                <Trans i18nKey="request_copy_new.faq_a_desc_01">
                  Check your email inbox for any communication received from the tenant screening company. It is common for them to send emails requesting your consent to collect and provide data to the landlord.
                </Trans>
              </p>

              <p className="text-white-op-70 pt-1 pb-5">
                <span className="font-bold">{ t("2. Refer to your rental application.") }</span><br/>
                <Trans i18nKey="request_copy_new.faq_a_desc_02">
                  Examine your rental application, as landlords often disclose the name of the tenant screening company they utilize during the screening process.
                </Trans>
              </p>

              <p className="text-white-op-70 pt-1 pb-5">
                <span className="font-bold">{ t("3. Consult your adverse action letter.") }</span><br/>
                <Trans i18nKey="request_copy_new.faq_a_desc_03">
                  If you have received an adverse action letter due to a denial based on tenant screening results, the landlord is required to disclose the name of the screening company in the letter.
                </Trans>
              </p>

              <p className="text-white-op-70 pt-1 pb-5">
                <span className="font-bold">{ t("4. Communicate with the landlord or conduct research.") } </span><br/>
                <Trans i18nKey="request_copy_new.faq_a_desc_04">
                  Initiate direct communication with your landlord to inquire about the tenant screening services employed. Lastly, conduct independent research to identify the tenant screening companies associated with your landlord.
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

export default RequestCopyNew;