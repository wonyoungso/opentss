import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import tss_image from "../assets/tss_image.png";
import Figure_01 from "../components/Figure_01";
import EvictionRecordsCard from "../components/EvictionRecordsCard";
import CriminalRecordsCard from "../components/CriminalRecordsCard";
import how_tss_works_figure_01 from "../assets/how_tss_works_figure_01.png";
import figure_02_01 from "../assets/figure-02_01.png";
import figure_02_02 from "../assets/figure-02_02.png";
import figure_02_03 from "../assets/figure-02_03.png";
import figure_02_04 from "../assets/figure-02_04.png";
import figure_03_01 from "../assets/figure-03_01.png";
import figure_03_02 from "../assets/figure-03_02.png";
import figure_04_01 from "../assets/figure-04_01.png";
import figure_04_02 from "../assets/figure-04_02.png";
import figure_04_03 from "../assets/figure-04_03.png";
import figure_04_04 from "../assets/figure-04_04.png";
import figure_05_01 from "../assets/figure-05_01.png";
import figure_05_02 from "../assets/figure-05_02.png";
import figure_05_03 from "../assets/figure-05_03.png";
import figure_05_04 from "../assets/figure-05_04.png";
import figure_06 from "../assets/figure-06.png";
import figure_07 from "../assets/figure-07.png";
import figure_08 from "../assets/figure-08.png";
import figure_09 from "../assets/figure-09.png";
import figure_10_01 from "../assets/figure-10_01.png";
import figure_10_02 from "../assets/figure-10_02.png";
import figure_10_03 from "../assets/figure-10_03.png";
import figure_11_01 from "../assets/figure-11_01.png";
import figure_11_02 from "../assets/figure-11_02.png";
import figure_11_03 from "../assets/figure-11_03.png";
import figure_11_04 from "../assets/figure-11_04.png";
import { motion } from "framer-motion";
import _ from 'lodash';
import { Article, Favorite, SettingsPhone } from "@mui/icons-material";

