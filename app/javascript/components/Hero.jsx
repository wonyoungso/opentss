import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
import _ from 'lodash';
import saferent_01 from "../assets/saferent_03.png";
import saferent_score_01 from "../assets/saferent_score_01.png";
import saferent_score_02 from "../assets/saferent_score_02.png";
import rentgrow_rec from "../assets/rentgrow_rec_01.png"
import transunion_01 from "../assets/transunion_01.png";
import tenantreports_scorecard from "../assets/scorecard.png";
import ntn_score from "../assets/ntn_score.png"
import { motion } from "framer-motion";
import { Article, Favorite, SettingsPhone } from "@mui/icons-material";
import ProcessDiagram from "./ProcessDiagram";
import ProcessDiagramMobile from "./ProcessDiagramMobile";

const heroImages = [
  {
    id: 2,
    img_url: saferent_score_01,
    width: 400,
    rotation: Math.random() * 2 - 2,
    description: <>SafeRent Score.</>
  },
  {
    id: 3,
    img_url: saferent_score_02,
    width: 400,
    rotation: Math.random() * 2 - 2,
    description: <>List of data that SafeRent collects.</>
  },
  {
    id: 4,
    img_url: transunion_01,
    width: 400,
    rotation: Math.random() * 2 - 2,
    description: <>TransUnion sample report.</>
  },
  {
    id: 6,
    img_url: tenantreports_scorecard,
    width: 400,
    rotation: Math.random() * 2 - 2,
    description: <>TenantReports.com Pass/Fail Scorecard.</>
  },
  {
    id: 8,
    img_url: ntn_score,
    width: 400,
    rotation: Math.random() * 2 - 2,
    description: <>National Tenant Network's sample report.</>
  },
  {
    id: 10,
    img_url: rentgrow_rec,
    width: 400,
    rotation: Math.random() * 2 - 2,
    description: <>RentGrow recommendations.</>
  }
]


