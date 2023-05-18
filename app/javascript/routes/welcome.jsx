import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { store } from "../providers/TSSProvider";
import arrow_right from "../assets/arrow_right.svg";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import { Article, Favorite, SettingsPhone } from "@mui/icons-material";
import { motion } from "framer-motion";

const Welcome = () => {

  const { setMenuOpen, setSubmissionStep } = useContext(store);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-dark-blue-bg text-white";
    setSubmissionStep(1); 
    setMenuOpen(false);
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
        <motion.div viewport={{ once: true }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{
          duration: 0.25,
          delay: 0.2
        }} className="cursor-pointer border border-x-0 transition-colors border-y-white-op-50 hover:bg-white-op-10">
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
        </motion.div>
        <motion.div viewport={{ once: true }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{
          duration: 0.25,
          delay: 0.3
        }} className="cursor-pointer border border-x-0 border-y-0 border-b transition-colors border-b-white-op-50 hover:bg-white-op-10">
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
        </motion.div>
        <motion.div viewport={{ once: true }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{
          duration: 0.25,
          delay: 0.4
        }} className="cursor-pointer border border-x-0 border-y-0 border-b transition-colors border-b-white-op-50 hover:bg-white-op-10">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5 lg:min-h-[100px] py-3 items-start" onClick={e => navigate('/submissions/new')}>
            <div className="col-span-2 text-lg leading-6">
              Step 3. Donate your <span className="font-bold">tenant screening report</span> for research
            </div>
            <div className="col-span-2 text-white-op-50 pt-2 lg:pt-0 leading-5 lg:leading-6">
              Donate your report for our research. We will compensate $50 for your contribution.
            </div>
            <div className="col-span-2 pt-3 lg:pt-1">
              <img src={arrow_right} alt="right arrow" className="lg:block lg:ml-auto" />
            </div>
          </div>
        </motion.div>
        <div className="h-5"></div>
        <motion.div viewport={{ once: true }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{
          staggerChildren: 0.5
        }} className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="">
            About
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="col-span-4 text-4xl">
            <span className="font-bold">We are collecting tenant screening reports</span> to reveal the patterns of tenant screening services’ inner algorithms, data structures, and representations.
          </motion.div>
          <div>

          </div>
          <div>

          </div>

          <div className="pt-4 lg:pt-0 col-span-3">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-gray">
              Tenant screening services utilize credit score databases, eviction records, and criminal records from third-party data brokers to produce reports that landlords use to inform their decisions about who to rent to. Many research and news articles have pointed out that tenant screening reports and their inner algorithm has the discriminatory and racialized impact, and there is no regulated structure for its algorithmic and modeling processes.
            </motion.p> 

            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
                duration: 0.1
                }} className="flex justify-center items-center gap-2 my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/how-tss-works")} }>
              <Article fontSize="18" /> See How Tenant Screening Works
            </motion.button>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}  className="text-gray"> 
              However, tenant screening services and their inner algorithms and data collection processes are proprietary, <span className="font-bold text-white">it is only possible to audit them externally.</span> The results of the project will be used to advocate for regulations on tenant screening services and to <span className="font-bold text-white">hold tenant screening algorithms accountable under fair housing principles.</span>
            </motion.p>
          </div>

        </motion.div>

        <motion.div viewport={{ once: true }} transition={{
          duration: 0.25,
          delay: 0.2
        }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

          <div className="">
            Crowdsourcing<br/>
            Tenant Screening Reports
          </div>
          <div className="col-span-4 text-4xl">
            We are looking for <span className="font-bold">tenants who were screened by tenant screening services.</span> <span className="font-bold underline decoration-1">Both accepted and denied tenants</span> are eligible to participate.
          </div>
          <div>

          </div>
          <div>

          </div>

          <div className="pt-4 lg:pt-0 col-span-3">
            <p className="text-gray">
              <span className="font-bold text-white">Both denied *and* accepted tenants</span> are encouraged to participate! This research hope to study a valuable opportunity to compare the conditions under which tenant screening services algorithmically recommend and to landlords make their final decisions.
            </p> 

            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
                duration: 0.1
                }}  className="flex justify-center items-center gap-2 my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/submissions")} }>
              <Favorite fontSize="18" /> Donate Tenant Screening Report
            </motion.button>
          </div>

        </motion.div>

        <motion.div viewport={{ once: true }} transition={{
          duration: 0.25,
          delay: 0.2
        }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

          <div className="">
            Participate
          </div>
          <div className="col-span-4 text-4xl">
            How can I participate?
          </div>
          <div>

          </div>
          <div>

          </div>

          <div className="pt-3 lg:pt-0 col-span-3">
            
           
            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
              duration: 0.1
              }}  className="flex justify-center items-center gap-2 my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/submissions")} }>
              <Favorite fontSize="18" /> Donate Tenant Screening Report
            </motion.button>

            <p className="text-gray">
              Scan or take photos of your tenant screening report <span className="font-bold text-white">(We will remove your sensitive information)</span>, and upload. Additionally, we will ask a few questions about you, such as your age, gender, race, income, zip code, number of children, and the conditions of the rental property you applied for, such as rent, number of bedrooms, and the scale of landlords (number of units).
            </p>

          </div>

        </motion.div>

        <motion.div viewport={{ once: true }} transition={{
          duration: 0.25,
          delay: 0.2
        }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

          <div className="">
            Request a copy
          </div>
          <div className="col-span-4 text-4xl">
            If you do not have your copy of tenant screening report: we will help you <span className="font-bold">request your copy of tenant screening report</span> to tenant screening services.
          </div>
          <div>

          </div>
          <div>

          </div>

          <div className="pt-4 lg:pt-0 col-span-3">
            
           
            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.1 }}   className="flex justify-center items-center gap-2 my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate("/request-copy")} }>
              <SettingsPhone fontSize="18" /> Request Copy of Screening Report
            </motion.button>

            <p className="text-gray">
              <span className="text-white font-bold">You have the right to request your copy of the report from the tenant screening services</span>, mostly free of charge (in every 12-month period or when you were denied and request within 60 days). We provide a tool for you to easily request your copy of the report. Using that letter, you can send the letter to tenant screening services.
            </p>

          </div>

        </motion.div>

        <motion.div viewport={{ once: true }} transition={{
          duration: 0.25,
          delay: 0.2
        }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

          <div className="">
            FAQ
          </div>
          <div className="col-span-3">
            <p className="text-4xl">
              What will OpenTSS do with my data?
            </p>

            <p className="font-bold pt-5">
              First, we are interested in the discriminatory impact of tenant screening practices by protected groups (e.g., race, gender, source of income)
            </p>
            <p className="text-gray">
              We will analyze the tenant screening data to see if any discriminatory impact exists based on race, gender, family status, or source of income, and also analyze the mechanisms of scoring or decision-making processes. We will publish the results in this website in aggregated form.
            </p>

            <p className="font-bold pt-7">
              We are also interested in the impact of algorithmic recommendation done by tenant screening services on landlords’ decision making.
            </p>

            <p className="text-gray">
              We hope to measure discriminatory impact of algorithmic scoring system on tenant screening practices. 
            </p>

            <p className="text-4xl pt-7">
              How will you protect my data?
            </p>

            <p className="font-bold pt-5">
              This research has been approved by <a href="https://couhes.mit.edu/" className="underline decoration-1" target="_blank">MIT Committee on the Use of Humans as Experimental Subjects (COUHES)</a>, the Institutional Review Board responsible for overseeing the ethical and privacy aspects of the study. The report you provide will be sent using end-to-end encryption to ensure its secure transmission. Additionally, we will carefully remove any identifiable information.
            </p>
            <p className="pt-3 text-gray">
              <span className="font-bold text-white">We are only interested in the data of your tenant screening reports, not your name, your SSN, nor your address.</span> After you send your report, we will remove your identifiable information on the report. We will ask for additional demographic information, which will also be encrypted, to be able to analyze the tenant screening report more accurately, to ascertain how different profiles are treated differently by the tenant screening companies. The report and data will be transferred with an end-to-end encryption and stored on our secure server. <span className="font-bold text-white">The data will only be used to analyze the practice of tenant screening services. It will neither be forwarded to third parties nor sold.</span>
            </p>

          </div>

        </motion.div>



      </div>
      <Footer bg="dark" />
    </>
  )
}

export default Welcome;