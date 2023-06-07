import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import mozilla_logo_dark from '../assets/mozilla_logo_dark.png';
import idss_logo_dark from '../assets/idss_logo_dark.png';
import df_logo_dark from '../assets/df_logo_dark.png';

const About = () => {

  const { setMenuOpen } = useContext(store);
  const { locale } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About This Project | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-black text-white";
    setMenuOpen(false);
  }, []);
  
  const renderEn = () => {
    return (
      <>
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              About
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                We are researchers who want to address the challenges of knowing inner algorithms and representations and bias of tenant screening algorithms. 
              </h2>
              <p className="my-2">
                OpenTSS aims to develop a crowdsourcing tool and/or campaign to audit tenant screening services and reveal the patterns of their inner algorithms, data structures, and representations, by collecting tenant screening reports, as well as denied renters’ experiences. <br/><br/>

                The goal of this project is to measure the discriminatory and racialized impact of employing tenant screening services. Because these services’ algorithms and data collection processes are proprietary, it is only possible to audit them externally. Tenant applicants have the right to request denied tenant screening reports if they are denied based on such reports. By collecting these denied reports from tenants, this project hopes to better understand the patterns of denying tenants based on such algorithms and expose the disparate impact of employing tenant screening services by landlords.
              </p>
              <div className="h-5"></div>            

        
              <div className="h-6"></div>  
            </div>
            <div className="lg:col-span-2"></div>

            <div>
              Team
            </div>
            <div className="lg:col-span-3">
              Wonyoung So<br/>
              <div className="text-gray">
                Principal Investigator<br/>
                PhD Candidate, Department of Urban Studies and Planning<br/>
                Massachusetts Institute of Technology
              </div>
              <br/><br/>
              Idana Wilson<br/>
              <div className="text-gray">
                Workshop Organizer<br/>
                Wellesley College
              </div>
              
            </div>
            <div className="lg:col-span-2"></div>
            <div className="lg:col-span-6 py-10"></div>

            <div>
              Support
            </div>
            <div className="lg:col-span-3">
              This project is made possible by the generous support of <a className="underline" href="https://foundation.mozilla.org/en/what-we-fund/awards/mozilla-technology-fund-mtf/" target="_blank">the Mozilla Technology Fund</a>, and we extend our gratitude to <a href="https://idss.mit.edu/" target="_blank" className="underline">MIT IDSS</a> and <a href="https://dataplusfeminism.mit.edu" target="_blank" className="underline">the Data + Feminism Lab at MIT</a>.
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center">
                <a className="mr-3" href="https://foundation.mozilla.org" target="_blank"><img className="w-[97px]" src={mozilla_logo_dark} alt="Mozilla" /></a>
                <a className="mr-3"  href="https://idss.mit.edu" target="_blank"><img className="w-[88px]" src={idss_logo_dark} alt="MIT IDSS" /></a>
                <a href="https://dataplusfeminism.mit.edu" target="_blank"><img className="w-[68px]" src={df_logo_dark} alt="Data + Feminism Lab" /></a>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }

  const renderEs = () => {
    return (
      <>
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              Acerca de
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                Somos investigadores que queremos abordar los retos de conocer los algoritmos internos y las representaciones y sesgos de los algoritmos de selección de inquilinos.
              </h2>
              <p className="my-2">
                OpenTSS aims to develop a crowdsourcing tool and/or campaign to audit tenant screening services and reveal the patterns of their inner algorithms, data structures, and representations, by collecting tenant screening reports, as well as denied renters’ experiences. <br/><br/>

                The goal of this project is to measure the discriminatory and racialized impact of employing tenant screening services. Because these services’ algorithms and data collection processes are proprietary, it is only possible to audit them externally. Tenant applicants have the right to request denied tenant screening reports if they are denied based on such reports. By collecting these denied reports from tenants, this project hopes to better understand the patterns of denying tenants based on such algorithms and expose the disparate impact of employing tenant screening services by landlords.
              </p>
              <div className="h-5"></div>            

        
              <div className="h-6"></div>  
            </div>
            <div className="lg:col-span-2"></div>

            <div>
              Equipo
            </div>
            <div className="lg:col-span-3">
              Wonyoung So<br/>
              <div className="text-gray">
                Investigador principal<br/>
                Doctorando, Departamento de Estudios y Planificación Urbanos<br/>
                Instituto de Tecnología de Massachusetts
              </div>
              <br/><br/>
              Idana Wilson<br/>
              <div className="text-gray">
                Organizador del taller<br/>
                Wellesley College
              </div>
              
            </div>
            <div className="lg:col-span-2"></div>
            <div className="lg:col-span-6 py-10"></div>

            <div>
              Ayuda
            </div>
            <div className="lg:col-span-3">
              Este proyecto ha sido posible gracias al generoso apoyo del <a className="underline" href="https://foundation.mozilla.org/en/what-we-fund/awards/mozilla-technology-fund-mtf/" target="_blank">Mozilla Technology Fund</a>, y hacemos extensivo nuestro agradecimiento al  <a href="https://idss.mit.edu/" target="_blank" className="underline">MIT IDSS</a> y al <a href="https://dataplusfeminism.mit.edu" target="_blank" className="underline">Data + Feminism Lab del MIT</a>.
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center">
                <a className="mr-3" href="https://foundation.mozilla.org" target="_blank"><img className="w-[97px]" src={mozilla_logo_dark} alt="Mozilla" /></a>
                <a className="mr-3"  href="https://idss.mit.edu" target="_blank"><img className="w-[88px]" src={idss_logo_dark} alt="MIT IDSS" /></a>
                <a href="https://dataplusfeminism.mit.edu" target="_blank"><img className="w-[68px]" src={df_logo_dark} alt="Data + Feminism Lab" /></a>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Header bg="black" />
      {
        locale === "es" ? 
        renderEs() :
        renderEn()
      }
      <div className="py-10"></div>
    </>
  );
};

export default About;