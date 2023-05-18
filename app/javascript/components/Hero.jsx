import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import saferent_01 from "../assets/saferent_03.png";
import saferent_score_01 from "../assets/saferent_score_01.png";
import saferent_score_02 from "../assets/saferent_score_02.png";
import rentgrow_rec from "../assets/rentgrow_rec_01.png"
import transunion_01 from "../assets/transunion_01.png";
import tenantreports_scorecard from "../assets/figure-03_02.png";
import ntn_score from "../assets/ntn_score.png"
import { motion } from "framer-motion";

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

  useEffect(() => {

    if (heroImagesFinal.length <= 30) {

      _.delay(() => {

        let newHeroImagesFinal = [...heroImagesFinal];
        let newImage = _.cloneDeep(heroImages[_.random(0, heroImages.length - 1)]);
        newImage.id = _.uniqueId("heroimages-");
        newHeroImagesFinal.push(newImage);
        // newHeroImagesFinal.pop();
        setHeroImagesFinal(
          newHeroImagesFinal
        )
      }, 3000);
    }
  }, [heroImagesFinal]);

  return (  
    <>
      <div className="container mx-auto px-5">
        <div className="mt-5"></div>
        Have you ever <br/> 
        been screened by...
      </div>
      <div className="my-5 overflow-hidden">
        <motion.div className="h-[400px] flex items-end pb-5" style={{width: 10000, animation: "slide 30s linear infinite alternate" }}>
          
          {
            _.map(heroImagesFinal, heroImage => {
              return (
                <motion.div   
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 1.02 }}
  
                  className="mr-5 last:mr-0" style={{width: heroImage.width}} key={heroImage.id}>
                  <div>
                    <img src={heroImage.img_url} alt="SafeRent Score" />
                  </div>
                  <div className="text-sm text-white-op-50 mt-1">
                    { heroImage.description}
                  </div>
                </motion.div>
              )
            })
          }
          
        </motion.div>
      </div>  

      <div className="container mx-auto px-5">
        <div className="mt-5"></div>
        
        <div className="font-bold text-6xl md:text-7xl lg:text-9xl leading-none pb-8">
          <motion.span className="block lg:inline-block relative text-yellow" initial={{ 
            opacity: 0, top: 20
          }} animate={{ opacity: 1, top: 0, transition: { duration: 0.3, delay: 0.2} }}>tenant</motion.span><span className="hidden lg:inline">&nbsp;</span>
          <motion.span className="block lg:inline-block relative text-yellow" initial={{ 
            opacity: 0, top: 20
          }} animate={{ opacity: 1, top: 0, transition: { duration: 0.3, delay: 0.3} }}>screening</motion.span>
          <motion.span className="block lg:inline-block relative text-white" initial={{ 
            opacity: 0, top: 20
          }} animate={{ opacity: 1, top: 0, transition: { duration: 0.3, delay: 0.4} }}>services?</motion.span>
        </div>

      </div>
    </>
  )
}