export default function Hero(){
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    _.delay(() => {
      setImageIdx((imageIdx + 1) % heroImages.length);
    }, 3000);
  }, [imageIdx]);

  return (  
    <>
      

      <div className="container mx-auto px-5">
        <div className="mt-8"></div>
        
        <h1 className="text-5xl lg:text-7xl">
          {
            locale === "es" ? 
            <>
              ¿Se le ha denegado injustamente una vivienda <br className="hidden lg:inline" />
              debido a <span className="font-bold text-yellow">la selección de inquilinos?</span>
            </> :
            <>
              Unfairly denied housing <br className="hidden lg:inline" />
              due to <span className="font-bold text-yellow">tenant screening?</span>
            </>
          }
          
        </h1>
        <p className="pt-5 text-2xl font-bold lg:text-4xl">
          {
            locale === "es" ? 
            <>
              OpenTSS recopila informes de selección de inquilinos <br className="hidden lg:inline" />
              para responsabilizar a los algoritmos de selección de inquilinos.
            </> :
            <>
              OpenTSS collects tenant screening reports <br className="hidden lg:inline" />
              to hold tenant screening algorithms accountable.
            </>
          }

          

        </p>

        <div className="lg:grid lg:grid-cols-6 lg:gap-5 pt-10 pb-5">
          <div className="lg:col-span-3">

            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
              duration: 0.1
              }} className="flex justify-center items-center gap-2 my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate(`/${locale}/request-copy`)} }>
              <SettingsPhone fontSize="18" /> { t("Request Copy of Tenant Screening Report")}
            </motion.button>
            <div className="pt-2"></div>
            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
              duration: 0.1
              }} className="flex justify-center items-center gap-2  my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate(`/${locale}/submissions`)} }>
              <Favorite fontSize="18" /> { t("Donate Tenant Screening Report") }
            </motion.button>

            <p className="pt-5 lg:pr-36">
              {
                locale === "es" ? 
                <>
                   Diversos trabajos de  <a href="https://dusp.mit.edu/news/how-tenant-screening-processes-influence-biased-rental-housing-exclusion" target="_blank" rel="noreferer" className="underline">investigación</a> y <a href="https://www.wired.com/story/algorithms-allegedly-penalized-black-renters-the-us-government-is-watching/" target="_blank" rel="noreferer" className="underline">artículos de prensa</a> han puesto de manifiesto que los informes de selección de inquilinos y los algoritmos en los que se basan son tendenciosos y discriminatorios, y que no existe ninguna normativa que regule su funcionamiento. Los servicios de selección de inquilinos utilizan bases de datos de puntuaciones de crédito, registros de desahucios y antecedentes penales de terceros intermediarios de datos para elaborar informes que los propietarios utilizan para decidir a quién alquilan.
                </> :
                <>
                  <a href="https://dusp.mit.edu/news/how-tenant-screening-processes-influence-biased-rental-housing-exclusion" target="_blank" rel="noreferer" className="underline">Research papers</a> and <a href="https://www.wired.com/story/algorithms-allegedly-penalized-black-renters-the-us-government-is-watching/" target="_blank" rel="noreferer" className="underline">news articles</a> have highlighted that tenant screening reports, and the algorithms they are based on, are biased and discriminatory, and there is no regulation governing how they work. Tenant screening services utilize credit score databases, eviction records, and criminal records from third-party data brokers to produce reports that landlords use to inform their decisions about who to rent to.
                </>
              }
            </p>
          </div>

          <div className="pt-5 lg:pt-0 lg:col-span-3" style={{height: 318.863049096}}>
            {
              _.map(heroImages, (heroImage, idx) => {
                return (
                  <div   
  
                    className="absolute transition-opacity duration-1000" style={{transform: `rotate(${heroImage.rotation}deg)`, width: heroImage.width, opacity: idx === imageIdx ? 100 : 0 }} key={heroImage.id}>
                    <div>
                      <img src={heroImage.img_url} alt="tss images" className="rounded-2xl" />
                    </div>
                    <div className="text-sm text-white-op-50 mt-1">
                      { heroImage.description}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="pt-16 text-2xl font-bold lg:text-4xl">
          <span className="text-yellow">{ t("Call to Action:") }</span><br/>
          { t("We need your help!") }
        </div>
        <div className="font-bold pt-5 text-5xl lg:text-7xl">
          
          {
            locale === "es" ? 
            <>
              Done tanto su rechazados <br className="hidden lg:inline" />
              y aceptados informes <br className="hidden lg:inline" />
              de selección de inquilinos <br className="hidden lg:inline" />
              y <span className="text-yellow">le pagamos $50</span>
            </> :
            <>
              Donate both your <br className="hidden lg:inline" />
              denied and accepted <br className="hidden lg:inline" />
              tenants screening reports <br className="hidden lg:inline" />
              and <span className="text-yellow">get paid $50</span>
            </>
          }

        </div>
        <div className="pt-5 pb-5">
          We will compare the denied and accepted reports to understand how decisions are made.
        </div>

        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{
          duration: 0.1
          }} className="flex justify-center items-center gap-2  my-0.5 bg-yellow py-2 px-10 rounded-md font-bold text-black text-sm lg:text-lg" onClick={() => { navigate(`/${locale}/submissions`)} }>
          <Favorite fontSize="18" /> { t("Donate Tenant Screening Report") }
        </motion.button>
        <p className="font-bold text-yellow">
        { t("You will get paid $50.") } 
        </p>

        <div className="pt-16 text-2xl font-bold lg:text-4xl">
          {
            locale === "es" ? 
            <>
              He aquí<br/>
              <span className="text-yellow">cómo funciona:</span>
            </> :
            <>
              Here is<br/>
              <span className="text-yellow">how it works:</span>
            </>
          }
          
        </div>

        <div className="py-5 scale-110 lg:scale-125 flex justify-center">
          <div className="pt-5 lg:hidden">
            <ProcessDiagramMobile />
          </div>
          <div className="hidden lg:block">
            <ProcessDiagram />
          </div>
        </div>
      </div>
    </>
  )
}