const HowTSSWorks = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const companies = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
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
          </div>
        </div>
        <div className="flex justify-center my-3 lg:my-7">
          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.1 }}   className="flex justify-center items-center gap-2 my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/companies")} }>
            <Article fontSize="18" /> Tenant Screening Services Lookup
          </motion.button>
        </div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }}  className="text-4xl">
              <span className="font-bold">Tenant screening services</span> utilize criminal records, eviction records, and credit score databases to produce reports that landlords use to inform their decisions about who to rent to.
            </motion.p>

            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }}  transition={{
                duration: 0.25,
                delay: 0.5
              }} className="text-gray pt-7"> 
              Tenant screening services gather information on prospective tenants, primarily including credit scores, credit and eviction histories, and criminal records. Landlords frequently use these services to evaluate tenants and generate reports based on credit score databases, eviction and criminal records sourced from third-party data brokers. <span className="font-bold text-white">Some of these reports may provide a “risk score” for each tenant, determined by a proprietary algorithm that considers credit and eviction histories, criminal records, and other factors.</span> Despite concerns regarding high error rates and perpetuation of racial inequality stemming from the <a href="https://scholar.harvard.edu/files/mdesmond/files/desmond.evictionpoverty.ajs2012.pdf" className="underline" target="_blank">over-representation of Black and Latinx renters in eviction</a> and <a href="https://newjimcrow.com/" target="_blank" className="underline">incarceration records</a>, tenant screening services operate with minimal regulation. Landlords often rely solely on these reports to inform their decisions without fully comprehending their purpose or verifying their accuracy.
            </motion.p>
          </div>
        </div>
        
        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <motion.div viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }}  className="lg:w-1/2">
            <p className="text-4xl">
              Tenant screening practice should be understood as <span className="font-bold">landlords' decision-making</span> that are tightly coupled with <span className="font-bold">the data and algorithms provided by tenant screening services.</span>
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center py-10">
          <motion.div  className="w-auto lg:w-[349px] relative">
            <Figure_01 />
          </motion.div>
        </div>

        <div className="flex justify-center py-10">

          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }}  className="text-gray">
              The use of tenant screening services is widespread among landlords, and the decision-making process of landlords is closely linked to the data and algorithms provided by these services. Although there are no official statistics on the number of landlords who use tenant screening services, <a href="https://journals.sagepub.com/doi/full/10.1177/00031224211029618" className="underline" target="_blank">a study</a> showed that large-scale landlords tend to use algorithmic tenant screening products more frequently (60-70%) than small-scale landlords (40-50%). Additionally, <a href="https://newsroom.transunion.com/transunion-national-rental-survey-finds-large-property-managers-able-to-raise-rates-and-attract-reliable-tenants/" target="_blank" className="">a survey</a> of 1,252 respondents conducted by TransUnion revealed that 87% of landlords responded that they use tenant screening services. 
            </motion.p>
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.5
              }}  className="pt-5 text-gray">
              <span className="font-bold text-white">The information contained in tenant screening reports, including scores and recommendations, often has a significant impact on landlords’ decision-making processes.</span> The degree of influence varies depending on the types of data sources, how the data is represented, and the screening criteria that landlords had previously established before utilizing tenant screening services. It is essential to understand that tenant screening is not solely determined by tenant screening services or landlords; rather, it is a tightly interwoven interaction in which each data type influences differently.
            </motion.p>
          </div>
        </div>

        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }}  className="">
              Income Verification and<br/>
              Rent-to-income Ratio
            </motion.p>
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }}  className="text-4xl relative">
              <span className="font-bold">Rent-to-income ratio</span> could disproportionately affect low-income renters and housing voucher holders.
            </motion.p>

            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.4
              }}  className="pt-7 text-gray relative">
              Income verification is typically not included in the package of tenant screening reports, and only a few services, such as <a href="https://www.mysmartmove.com/SmartMove/income-insights.page" className="underline" target="_blank">TransUnion’s Income Insights</a>, offer this option. Consequently, many landlords and property management companies require documentation to verify tenants' income, such as pay stubs, tax documents, or bank statements. For project-based Section 8 properties, the USDA Rural Development Multifamily Housing program, or LIHTC properties, landlords of those properties have additional requirements for checking income levels due to guidelines. 
            </motion.p>
          </div>
        </div>

        <div className="flex justify-center">

          <motion.div transition={{ staggerChildren: 0.3}} className="flex flex-col pt-7">
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25
              }}  src={figure_02_01} alt="Figure 02 01" className="relative md:w-fit pb-0.5 md:left-16" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25
              }} src={figure_02_02} alt="Figure 02 02" className="relative md:w-fit pb-0.5 md:left-4" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25
              }}   src={figure_02_03} alt="Figure 02 03" className="relative md:w-fit pb-0.5 md:-left-3" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25
              }}   src={figure_02_04} alt="Figure 02 04" className="relative md:w-fit" />
          </motion.div>

        </div>

        <div className="flex justify-center pt-10">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }}  className="pt-7 text-gray relative">
              <span className="font-bold text-white">Many landlords calculate rent-to-income ratio for measuring the ability to pay.</span> The ratio is displayed as a percentage or proportion, typically 30% of rent or 2.5-3 times rent. However, this measure has become disrupted due to rent hikes, and many tenants have become “rent-burdened.” Ultimately, the rent-to-income ratio lacks evidence to support whether or not it is a good indicator of tenants who pay rent on time. It has never been empirically tested, and “the use of a minimum income requirement as a standard for designing public assistance programs is very different from using such a requirement for determining the likelihood a prospective tenant will pay rent.”
            </motion.p>
          </div>
        </div>

        <motion.div transition={{ staggerChildren: 0.3 }} className="flex pt-10 flex-col justify-center items-center">
          <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25
              }}  src={figure_03_01} alt="Figure 03 01" className="relative md:w-fit" />
          <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25
              }}  src={figure_03_02} alt="Figure 03 02" className="relative md:w-fit pt-1" />
          <motion.div viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25
              }}  className="text-white-op-50 md:w-1/2 leading-5 pt-2">
            (Top) Rent-to-net-income ratio specification of one landlord's tenant screening criteria; (Bottom) one tenant screening service specificing income to debt including rent.
          </motion.div>
        </motion.div>
        

        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.6
              }} className="text-gray">
              Furthermore, credit history may have a significant impact on housing voucher holders' ability to access housing. Credit reports include debt collections and loan accounts, and some reports provide monthly estimated payments. Landlords use this information to calculate the <span className="text-white font-bold">“rent-to-net-income ratio,”</span> in which net income is the difference between monthly income and monthly debt payments. This measurement is used as a threshold to determine if a tenant is eligible for housing. However, this calculation may disrupt the guarantees of the 30% rent-to-income ratio that Section 8 housing voucher holders rely on and disproportionately affect them more than middle or high-income households. Additionally, the amount of debt a tenant has will negatively influence their rent-to-net-income ratio, particularly for lower-income applicants. Landlords have discretion in what types of debts they include, with some including medical collections and student loans, while others do not. This lack of policy-level guidance puts housing voucher holders at risk and makes it necessary to provide specific rules regarding screening practices to ensure that these vulnerable populations have access to affordable housing.
            </motion.p>
          </div>
        </div>

        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }} className="">
              Credit Score and<br/>
              Credit History 
            </motion.p>
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.4
              }} className="text-4xl">
              Arbitrary <span className="font-bold">credit score criteria and the inclusion of credit history</span> in screening have become challenges faced by low-income renters.
            </motion.p>

            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.6
              }} className="pt-7 text-gray">
              <span className="text-white font-bold">Credit scores and histories have become a widely accepted measure of an individual's creditworthiness.</span> The credit information is provided by the three major credit bureaus: TransUnion, Experian, and Equifax. Credit reports are used to evaluate a consumer's payment history on credit-related products such as home mortgages, credit cards, and other debts that are typically paid over time, such as medical bills. While originally developed for bank loans and home mortgages, credit reports are now frequently used for tenant screening by landlords. These reports contain a comprehensive record of a consumer's credit history, including a credit score determined by the FICO system or a similar algorithm, such as VantageScore.
            </motion.p>
          </div>
        </div>

        <div className="flex justify-center pt-7">

          <div className="flex flex-col">
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }}  src={figure_04_01} alt="Figure 04 01" className="relative md:w-fit pb-0.5 md:left-15" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.4
              }} src={figure_04_02} alt="Figure 04 02" className="relative md:w-fit pb-0.5 md:left-4" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.5
              }} src={figure_04_03} alt="Figure 04 03" className="relative md:w-fit pb-0.5 md:-left-3" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.6
              }}  src={figure_04_04} alt="Figure 04 04" className="relative md:w-fit" />
          </div>

        </div>

        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }} className="text-gray">
              Landlords use varying and often arbitrary credit score criteria when selecting tenants, such as with some requiring minimum credit scores, such as 600, and conducting a case-by-case review for scores below 700. However, there is a lack of empirical studies measuring the relationship between credit score ranges and desirable renter characteristics, such as timely rent payments. Ironically, <span className="font-bold text-white">tenants with low credit scores may have incurred debt due to prioritizing rent payments over medical bills.</span> This, combined with the fact that major credit scores do not include rental payment history, has created significant barriers for low-income renters. 
            </motion.p>
          </div>
        </div>

        <div className="flex justify-center pt-7">

          <div className="flex flex-col">
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }}  src={figure_05_01} alt="Figure 05 01" className="relative md:w-fit pb-0.5 md:left-16" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.4
              }}  src={figure_05_02} alt="Figure 05 02" className="relative md:w-fit pb-0.5 md:left-4" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.5
              }}  src={figure_05_03} alt="Figure 05 03" className="relative md:w-fit pb-0.5 md:-left-3" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.6
              }}  src={figure_05_04} alt="Figure 05 04" className="relative md:w-fit" />
          </div>

        </div>

        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }} className="text-gray">
              Landlords also exercise sole discretion when considering different aspects of credit history, with some opting to exclude medical collections and student loans (or even take debts incurred in COVID-19 era into consideration) or focusing on debt collection items related to housing expenses, but many landlords just consider every debt collection item. <span className="font-bold text-white">Put differently, interpreting credit history is dependent on landlords’ goodwill when it comes to taking tenants’ financial hardship into consideration.</span>
            </motion.p>
          </div>
        </div>

        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }} className="">
              Eviction Records
            </motion.p>
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }} className="text-4xl">
              <span className="font-bold">Lack of clarity in eviction records</span> and <span className="font-bold">landlords' negative interpretation</span> of them pose challenges
            </motion.p>

            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }} className="pt-7 text-gray">
              Nearly all tenant screening services offer eviction records, but it is crucial to note that the presentation of these records can significantly impact their interpretation. To properly understand eviction records, the following critical data fields are needed. Here shows the eviction data fields of a few tenant screening services.
            </motion.p>
          </div>
        </div>


        <div className="flex justify-center pt-5">
          <div className="flex gap-2 lg:w-1/2">
            <EvictionRecordsCard sample={true} mode="dark" />
            <div>
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
          </div>
        </div>


        <div className="grid grid-cols-2 gap-2  md:grid-cols-4 lg:grid-cols-6 lg:gap-5 pt-5">
          {
            _.map(_.filter(companies, company => !_.isNull(company.eviction_data_fields)), (company, idx) => {
              return (
                <motion.div viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                  duration: 0.25,
                  delay: 0.3 + idx * 0.1
                }} key={company.id} className="py-5 lg:py-0 cursor-pointer" onClick={() => { navigate(`/companies/${company.id}`)}}>
                  <EvictionRecordsCard key={company.id} mode="dark" name={company.name} fields={company.eviction_data_fields} />
                </motion.div>
              )
            })
          }
        </div>

        <div className="flex justify-center my-3 lg:my-7">
          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.1 }}   className="my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm flex justify-center items-center gap-2 lg:text-lg" onClick={() => { navigate("/companies")} }>
            <Article fontSize="18" /> Tenant Screening Services Lookup
          </motion.button>
        </div>

        <motion.div viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                  duration: 0.25,
                  delay: 0.3
                }}  className="flex justify-center pt-7">

          <img src={figure_06} alt="Figure 06" className="relative md:w-fit" />

        </motion.div>

        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                  duration: 0.25,
                  delay: 0.3
                }}  className="text-gray">
              <span className="font-bold text-white">Many tenant screening reports do not include all the necessary details.</span> For example, this demonstrates how the <Link className="underline" to="/companies/13">National Tenant Network</Link> presents eviction records. While the report includes case numbers and the amount of the decision, it is unclear if this record is a judgment for possession. In other words, some of these records may have been decided in favor of the tenants, as the report itself warns. Additionally, the use of technical terms and abbreviations, such as “Pla,” without adequate explanation, combined with poor graphic design, can lead to misinterpretation. It is essential that tenant screening services provide clear and comprehensive information, using language that is easily understandable, and avoid creating confusion.
            </motion.p>
          </div>
        </div>


        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }}  className="">
              Criminal Records
            </motion.p>
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }} className="text-4xl">
              <span className="font-bold">Challenges in Interpreting Criminal Records</span>: Lack of Clarity and Potential Bias via Criminal Justice System
            </motion.p>

            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
              }} className="pt-7 text-gray">
              Like eviction records, there are also critical data fields to consider when it comes to interpreting criminal records.
            </motion.p>
          </div>
        </div>
        

        <div className="flex justify-center pt-5">
          <div className="flex gap-2 lg:w-1/2">
            <CriminalRecordsCard sample={true} mode="dark" />
            <div>
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2  md:grid-cols-4 lg:grid-cols-6 lg:gap-5 pt-5">
          {
            _.map(_.filter(companies, company => !_.isNull(company.criminal_data_fields)), (company, idx) => {
              return (
                <motion.div viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileHover={{opacity: 0.5}} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                  duration: 0.25,
                  delay: 0.3 + idx * 0.1
                }} key={company.id} className="py-5 lg:py-0 cursor-pointer" onClick={() => { navigate(`/companies/${company.id}`)}}>
                  <CriminalRecordsCard key={company.id} mode="dark" name={company.name} fields={company.criminal_data_fields} />
                </motion.div>
              )
            })
          }
        </div>


        <div className="flex justify-center my-3 lg:my-7">
          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.1 }}   className="my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm flex justify-center items-center gap-2 lg:text-lg" onClick={() => { navigate("/companies")} }>
            <Article fontSize="18" /> Tenant Screening Services Lookup
          </motion.button>
        </div>

        <div className="flex justify-center pt-7">

          <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
              }} src={figure_07} alt="Figure 07" className="relative md:w-fit" />

        </div>

        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
                }} className="text-gray">
              <span className="font-bold text-white">However, the use of criminal records in tenant screening reports also faces challenges due to legal jargon and potential omissions of data fields.</span> This would make it difficult for landlords to accurately interpret them. This can be attributed to overinclusive trends in tenant screening reports. For instance, these reports provides an example of a tenant screening report that includes a criminal record with missing information on final disposition and confusing abbreviations. This is concerning because it suggests that some tenant screening services may include incomplete or imperfect records, which could unfairly harm a tenant's chances of securing housing. 
            </motion.p>
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
                }} className="pt-5 text-gray">
              <span className="font-bold text-white">Relatedly, many tenant screening reports treat sequences of criminal justice procedures, such as arrest, charge, disposition, and sentencing, as a single event.</span> <Link to="/companies/6" className="underline">RealPage</Link>, a tenant screening company, uses “abbreviated” criminal records for 11,000 reports, which are less expensive to obtain than full records but do not include information about the resolution. However, accurately assessing a tenant’s criminal history requires consideration of each step in the criminal justice process, as they imply different consequences. For instance, in 2019, <a href="https://www.criminaljustice.ny.gov/crimnet/ojsa/dispositions-adult-arrest-demographics/2019/NYS.pdf" className="underline" target="_blank">only 18.9% of felony arrests in New York led to final felony convictions.</a> Given that it is crucial to include the final resolution of criminal justice procedures for appropriate evaluation, the use of such abbreviated data by tenant screening services is likely to lead to an incorrect model. Without this context, a tenant’s record could be inaccurately assessed.
            </motion.p>
          </div>
        </div>

        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
                }} className="text-4xl">
              <span className="font-bold">“Tenant Score”</span> allows tenant screening services to exert more power in landlord decision making.
            </motion.p>
          </div>
        </div>


        <div className="flex justify-center pt-8">

            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
              duration: 0.25,
              delay: 0.2
              }} src={figure_08} alt="Figure 08" className="relative md:w-fit" />

        </div>



        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
                }} className="text-gray">
              Our research, which drew on publicly available information, highlights the most widely used scoring and recommendation systems in the tenant screening market. these tenant screening services increasingly utilize algorithmic processes to determine “tenant score.” However, <span className="font-bold text-white">the majority of these algorithms are not publicly available, and the data used to calculate the score is often not exhaustive.</span> Even if they disclose the data types, it is generally brief and may not cover all factors that contribute to the score. For instance, SafeRent provides a very brief list of data that they use, such as payment performance and eviction history, while the National Tenant Network provides a relatively wider range of factors such as credit history, eviction history, and employment and residence length.
            </motion.p>
          </div>
        </div>
        

        <div className="flex justify-center pt-8">

            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
              duration: 0.25,
              delay: 0.2
              }}  src={figure_09} alt="Figure 09" className="relative md:w-fit" />

        </div>



        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
              duration: 0.25,
              delay: 0.2
              }} className="text-gray">
              <span className="text-white font-bold">These models for scoring and recommendations are often customizable by landlords.</span> An example is <Link to="/companies/7" className="underline">RentGrow</Link> offers a form for customization to their clients. This allows landlords to design which debt collections are included to calculate resident scores and which eviction and criminal cases are considered. RentGrow’s customization is very comprehensive, allowing landlords to establish rules for almost every data, including credits, eviction, and criminal records. Similarly, <Link to="/companies/13" className="underline">National Tenant Network</Link> offers a form for comprehensive customization with some default configuration and <Link to="/companies/43" className="underline">MRI Resident Screening</Link> also provides three predefined risk “tolerance” in the customization of the recommendation. When providing such customization, we assume that a significant portion of the inner algorithms are rule-based, and established by default values from tenant screening services, and then further customized by landlords. Therefore, we argue that regulators must scrutinize how tenant screening services establish default values for each rule and what influences the customized values that landlords enter for customization and what kind of reasoning they use.
            </motion.p> 
          </div>
        </div>


        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
              duration: 0.25,
              delay: 0.2
              }}  className="text-4xl">
              Predatory logics exploit low-Income renters through <span className="font-bold">imposing application fees and security deposits</span>
            </motion.p>
          </div>
        </div>


        <div className="flex flex-col items-center justify-center pt-8 gap-2 lg:flex-row lg:gap-5">

            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
              duration: 0.25,
              delay: 0.2
              }}  src={figure_10_01} alt="Figure 10 01" className="lg:object-none pb-5 lg:pb-0" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
              duration: 0.25,
              delay: 0.3
              }} src={figure_10_02} alt="Figure 10 02" className="lg:object-none pb-5 lg:pb-0"  />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
              duration: 0.25,
              delay: 0.4
              }} src={figure_10_03} alt="Figure 10 03" className="lg:object-none pb-5 lg:pb-0"  />

        </div>

        <div className="mt-7 lg:flex font-bold lg:justify-between lg:gap-2 border-y border-y-bright-blue py-1 lg:py-3 text-sm">
          <div className="lg:w-2/4">Company Name</div>
          <div className="lg:w-1/4">Fees</div>
          <div className="lg:w-1/4">Notes</div>
        </div>
        {
            _.map(companies, (company, idx) => {
              return (
              <motion.div viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2 + idx * 0.1
                }} key={company.id} onClick={() => { navigate(`/companies/${company.id}`)} } className="lg:flex lg:justify-between lg:gap-2 cursor-pointer hover:bg-white-op-10 border-b border-b-white-op-50 py-1 lg:py-3">
                <div className="text-md font-bold border-b border-b-white-op-30 py-1 lg:p-0 lg:border-none lg:w-2/4 text-sm overflow-clip overflow-ellipsis whitespace-nowrap">{ company.name }</div>
                <div className="border-b border-b-white-op-30  py-1 lg:p-0 lg:border-none lg:w-1/4 text-sm">
                  {
                    _.map(company.fees.fees, fee => {
                      return (
                        <React.Fragment key={fee.name}><span >{fee.name}: ${fee.amount}</span><br/></React.Fragment>
                      )
                    })
                  }
                </div>
                <div className="py-1 lg:p-0 lg:border-none lg:w-1/4 text-sm ">{ company.fees.notes } </div>
              </motion.div>
              )
            })
          }

        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
                }} className="text-gray">
              <span className="text-white font-bold">Landlords commonly request tenants to pay non-refundable application fees, with a substantial portion of these fees being attributed to tenant screening report fees.</span> These fees typically range from $10 to $55. Unfortunately, lower-income tenants with substandard credit scores and histories are required to pay these fees more often than higher-income tenants who have a greater likelihood of being accepted, because they are more likely to be denied housing. This results in an ironic situation where lower-income tenants are burdened with these fees despite being more financially mindful. It is noteworthy that many landlord interfaces provided by tenant screening services allow for fees to be imposed on applicants, and many tenant screening services advertise this feature.
            </motion.p>
          </div>
        </div>


        <div className="flex justify-center pt-7">

          <div className="flex flex-col">
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2 
                }}  src={figure_11_01} alt="Figure 11 01" className="relative md:w-fit pb-0.5 md:-left-5" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.3
                }}  src={figure_11_02} alt="Figure 11 02" className="relative md:w-fit pb-0.5 md:left-4" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.4 
                }}  src={figure_11_03} alt="Figure 11 03" className="relative md:w-fit pb-0.5 md:-left-3" />
            <motion.img viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.5 
                }}  src={figure_11_04} alt="Figure 11 04" className="relative md:w-fit" />
          </div>

        </div>



        <div className="flex justify-center pt-5">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
                }} className="text-gray">
              <span className="text-white font-bold">Similarly to applicants who did not meet the rent-to-income threshold or have substandard credit, another risk-based pricing mechanism, security deposits, raises concerns for low-income tenants.</span> These tenants, particularly those with housing vouchers, encounter significant challenges in securing housing due to the high cost of security deposits. Because vouchers do not cover security deposits, it is difficult for low-income tenants and voucher holders, who already have exceptionally low incomes and are at a higher risk of experiencing housing insecurity, such as rental debts and evictions. The use of algorithmic scoring may worsen this issue by justifying the imposition of higher security deposits on voucher holders, effectively denying them access to housing.
            </motion.p>
          </div>
        </div>

        
        <div className="h-20 lg:h-40"></div>

        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <motion.p viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{
                duration: 0.25,
                delay: 0.2
                }} className="text-4xl">
              Interested in looking more or contributing to the research? <span className="font-bold">Here are the next steps you can follow:</span>
            </motion.p>
          </div>
        </div>
        <div className="flex justify-center pt-5">

            <motion.div viewport={{ once: true }} initial={{ opacity: 0, translateY: 20 }} whileInView={{ opacity: 1, translateY: 0 }} className="flex flex-col justify-center gap-5">
              <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
                duration: 0.1
                }} className="flex justify-center items-center gap-2 my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/companies")} }>
                <Article fontSize="18" /> Tenant Screening Services Lookup
              </motion.button>

              <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
                duration: 0.1
                }} className="flex justify-center items-center gap-2 my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/request-copy")} }>
                <SettingsPhone fontSize="18" /> Request Copy of Tenant Screening Report
              </motion.button>
              <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
                duration: 0.1
                }} className="flex justify-center items-center gap-2  my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/request-copy")} }>
                <Favorite fontSize="18" /> Donate Tenant Screening Report
              </motion.button>
            </motion.div>

        </div>

        


      </div>
      <Footer bg="dark" />
    </>
  );
};

export default HowTSSWorks;