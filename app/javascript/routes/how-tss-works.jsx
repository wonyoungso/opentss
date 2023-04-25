import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import tss_image from "../assets/tss_image.png";
import diagram_01 from "../assets/diagram_01.svg";
import EvictionRecordsCard from "../components/EvictionRecordsCard";
import CriminalRecordsCard from "../components/CriminalRecordsCard";
import _ from 'lodash';

const HowTSSWorks = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const companies = useLoaderData();

  useEffect(() => {
    document.title = "How Tenant Screening Service Works | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-dark-blue-bg text-white";
    setMenuOpen(false);
  }, []);
  

  return (
    <>
      <Header bg="dark" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div className="lg:col-span-6">
            How tenant screening<br/>
            works
          </div>
          <div className="lg:col-span-6">
            <div className="flex items-center">
              <img src={tss_image} alt="Tenant screening reports." />
            </div>


            <div className="flex justify-center my-7">
              <button className="border border-white py-2 px-10 rounded-md font-bold text-lg" onClick={() => { navigate("/companies")} }>
                Check Tenant Screening Services Lookup tool
              </button>
            </div>
            
          </div>
          <div className="lg:col-span-2 text-4xl">
            <span className="font-bold">Tenant screening services</span> utilize criminal records, eviction records, and credit score databases to produce reports that landlords use to inform their decisions about who to rent to.
          </div>
          <div className="lg:col-span-4">
          </div>
          <div className="lg:col-span-2">
          </div>
          <div className="pt-5 lg:pt-0 lg:col-span-4">
            <p>
              However, little is known about how landlords assess the information presented by tenant screening reports. Through a behavioral experiment with landlords using simulated tenant screening reports, this study shows that landlords use blanket screening policies, that they conflate the existence of tenant records with outcomes (e.g., eviction filings with executed evictions), and that they display, on average, tendencies toward automation bias that are influenced by the risk assessments and scores presented by tenant screening reports. I argue that maintaining blanket screening policies and automation bias, combined with the downstream effects of creating and using racially biased eviction and criminal records, means that people of color will inevitably experience disproportionate exclusion from rental housing due to perceived “risk” on the part of landlords.
            </p>
          </div>

          <div className="lg:col-span-6 py-10"></div>
          <div className="lg:col-span-2 text-4xl font-bold">
            It is a four billion<br/>
            industry.
          </div>
          <div className="lg:col-span-4">
          </div>
          <div className="lg:col-span-2">
          </div>
          <div className="pt-5 lg:pt-0 lg:col-span-2">
            <p>
              However, little is known about how landlords assess the information presented by tenant screening reports. Through a behavioral experiment with landlords using simulated tenant screening reports, this study shows that landlords use blanket screening policies, that they conflate the existence of tenant records with outcomes (e.g., eviction filings with executed evictions), and that they display, on average, tendencies toward automation bias that are influenced by the risk assessments and scores presented by tenant screening reports. I argue that maintaining blanket screening policies and automation bias, combined with the downstream effects of creating and using racially biased eviction and criminal records, means that people of color will inevitably experience disproportionate exclusion from rental housing due to perceived “risk” on the part of landlords.
            </p>
          </div>
          <div className="lg:col-span-2">
            <p>
              However, little is known about how landlords assess the information presented by tenant screening reports. Through a behavioral experiment with landlords using simulated tenant screening reports, this study shows that landlords use blanket screening policies, that they conflate the existence of tenant records with outcomes (e.g., eviction filings with executed evictions), and that they display, on average, tendencies toward automation bias that are influenced by the risk assessments and scores presented by tenant screening reports. I argue that maintaining blanket screening policies and automation bias, combined with the downstream effects of creating and using racially biased eviction and criminal records, means that people of color will inevitably experience disproportionate exclusion from rental housing due to perceived “risk” on the part of landlords.
            </p>
          </div>

          <div className="lg:col-span-6 py-10"></div>

          <div className="lg:col-span-2 text-4xl font-bold">
            Tenant screening services influence landlords’ final decision making
          </div>
          <div className="pt-5 lg:pt-0 lg:col-span-4">
            <img src={diagram_01} alt="diagram_01" />
          </div>
          <div className="lg:col-span-2">
          </div>
          <div className="pt-5 lg:pt-0 lg:col-span-2">
            <p>
              However, little is known about how landlords assess the information presented by tenant screening reports. Through a behavioral experiment with landlords using simulated tenant screening reports, this study shows that landlords use blanket screening policies, that they conflate the existence of tenant records with outcomes (e.g., eviction filings with executed evictions), and that they display, on average, tendencies toward automation bias that are influenced by the risk assessments and scores presented by tenant screening reports. I argue that maintaining blanket screening policies and automation bias, combined with the downstream effects of creating and using racially biased eviction and criminal records, means that people of color will inevitably experience disproportionate exclusion from rental housing due to perceived “risk” on the part of landlords.
            </p>
          </div>
          <div className="lg:col-span-2">
            <p>
              However, little is known about how landlords assess the information presented by tenant screening reports. Through a behavioral experiment with landlords using simulated tenant screening reports, this study shows that landlords use blanket screening policies, that they conflate the existence of tenant records with outcomes (e.g., eviction filings with executed evictions), and that they display, on average, tendencies toward automation bias that are influenced by the risk assessments and scores presented by tenant screening reports. I argue that maintaining blanket screening policies and automation bias, combined with the downstream effects of creating and using racially biased eviction and criminal records, means that people of color will inevitably experience disproportionate exclusion from rental housing due to perceived “risk” on the part of landlords.
            </p>
          </div>
          
        </div>
        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-20">

          <div className="lg:col-span-2 text-4xl font-bold">
            Eviction Data Field
            in Tenant Screening Reports
          </div>
          <div className="lg:col-span-4">
            

          </div>
          <div className="py-5 lg:py-0">
            <EvictionRecordsCard sample={true} mode="dark" />
          </div>
          <div className="py-5 lg:py-0">
            <div className="bg-very-dark-blue rounded-md p-3 text-sm" style={{maxWidth: 220}}>
              <div className="flex items-center">
                <div className="bg-yellow px-1 py-0.25 mx-1 text-very-dark-blue">
                  A
                </div>
                <div className="mx-1">
                  Critical Data Field 
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray px-1 py-0.25 mx-1">
                  A
                </div>
                <div className="mx-1">
                  Missing Data Field
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-yellow text-gray relative px-1 py-0.25 mx-1">
                  A
                  <div className="w-full left-0 border-b-2 border-b-red absolute" style={{top: "calc(50% - 1px)"}}></div>
                </div>
                <div className="mx-1">
                Missing Critical Data Field 
                </div>
              </div>
            </div>
            
          </div>

          <div className="lg:col-span-2">
            Critical data field is important because it affects the process of interpretation. combined with the downstream effects of creating and using racially biased eviction and criminal records, means that people of color will inevitably experience disproportionate exclusion from rental housing due to perceived “risk” on the part of landlords.
          </div>

          <div className="lg:col-span-2">
            
          </div>

          <div className="pt-5 lg:pt-0 lg:col-span-6">
          </div>

          {
            _.map(companies, company => {
              return (
                <div key={company.id} className="py-5 lg:py-0 cursor-pointer hover:opacity-50 transition-opacity" onClick={() => { navigate(`/companies/${company.id}`)}}>
                  <EvictionRecordsCard key={company.id} mode="dark" name={company.name} fields={company.eviction_data_fields} />
                </div>
              )
            })
          }
        </div>


        <div className="flex justify-center my-7">
          <button className="border border-white py-2 px-10 rounded-md font-bold text-lg" onClick={() => { navigate("/companies")} }>
            Check Tenant Screening Services Lookup tool
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-20">

          <div className="py-5 lg:py-0 lg:col-span-2 text-4xl font-bold">
            Criminal Data Field
            in Tenant Screening Reports
          </div>
          <div className="lg:col-span-4">
            

          </div>
          <div className="py-5 lg:py-0">
            <CriminalRecordsCard sample={true} mode="dark" />
          </div>
          <div className="py-5 lg:py-0">
            <div className="bg-very-dark-blue rounded-md p-3 text-sm" style={{maxWidth: 220}}>
              <div className="flex items-center">
                <div className="bg-yellow px-1 py-0.25 mx-1 text-very-dark-blue">
                  A
                </div>
                <div className="mx-1">
                  Critical Data Field 
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray px-1 py-0.25 mx-1">
                  A
                </div>
                <div className="mx-1">
                  Missing Data Field
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-yellow text-gray relative px-1 py-0.25 mx-1">
                  A
                  <div className="w-full left-0 border-b-2 border-b-red absolute" style={{top: "calc(50% - 1px)"}}></div>
                </div>
                <div className="mx-1">
                Missing Critical Data Field 
                </div>
              </div>
            </div>
            
          </div>

          <div className="lg:col-span-2">
            Critical data field is important because it affects the process of interpretation. combined with the downstream effects of creating and using racially biased eviction and criminal records, means that people of color will inevitably experience disproportionate exclusion from rental housing due to perceived “risk” on the part of landlords.
          </div>

          <div className="lg:col-span-2">
            
          </div>

          <div className="pt-5 lg:pt-0 lg:col-span-6">
          </div>

          {
            _.map(companies, company => {
              return (
                <div key={company.id} className="py-5 lg:py-0 cursor-pointer hover:opacity-50 transition-opacity" onClick={() => { navigate(`/companies/${company.id}`)}}>
                  <CriminalRecordsCard key={company.id} mode="dark" name={company.name} fields={company.criminal_data_fields} />
                </div>
              )
            })
          }
        </div>

        <div className="flex justify-center my-7">
          <button className="border border-white py-2 px-10 rounded-md font-bold text-lg" onClick={() => { navigate("/companies")} }>
            Check Tenant Screening Services Lookup tool
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-20">

          <div className="lg:col-span-2 text-4xl font-bold">
            Landlords impose tenant screening fees upon tenants
          </div>
          <div className="lg:col-span-2">
            
          </div>
          <div className="lg:col-span-2">

          </div>

          <div className="lg:col-span-2">

          </div>

          
          <div className="py-1 lg:p-0 lg:col-span-4">
            <div className="pb-3">
              Here are the breakdown of the fees of tenant screening services.
            </div>

            <div className="lg:flex font-bold lg:justify-between lg:gap-2 border-y border-y-bright-blue py-1 lg:py-3 text-sm">
              <div className="lg:w-2/4">Company Name</div>
              <div className="lg:w-1/4">Fees</div>
              <div className="lg:w-1/4">Notes</div>
            </div>
            {
                _.map(companies, company => {
                  return (
                  <div key={company.id} onClick={() => { navigate(`/companies/${company.id}`)} } className="lg:flex lg:justify-between lg:gap-2 cursor-pointer hover:bg-white-op-10 border-b border-b-white-op-50 py-1 lg:py-3">
                    <div className="text-md font-bold border-b border-b-white-op-30 py-1 lg:p-0 lg:border-none lg:w-2/4 text-sm overflow-clip overflow-ellipsis whitespace-nowrap">{ company.name }</div>
                    <div className="border-b border-b-white-op-30  py-1 lg:p-0 lg:border-none lg:w-1/4 text-sm">
                      {
                        _.map(company.fees.fees, fee => {
                          return (
                            <span key={fee.name}>{fee.name}: ${fee.amount}</span>
                          )
                        })
                      }
                    </div>
                    <div className="py-1 lg:p-0 lg:border-none lg:w-1/4 text-sm ">{ company.fees.notes } </div>
                  </div>
                  )
                })
              }
            
          </div>

          

        </div>

        <div className="flex justify-center my-7">
          <button className="border border-white py-2 px-10 rounded-md font-bold text-lg" onClick={() => { navigate("/companies")} }>
            Check Tenant Screening Services Lookup tool
          </button>
        </div>

      </div>
      <Footer bg="dark" />
    </>
  );
};

export default HowTSSWorks;