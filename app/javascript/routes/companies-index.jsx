import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData } from 'react-router-dom';
import Footer from "../components/Footer";
import { Search } from "@mui/icons-material";
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import _ from 'lodash';
import { Table } from "@mui/joy";

const ComapniesIndex = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { companies, sampled_companies } = useLoaderData();
  useEffect(() => {
    document.title = "Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  const onChangeAutocompleteHandler = (event, value) => {
    setSelectedCompany(value);
  }

  console.log(companies, sampled_companies);

  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            Lookup tool
          </div>
          <div className="lg:col-span-4">
            <h2 className="font-bold text-4xl">
              Tenant Screening<br/>
              Services Lookup Tool
            </h2>
            <div className="h-5"></div>   
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Autocomplete placeholder="Search" stardivecorator={<Search />} getOptionLabel={option => option.name} options={companies} value={selectedCompany} onChange={onChangeAutocompleteHandler} />
            </FormControl>

            <p className="my-2">
            These tools are updated based on the tenant screening report collection and sample reports they provided to their website. 
            </p>
            <div className="h-5"></div>            

            <h2 className="my-0 lg:my-2 font-bold text-xl text-dark-blue border-b border-b-dark-blue lg:border-none">
              List of companies
            </h2>
           
            <div className="hidden lg:flex lg:justify-between lg:gap-2 border-y border-y-dark-blue py-3">
              <div className="lg:w-2/5">Name</div>
              <div className="lg:w-1/5">Scoring<br/>System</div>
              <div className="lg:w-1/5">Data<br/>They Collect</div>
              <div className="lg:w-1/5">Report<br/>Collected</div>
            </div>
            
            {
              _.map(sampled_companies, company => {
                return (
                <div key={company.id} className="lg:flex lg:justify-between lg:gap-2 cursor-pointer hover:bg-white-op-10 border-b border-b-white-op-50 py-1" onClick={() => { navigate(`/companies/${company.id}`) }}>
                  <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-2/5 text-lg font-bold text-dark-blue">{ company.name }</div>
                  <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
                    { 
                      company.scoring_system ?
                      <span className="text-md font-bold text-dark-blue">{ company.scoring_system }</span> : <>No scoring system</>
                    }
                  </div>
                  <div className="border-b border-b-white-op-30 pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
                    { 
                      _.map(company.data_collection.split(","), data => {
                        return <>{data}<br/></>
                      })
                    }
                  </div>
                  <div className="pt-1 pb-2 lg:p-0 lg:border-none lg:w-1/5 text-white-op-70">
                    { 
                      company.is_sample_report_avail ?
                      <>Sample reports<br/>available</> : null
                    }
                    { 
                      company.is_sample_report_avail & company.submissions_cnt > 0 ?
                      <>; </> : null
                    }
                    {
                      company.submissions_cnt > 0 ?
                      <>{ company.submissions_cnt } Reported</> : null
                    }
                  </div>
                </div>
                )
              })
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