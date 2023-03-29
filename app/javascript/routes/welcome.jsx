import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { store } from "../providers/TSSProvider";
import arrow_right from "../assets/arrow_right.svg";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";

const Welcome = () => {

  const { windowWidth } = useContext(store);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-dark-blue-bg text-white";
  }, []);

  return (
    <>
      <Header bg="dark" />
      <Hero />

      <div className="container mx-auto px-5">
        <h2>
          OpenTSS: <br/>
          Countering Tenant<br/>
          Screening
        </h2>

        <div className="h-10"></div>
        <div className="cursor-pointer border border-x-0 transition-colors border-y-white-op-50 hover:bg-white-op-10">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5 lg:min-h-[100px] py-3 items-start" onClick={e => navigate('/how-tss-works')}>
            <div className="col-span-2 text-lg leading-6">
              Step 1. Get informed of how <span className="font-bold">tenant screening works</span>
            </div>
            <div className="col-span-2 text-white-op-50 pt-2 lg:pt-0 leading-5 lg:leading-6">
              Do you want to know how tenant screening works?
            </div>
            <div className="col-span-2 pt-3 lg:pt-1">
              <img src={arrow_right} alt="right arrow" className="lg:block lg:ml-auto" />
            </div>
          </div>
        </div>
        <div className="cursor-pointer border border-x-0 border-y-0 border-b transition-colors border-b-white-op-50 hover:bg-white-op-10">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5 lg:min-h-[100px] py-3 items-start" onClick={e => navigate('/request-copy')}>
            <div className="col-span-2 text-lg leading-6">
              Step 2. Request a copy of your<br/>
              <span className="font-bold">tenant screening report</span>
            </div>
            <div className="col-span-2 text-white-op-50 pt-2 lg:pt-0 leading-5 lg:leading-6">
              We will help you to easily ask for your copy.
            </div>
            <div className="col-span-2 pt-3 lg:pt-1">
              <img src={arrow_right} alt="right arrow" className="lg:block lg:ml-auto" />
            </div>
          </div>
        </div>
        <div className="cursor-pointer border border-x-0 border-y-0 border-b transition-colors border-b-white-op-50 hover:bg-white-op-10">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5 lg:min-h-[100px] py-3 items-start" onClick={e => navigate('/submissions/new')}>
            <div className="col-span-2 text-lg leading-6">
              Step 3. Donate your <span className="font-bold">tenant screening report</span> for research
            </div>
            <div className="col-span-2 text-white-op-50 pt-2 lg:pt-0 leading-5 lg:leading-6">
              Donate your report for auditing research. We will compensate $50 for your contribution.
            </div>
            <div className="col-span-2 pt-3 lg:pt-1">
              <img src={arrow_right} alt="right arrow" className="lg:block lg:ml-auto" />
            </div>
          </div>
        </div>
        <div className="h-5"></div>
        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-3 items-start">
          <div className="col-span-2 text-4xl">
            We are looking for tenants <span className="font-bold">who were screened by tenant screening reports.</span>
          </div>
          <div className="pt-5 lg:pt-0 col-span-2 text-white-op-50 leading-5 text-sm">
            <p className="mb-3">
              Tenant screening services utilize credit score databases, eviction records, and criminal records from third-party data brokers to produce reports that landlords use to inform their decisions about who to rent to. Many research and news articles have pointed out that tenant screening reports and their inner algorithm has the discriminatory and racialized impact, and there is no regulated structure for its algorithmic and modeling processes.
            </p>
            <p className="mb-3">
              However, tenant screening services and their inner algorithms and data collection processes are proprietary, it is only possible to audit them externally.
            </p>
            <p>
              By collecting these denied reports from tenants, this project hopes to better understand the patterns of denying tenants based on such algorithms and expose the discriminatory impact of employing tenant screening services.
            </p>
          </div>

          <div className="col-span-2 text-white-op-50 leading-5 text-sm">
            <p className="mb-3">
              Tenant screening services utilize credit score databases, eviction records, and criminal records from third-party data brokers to produce reports that landlords use to inform their decisions about who to rent to. Many research and news articles have pointed out that tenant screening reports and their inner algorithm has the discriminatory and racialized impact, and there is no regulated structure for its algorithmic and modeling processes.
            </p>
            <p className="mb-3">
              However, tenant screening services and their inner algorithms and data collection processes are proprietary, it is only possible to audit them externally.
            </p>
            <p>
              By collecting these denied reports from tenants, this project hopes to better understand the patterns of denying tenants based on such algorithms and expose the discriminatory impact of employing tenant screening services.
            </p>
          </div>

        </div>


      </div>
      <Footer bg="dark" />
    </>
  )
}

export default Welcome;