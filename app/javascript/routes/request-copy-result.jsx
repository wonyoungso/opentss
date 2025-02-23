import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData, useSearchParams} from 'react-router-dom';
import Footer from "../components/Footer";
import Autocomplete from '@mui/joy/Autocomplete';
import FormLabel from '@mui/joy/FormLabel';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import PDFFillingForm from "../components/PDFFillingForm";
import { Button } from "@mui/joy";
import _ from 'lodash';
import {  } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";

const RequestCopyResult = () => {

  const { setMenuOpen } = useContext(store);
  const { company, descriptions, outsourcing_companies, outsourcing_company_descriptions } = useLoaderData();
  const [queryParams, setQueryParams] = useSearchParams();
  let { locale } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);

    _.each(document.querySelectorAll(".trix-content a"), elem => {
      const node = document.createAttribute("target");
      node.value = "_blank";
      console.log(node);
      elem.attributes.setNamedItem(node);
    });
  }, []);

  let finalCompanies, finalCompanyDescriptions;

  if (outsourcing_companies.length === 0){
    finalCompanies = [company];
    finalCompanyDescriptions = descriptions;
  } else {
    finalCompanies = outsourcing_companies;
    finalCompanyDescriptions = _.flatten(outsourcing_company_descriptions);
  }
  // queryParams.get("sixty_days")



  const renderComponent = () => {
    return (
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
         
            
          <div>
            { company.name } <br/>
            { t("Request your report") }
          </div>
          <div className="lg:col-span-3">
            


            {
              outsourcing_companies.length === 0 ?
              <h2 className="font-bold text-4xl">
                {
                  company.is_accept_letter ? 
                  <Trans i18nKey="request_copy_result.direct_accept_title" values={{ company_name: company.name }}>
                    {company.name} directly accepts the request of your copy of tenant screening report.
                  </Trans> :
                  <Trans i18nKey="request_copy_result.compose_letter_title" values={{ company_name: company.name }}>
                    We will help you generate the letter to request your copy of tenant screening report, so you can send it to { company.name }.
                  </Trans>
                }
              </h2> :
              <>
                <h2 className="font-bold text-4xl">
                  <Trans i18nKey="request_copy_result.outsource_title" values={{ company_name: company.name }}>
                    {company.name} orders tenant screening reports from
                  </Trans>
                  
                  &nbsp;
                  {
                    _.map(outsourcing_companies, (oc, idx) => {
                      return <>{oc.name} {
                          idx < (outsourcing_companies.length - 1) ?
                          <>, </>
                          :
                          <></>
                        }</>
                    })
                  }.&nbsp;
                </h2>
                <div className="pt-2 font-bold">
                  {
                    _.map(outsourcing_companies, oc => {
                      if (oc.is_accept_letter) {
                        return (
                          <Trans i18nKey="request_copy_result.direct_accept_title" values={{ company_name: oc.name }}>
                            {oc.name} directly accepts the request of your copy of tenant screening report.
                          </Trans>
                        )
                      } else {
                        return (
                          <Trans i18nKey="request_copy_result.compose_letter_title" values={{ company_name: oc.name }}>
                            We will help you generate the letter to request your copy of tenant screening report, so you can send it to { oc.name }.
                          </Trans>
                        )
                      }
                    })
                  }
                </div>
              </>
              
            } 
            
            {
              _.map(finalCompanies, finalCompany => {
                if (finalCompany.id === 6) {
                  return renderOnSiteRenderForm();
                } else {
                  return (
                    <>
                      {
                        finalCompany.is_accept_letter ?
                        <>
                          <div className="h-5"></div>
                          <FormControl>
                            <Button onClick={() => {   window.open(finalCompany.request_copy_url, '_blank'); }}>
                            
                              {finalCompany.name} {t("Inquiry Page")}
                            </Button>
                          </FormControl>
                        </>:
                        <>
                          <PDFFillingForm company={finalCompany} />
                        </>
                      }
                    </>
                  );
                }
                
              })
            }
          </div>
        </div>
        {
            _.map(finalCompanyDescriptions, description => {

              const sixty_days = queryParams.get("sixty_days");

              if (description.company_id === 6) {
                if (sixty_days !== "t") {
                  if (description.subtitle === "Next Step (More than 60 days)") {
                    return null;
                  }
                } else {
                  if (description.subtitle === "Next Step (Less than 60 days)") {
                    return null;
                  }
                }
                
              }

              return (
                <div key={description.id} className="pt-10 lg:grid lg:grid-cols-6 lg:gap-5">
                  <div>
                    { t(description.subtitle) }
                    {
                        finalCompanies.length > 1 ? <>&nbsp;({description.company_name})</> : null
                      }
                  </div>
                  <div className="lg:col-span-4">
                    <h2 className="font-bold text-4xl">
                      { t(description.title) }
                    
                    </h2>

                    <div className="pt-5" dangerouslySetInnerHTML={{ __html: description.content }} />
                    
                  </div>
                </div>
              );
              
            })
          }
      </div>
    )
  }

  const renderOnSiteRenderForm = () => {
    const sixty_days = queryParams.get("sixty_days");
    return (
      <>
        {
          _.map(finalCompanies, finalCompany => {
            return (
              <>
                {
                  sixty_days !== "t" ?
                  <>
                    <div className="h-5"></div>
                    <FormControl>
                      <Button onClick={() => {   window.open(finalCompany.request_copy_url, '_blank'); }}>{finalCompany.name} { t("Inquiry Page") }</Button>
                    </FormControl>
                  </>:
                  <>
                    <PDFFillingForm company={finalCompany} />
                  </>
                }
              </>
            )
          })
        }
      </>
    )
  }


  return (
    <>
      <Header bg="bright" />

      {
        renderComponent()
      }
      
      
      <Footer bg="bright" />
    </>
  );
};

export default RequestCopyResult;