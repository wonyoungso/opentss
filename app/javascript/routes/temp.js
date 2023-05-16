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
import how_tss_works_figure_01 from "../assets/how_tss_works_figure_01.png";
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
              Tenant screening services gather information on prospective tenants, primarily including credit scores, credit and eviction histories, and criminal records. Landlords frequently use these services to evaluate tenants and generate reports based on credit score databases, eviction and criminal records sourced from third-party data brokers. These reports may provide a “risk score” for each tenant, determined by a proprietary algorithm that considers credit and eviction histories, criminal records, and other factors. Despite concerns regarding high error rates and perpetuation of racial inequality stemming from the over-representation of Black and Latinx renters in eviction and incarceration records, tenant screening services operate with minimal regulation. Landlords often rely solely on these reports to inform their decisions without fully comprehending their purpose or verifying their accuracy.
            </p>
          </div>

          <div className="lg:col-span-6 py-10"></div>
      
          <div className="lg:col-span-2 text-4xl font-bold">
            Tenant Screening Practice Should Be Understood as Landlords’ Decision-Making That Are Tightly Coupled with the Data and Algorithms by Tenant Screening Services.
          </div>
          <div className="pt-5 lg:pt-0 lg:col-span-4">
            <img src={diagram_01} alt="diagram_01" />
          </div>
          <div className="lg:col-span-2">
          </div>
          <div className="pt-5 lg:pt-0 lg:col-span-2">
            <p>
              The use of tenant screening services is widespread among landlords, and the decision-making process of landlords is closely linked to the data and algorithms provided by these services. Although there are no official statistics on the number of landlords who use tenant screening services, a small-scale survey showed that large-scale landlords tend to use algorithmic tenant screening products more frequently (60-70%) than small-scale landlords (40-50%). Additionally, a survey of 1,252 respondents conducted by TransUnion revealed that 87% of landlords responded that they use tenant screening services. The information contained in tenant screening reports, including scores and recommendations, often has a significant impact on landlords’ decision-making processes. The degree of influence varies depending on the types of data sources, how the data is represented, and the screening criteria that landlords had previously established before utilizing tenant screening services. It is essential to understand that tenant screening is not solely determined by tenant screening services or landlords; rather, it is a tightly interwoven interaction in which each data type influences differently.
            </p>

            <p className="pt-5">
              As landlords have increasingly turned to tenant screening services, they have begun to provide explicit screening criteria based on the types of data they can obtain, often presenting them to applicants before the application process. Large-scale landlords are able to rely on company guidance and use historical data based on experience to guide their assessments, while small-scale landlords generally start with basic or minimal screening standards and refine, tighten, relax, or modify those standards over time and through experience. Table 1 illustrates the common range or threshold for screening tenants based on the data that landlords can obtain from tenant screening reports. While the ranges may vary, the available data that can be obtained from tenant screening services is limited, resulting in standardized listings of screening criteria. When it comes to income verification and calculating the rent-to-income ratio, landlords typically collect more data than tenant screening services provide. In the application process, landlords often require applicants to provide a previous tax document, paystubs, or employment history to check the stability of income flows. 
            </p>
          </div>
          <div className="lg:col-span-2">
            
          </div>
          
        </div>


        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-20">

          <div className="lg:col-span-2 text-4xl font-bold">
            Income Verification and Rent-to-income ratio
          </div>
          <div className="lg:col-span-2">
           <p>
              Income verification is typically not included in the package of tenant screening reports, and only a few services, such as TransUnion’s Income Insights, offer this option. Consequently, many landlords and property management companies require documentation to verify tenants' income, such as pay stubs, tax documents, or bank statements. For project-based Section 8 properties, the USDA Rural Development Multifamily Housing program, or LIHTC properties, landlords of those properties have additional requirements for checking income levels due to guidelines. The golden rule for many landlords in terms of income is the rent-to-income ratio, which is often displayed as a percentage or proportion, typically 30% of rent or 2.5-3 times rent. However, this measure has become disrupted due to rent hikes, and many tenants have become “rent-burdened.” Ultimately, the rent-to-income ratio lacks evidence to support whether or not it is a good indicator of tenants who pay rent on time. It has never been empirically tested, and “the use of a minimum income requirement as a standard for designing public assistance programs is very different from using such a requirement for determining the likelihood a prospective tenant will pay rent.
            </p>

          </div>
          <div className="lg:col-span-2">

          </div>
          <div className="lg:col-span-2">
            
          </div>
          <div className="lg:col-span-4">

            <img src={how_tss_works_figure_01} alt="rent-to-net-income ratio description" />
          </div>

          <div className="lg:col-span-2">

          </div>
          <div className="lg:col-span-2">
            <p>
              Furthermore, credit history may have a significant impact on housing voucher holders' ability to access housing. Credit reports include debt collections and loan accounts, and some reports provide monthly estimated payments. Landlords use this information to calculate the “rent-to-net-income ratio,” (as shown in Figure 1) in which net income is the difference between monthly income and monthly debt payments. This measurement is used as a threshold to determine if a tenant is eligible for housing. However, this calculation may disrupt the guarantees of the 30% rent-to-income ratio that Section 8 housing voucher holders rely on and disproportionately affect them more than middle or high-income households. Additionally, the amount of debt a tenant has will negatively influence their rent-to-net-income ratio, particularly for lower-income applicants. Landlords have discretion in what types of debts they include, with some including medical collections and student loans, while others do not. This lack of policy-level guidance puts housing voucher holders at risk and makes it necessary to provide specific rules regarding screening practices to ensure that these vulnerable populations have access to affordable housing.
            </p>
          </div>
        </div>


        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-20">

          <div className="lg:col-span-2 text-4xl font-bold">
            Credit Score and History
          </div>
          <div className="lg:col-span-2">
           <p>
              Income verification is typically not included in the package of tenant screening reports, and only a few services, such as TransUnion’s Income Insights, offer this option. Consequently, many landlords and property management companies require documentation to verify tenants' income, such as pay stubs, tax documents, or bank statements. For project-based Section 8 properties, the USDA Rural Development Multifamily Housing program, or LIHTC properties, landlords of those properties have additional requirements for checking income levels due to guidelines. The golden rule for many landlords in terms of income is the rent-to-income ratio, which is often displayed as a percentage or proportion, typically 30% of rent or 2.5-3 times rent. However, this measure has become disrupted due to rent hikes, and many tenants have become “rent-burdened.” Ultimately, the rent-to-income ratio lacks evidence to support whether or not it is a good indicator of tenants who pay rent on time. It has never been empirically tested, and “the use of a minimum income requirement as a standard for designing public assistance programs is very different from using such a requirement for determining the likelihood a prospective tenant will pay rent.
            </p>

          </div>
          <div className="lg:col-span-2">

          </div>
          <div className="lg:col-span-2">
            
          </div>
          <div className="lg:col-span-4">

            <img src={how_tss_works_figure_01} alt="rent-to-net-income ratio description" />
          </div>

          <div className="lg:col-span-2">

          </div>
          <div className="lg:col-span-2">
            <p>
              Furthermore, credit history may have a significant impact on housing voucher holders' ability to access housing. Credit reports include debt collections and loan accounts, and some reports provide monthly estimated payments. Landlords use this information to calculate the “rent-to-net-income ratio,” (as shown in Figure 1) in which net income is the difference between monthly income and monthly debt payments. This measurement is used as a threshold to determine if a tenant is eligible for housing. However, this calculation may disrupt the guarantees of the 30% rent-to-income ratio that Section 8 housing voucher holders rely on and disproportionately affect them more than middle or high-income households. Additionally, the amount of debt a tenant has will negatively influence their rent-to-net-income ratio, particularly for lower-income applicants. Landlords have discretion in what types of debts they include, with some including medical collections and student loans, while others do not. This lack of policy-level guidance puts housing voucher holders at risk and makes it necessary to provide specific rules regarding screening practices to ensure that these vulnerable populations have access to affordable housing.
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