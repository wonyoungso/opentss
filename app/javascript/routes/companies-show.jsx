import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData } from 'react-router-dom';
import Footer from "../components/Footer";
import { ArrowBack, Search } from "@mui/icons-material";
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import _ from 'lodash';
import { Table } from "@mui/joy";

const CompaniesShow = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const company = useLoaderData();
  
  useEffect(() => {
    document.title = `${company.name} :: Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening`;
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-x-5 lg:gap-y-2">
          <div className="lg:col-span-6 border-b border-b-dark-blue">
            <button className="text-sm" onClick={() => { navigate("/companies"); }}><ArrowBack size="sm" /> Back</button>
            <div className="pb-2"></div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              { company.name }
            </h2>
            {
              company.resellers.length > 0 ?
              <div className="text-white-op-70 text-sm">
                resells reports to <> </>
                {
                  _.map(company.resellers, reseller => {
                    return <Fragment key={reseller.id}><Link className="underline" to={`/companies/${reseller.id}`}>{reseller.name}</Link>, </Fragment>
                  })
                }
              </div> : null
            }
            {
              company.outsourcing_company ?
              <div className="text-white-op-70 text-sm">
                obtains reports from <> </>
                {
                  <Link className="underline" to={`/companies/${company.outsourcing_company.id}`}>{company.outsourcing_company.name}</Link>
                }
              </div> : null
            }
            
          </div>
        </div>
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default CompaniesShow;