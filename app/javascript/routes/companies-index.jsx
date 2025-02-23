import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData, useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import { Search } from "@mui/icons-material";
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import _ from 'lodash';
import { Table } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation, Trans } from "react-i18next";

const ComapniesIndex = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  let { locale } = useParams();
  const { t } = useTranslation();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { companies, sampled_companies } = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  const onChangeAutocompleteHandler = (event, value) => {
    setSelectedCompany(value);
  }

  const renderSampledCompanies = () => {

    return (   
        _.map(sampled_companies, sampled_company => {
          // console.log(sampled_company);
          return (
            <div key={sampled_company.id} className="lg:flex lg:justify-between lg:gap-2 cursor-pointer hover:bg-white-op-10 border-b border-b-white-op-50 py-1 transition-colors" onClick={() => { navigate(`/${locale}/companies/${sampled_company.id}`) }}>
              <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-2/5 text-lg font-bold text-dark-blue">{ sampled_company.name }</div>
              <div className="text-sm border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
                { 
                  sampled_company.scoring_system ?
                  <span className="text-sm font-bold text-dark-blue">{ sampled_company.scoring_system }</span> : <CloseIcon />
                }
              </div>
              <div className="text-sm border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
                { 
                  _.isNull(sampled_company.data_collection) ? 
                  <CloseIcon />
                  :
                  _.map(sampled_company.data_collection.split(","), data => {
                    return <Fragment key={data}>{data}<br/></Fragment>
                  })
                }
              </div>
              <div className="text-sm pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
                { 
                  sampled_company.is_sample_report_avail ?
                  <>Sample reports<br/>available</> : null
                }
                { 
                  sampled_company.is_sample_report_avail & sampled_company.submissions_cnt > 0 ?
                  <>; </> : null
                }
                {
                  sampled_company.submissions_cnt > 0 ?
                  <>{ sampled_company.submissions_cnt } Reported</> : null
                }
              </div>
            </div>
          )
        })
    );
  }

  const renderFilteredCompanies = () => {
     
    return (
      <>
        <div className="lg:flex lg:justify-between lg:gap-2 cursor-pointer hover:bg-white-op-10 border-b border-b-white-op-50 py-1 transition-colors" onClick={() => { navigate(`/${locale}/companies/${selectedCompany.id}`) }}>
          <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-2/5 text-lg font-bold text-dark-blue">{ selectedCompany.name }</div>
          <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
            { 
              selectedCompany.scoring_system ?
              <span className="text-sm font-bold text-dark-blue">{ selectedCompany.scoring_system }</span> : <CloseIcon />
            }
          </div>
          <div className="text-sm border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
            { 
              _.isNull(selectedCompany.data_collection) ? 
              <CloseIcon />
              :
              _.map(selectedCompany.data_collection.split(","), data => {
                return <Fragment key={data}>{data}<br/></Fragment>
              })
            }
          </div>
          <div className="text-sm pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
            { 
              selectedCompany.is_sample_report_avail ?
              <>Sample reports<br/>available</> : null
            }
            { 
              selectedCompany.is_sample_report_avail & selectedCompany.submissions_cnt > 0 ?
              <>; </> : null
            }
            {
              selectedCompany.submissions_cnt > 0 ?
              <>{ selectedCompany.submissions_cnt } Reported</> : null
            }
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            { t("Lookup tool") }
          </div>
          <div className="lg:col-span-4">
            <h2 className="font-bold text-4xl">
              { t("Tenant Screening Services Lookup Tool")}
            </h2>
            <div className="h-5"></div>   
            <FormControl>
              <FormLabel>{ t("Search") }</FormLabel>
              <Autocomplete placeholder={ t("Search") } stardivecorator={<Search />} getOptionLabel={option => option.name} options={companies} value={selectedCompany} onChange={onChangeAutocompleteHandler} />
            </FormControl>

            <p className="my-2">
              { t("These tools are updated based on the tenant screening report collection and sample reports they provided to their website.") }
            </p>
            <div className="h-5"></div>            

            <h2 className="my-0 lg:my-2 font-bold text-xl text-dark-blue border-b border-b-dark-blue lg:border-none">
              { t("List of companies") }
            </h2>
           
            <div className="hidden lg:flex lg:justify-between lg:gap-2 border-y border-y-dark-blue py-3 text-sm">
              <div className="lg:w-2/5">{ t("Name") }</div>
              <div className="lg:w-1/5"><Trans i18nKey="scoring_system">Scoring<br/>System</Trans></div>
              <div className="lg:w-1/5"><Trans i18nKey="data_collect">Data<br/>They Collect</Trans></div>
              <div className="lg:w-1/5"><Trans i18nKey="report_collected">Report<br/>Collected</Trans></div>
            </div>
            
            {
              selectedCompany ? 
              renderFilteredCompanies() : 
              renderSampledCompanies()
            }
          </div>
          <div className="lg:col-span-1"></div>
        </div>
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default ComapniesIndex;