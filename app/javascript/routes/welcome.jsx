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
              Donate your report for our research. We will compensate $50 for your contribution.
            </div>
            <div className="col-span-2 pt-3 lg:pt-1">
              <img src={arrow_right} alt="right arrow" className="lg:block lg:ml-auto" />
            </div>
          </div>
        </div>
        <div className="h-5"></div>
        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

          <div className="">
            About
          </div>
          <div className="col-span-4 text-4xl">
            <span className="font-bold">We are collecting tenant screening reports</span> to reveal the patterns of tenant screening services’ inner algorithms, data structures, and representations.
          </div>
          <div>

          </div>
          <div>

          </div>

          <div className="pt-4 lg:pt-0 col-span-3">
            <p>
              Tenant screening services utilize credit score databases, eviction records, and criminal records from third-party data brokers to produce reports that landlords use to inform their decisions about who to rent to. Many research and news articles have pointed out that tenant screening reports and their inner algorithm has the discriminatory and racialized impact, and there is no regulated structure for its algorithmic and modeling processes.
            </p> 

            <button className="my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-lg" onClick={() => { navigate("/how-tss-works")} }>
              <Article fontSize="18" /> See How Tenant Screening Works
            </button>

            <p>  
              However, tenant screening services and their inner algorithms and data collection processes are proprietary, <span className="font-bold">it is only possible to audit them externally.</span> The results of the project will be used to advocate for regulations on tenant screening services and to <span className="font-bold">hold tenant screening algorithms accountable under fair housing principles.</span>
            </p>
          </div>

        </div>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

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
            <p>
              Both denied *and* accepted tenants are encouraged to participate! It will be a great source to compare the conditions in which tenant screening services algorithmically recommends decisions and how landlords made final decisions.
            </p> 

            <button className="my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-lg" onClick={() => { navigate("/submissions")} }>
              <Favorite fontSize="18" /> Donate Your Tenant Screening Report
            </button>
          </div>

        </div>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

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

          <div className="pt-4 lg:pt-0 col-span-3">
            
           
            <button className="my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-lg" onClick={() => { navigate("/submissions")} }>
              <Favorite fontSize="18" /> Donate Your Tenant Screening Report
            </button>

            <p>
              Scan or take photos of your tenant screening report <span className="font-bold">(We will remove your sensitive information)</span>, and upload. Additionally, we will ask a few questions about you, such as your age, gender, race, income, zip code, number of children, and the conditions of the rental property you applied for, such as rent, number of bedrooms, and the scale of landlords (number of units).
            </p>

          </div>

        </div>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

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
            
           
            <button className="my-5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-lg" onClick={() => { navigate("/request-copy")} }>
              <SettingsPhone fontSize="18" /> Request your copy of tenant screening report
            </button>

            <p>
              Scan or take photos of your tenant screening report <span className="font-bold">(We will remove your sensitive information)</span>, and upload. Additionally, we will ask a few questions about you, such as your age, gender, race, income, zip code, number of children, and the conditions of the rental property you applied for, such as rent, number of bedrooms, and the scale of landlords (number of units).
            </p>

          </div>

        </div>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 py-5 items-start">

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
            <p className="">
              We will analyze the tenant screening data to see if any discriminatory impact exists based on race, gender, family status, or source of income, and also analyze the mechanisms of scoring or decision-making processes. We will publish the results in this website in aggregated form.
            </p>

            <p className="font-bold pt-7">
              We are also interested in the impact of algorithmic recommendation done by tenant screening services on landlords’ decision making.
            </p>

            <p>
              We hope to measure discriminatory impact of algorithmic scoring system on tenant screening practices. 
            </p>

            <p className="text-4xl pt-7">
              How will you protect my data?
            </p>

            <p className="font-bold pt-5">
              This research has been approved by <a href="https://couhes.mit.edu/" className="underline decoration-1" target="_blank">MIT Committee on the Use of Humans as Experimental Subjects (COUHES)</a>, the Institutional Review Board responsible for overseeing the ethical and privacy aspects of the study. The report you provide will be sent using end-to-end encryption to ensure its secure transmission. Additionally, we will carefully remove any identifiable information.
            </p>
            <p className="pt-3">
              <span className="font-bold">We are only interested in the data of your tenant screening reports, not your name, your SSN, nor your address.</span> After you send your report, we will remove your identifiable information on the report and store it on our server. We will ask for additional demographic information to be able to analyze the tenant screening report more accurately, to ascertain how different profiles are treated differently by the tenant screening companies. The report and data will be transferred with an end-to-end encryption and stored on our server. <span className="font-bold">The data will only be used to analyze the tenant screening algorithms. It will neither be forwarded to third parties nor sold.</span>
            </p>

          </div>

        </div>



      </div>
      <Footer bg="dark" />
    </>
  )
}

export default Welcome;