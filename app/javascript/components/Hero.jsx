import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
import _ from 'lodash';
import saferent_01 from "../assets/saferent_03.png";
import saferent_score_01 from "../assets/saferent_score_01.png";
import saferent_score_02 from "../assets/saferent_score_02.png";
import rentgrow_rec from "../assets/rentgrow_rec_01.png"
import transunion_01 from "../assets/transunion_01.png";
import tenantreports_scorecard from "../assets/figure-03_02.png";
import ntn_score from "../assets/ntn_score.png"
import { motion } from "framer-motion";
import { Article, Favorite, SettingsPhone } from "@mui/icons-material";

const heroImages = [
  {
    id: 1,
    img_url: saferent_01,
    width: 250,
    description: <>MyRental Sample Report.</>
  },
  {
    id: 2,
    img_url: saferent_score_01,
    width: 400,
    description: <>SafeRent Score.</>
  },
  {
    id: 3,
    img_url: saferent_score_02,
    width: 400,
    description: <>List of data that SafeRent collects.</>
  },
  {
    id: 4,
    img_url: transunion_01,
    width: 300,
    description: <>TransUnion sample report.</>
  },
  {
    id: 6,
    img_url: tenantreports_scorecard,
    width: 400,
    description: <>TenantReports.com Pass/Fail Scorecard.</>
  },
  {
    id: 8,
    img_url: ntn_score,
    width: 350,
    description: <>National Tenant Network's sample report.</>
  },
  {
    id: 10,
    img_url: rentgrow_rec,
    width: 400,
    description: <>RentGrow recommendations.</>
  }
]


export default function Hero(){
  const [heroImagesFinal, setHeroImagesFinal] = useState(heroImages);
  const { t } = useTranslation();
  const { locale } = useParams();
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    setInterval
  }, [imageIdx]);

  return (  
    <>
      

      <div className="container mx-auto px-5">
        <div className="mt-8"></div>
        
        <h1 className="text-5xl lg:text-7xl">
          Unfairly denied housing<br/>
          due to <span className="font-bold text-yellow">tenant screening?</span>
        </h1>
        <p className="pt-5 text-2xl font-bold lg:text-4xl">
          OpenTSS collects tenant screening reports <br/>
          to hold tenant screening algorithms accountable.
        </p>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 pt-5 pb-5">
          <div className="lg:col-span-3">

            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
              duration: 0.1
              }} className="flex justify-center items-center gap-2 my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate(`/${locale}/request-copy`)} }>
              <SettingsPhone fontSize="18" /> Request Copy of Tenant Screening Report
            </motion.button>
            <div className="pt-2"></div>
            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
              duration: 0.1
              }} className="flex justify-center items-center gap-2  my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate(`/${locale}/request-copy`)} }>
              <Favorite fontSize="18" /> Donate Tenant Screening Report
            </motion.button>

            <p className="pt-5 lg:pr-36">
              <a href="https://dusp.mit.edu/news/how-tenant-screening-processes-influence-biased-rental-housing-exclusion" target="_blank" rel="noreferer" className="underline">Research papers</a> and <a href="https://www.wired.com/story/algorithms-allegedly-penalized-black-renters-the-us-government-is-watching/" target="_blank" rel="noreferer" className="underline">news articles</a> have highlighted that tenant screening reports, and the algorithms they are based on, are biased and discriminatory, and there is no regulation governing how they work. Tenant screening services utilize credit score databases, eviction records, and criminal records from third-party data brokers to produce reports that landlords use to inform their decisions about who to rent to.
            </p>
          </div>
          <div className="lg:col-span-3">
            <div className="flex align-center">
              {
                _.map(heroImagesFinal, (heroImage, idx) => {
                  return (
                    <motion.div   
      
                      className="absolute width-100 transition-opacity" style={{opacity: idx === 0 ? 100 : 0 }} key={heroImage.id}>
                      <div>
                        <img src={heroImage.img_url} alt={ heroImage.description } />
                      </div>
                      <div className="text-sm text-white-op-50 mt-1">
                        { heroImage.description}
                      </div>
                    </motion.div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}