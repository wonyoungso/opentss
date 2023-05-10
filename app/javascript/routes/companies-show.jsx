import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData } from 'react-router-dom';
import Footer from "../components/Footer";
import { ArrowBack, Search } from "@mui/icons-material";
import ReportStats from "../components/ReportStats";
import ReportDataField from "../components/ReportDataField";
import _ from 'lodash';

const CompaniesShow = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const { company, descriptions } = useLoaderData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${company.name} :: Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening`;
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
    _.each(document.querySelectorAll(".trix-content a"), elem => {
      const node = document.createAttribute("target");
      node.value = "_blank";
      console.log(node);
      elem.attributes.setNamedItem(node);
    });
  }, []);

  const introductionDescriptions = _.filter(descriptions, desc => desc.subtitle === "Introduction")
  const otherDescriptions = _.filter(descriptions, desc => desc.subtitle != "Introduction")

  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-x-5 lg:gap-y-2">
          <div className="lg:col-span-6 border-b border-b-dark-blue">
            <button className="text-sm" onClick={() => { navigate("/companies"); }}><ArrowBack size="sm" /> Back</button>
            <div className="pb-2"></div>
          </div>
          <div className="lg:col-span-3 pb-10">
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
          <div className="text-right">
            {
              company.is_sample_report_avail ? 
              <span className="text-sm text-right">Sample report available</span> : 
              <span className="text-sm text-right text-gray">Sample report unavailable</span>
            }
          </div>

          <div className="text-right">
            {
              company.is_admin_interface_available ? 
              <span className="text-sm text-right">Admin interface available</span> : 
              <span className="text-sm text-right text-gray">Admin interface unavailable</span>

            }
          </div>


          <div className="text-right">
            <span className="text-sm"><span className="">{ company.submissions_cnt }</span> reports collected</span>
          </div>

        </div>

        {
          _.map(introductionDescriptions, description => {
            return (
              <div key={description.id} className="lg:grid lg:grid-cols-6 lg:gap-5 pb-10">
                <div className="text-sm">
                  { description.subtitle }
                </div>
                <div className="lg:col-span-4">
                  <h2 className="font-bold text-4xl">
                    { description.title}
                  </h2>

                  <div className="pt-5" dangerouslySetInnerHTML={{ __html: description.content }} />
                  
                </div>
              </div>
            );
          })
        }

        {
          company.report_statistic ? 
          <ReportStats report_statistic={company.report_statistic} /> : 
          null
        }
        
        
        {
          _.isNull(company.outsourcing_company) ?

          <ReportDataField company={company} />
          : 
          null
        }

        {
            _.map(otherDescriptions, description => {
              return (
                <div key={description.id} className="pt-10 lg:grid lg:grid-cols-6 lg:gap-5">
                  <div className="text-sm">
                    { description.subtitle }
                  </div>
                  <div className="lg:col-span-4">
                    <h2 className="font-bold text-4xl">
                      { description.title}
                    </h2>

                    <div className="pt-5" dangerouslySetInnerHTML={{ __html: description.content }} />
                    
                  </div>
                </div>
              );
            })
          }
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default CompaniesShow;