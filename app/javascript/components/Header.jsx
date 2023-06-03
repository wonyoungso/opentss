import React from 'react'
import { store } from '../providers/TSSProvider';
import { useContext, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { pathToRegexp, compile, parse } from 'path-to-regexp';

const useOutsideClick = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};


export default function Header(props) {
  const navigate = useNavigate();
  const { menuOpen, setMenuOpen, resetSubmission, headerMode } = useContext(store)
  const { bg } = props;
  let { locale } = useParams();
  const { t, i18n } = useTranslation();  
  let currentLocation = useLocation();


  useEffect(() => {
    function onKeyDown(){
      setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };

  }, []);

  const handleClickOutside = () => {
    setMenuOpen(false);
  };
  
  const ref = useOutsideClick(handleClickOutside);

  const generateUrl = (locale, location) => {
    const route = '/:locale(en|es)/:path*';
    const definePath = compile(route);
    const routeComponents = pathToRegexp(route).exec(location.pathname);
  
    let subPaths = null;
    if (routeComponents && routeComponents[2]) {
      subPaths = routeComponents[2].split('/')
    }
  
    return definePath({
      locale,
      path: subPaths
    })
  }
  
  const handleLanguageClick = (lang) => {  
    let url = generateUrl(lang, currentLocation);
    i18n.changeLanguage(lang);
    navigate(url);
  }

  return (
    <>
      {
        menuOpen ? 
        <header ref={ref} className={`${bg === 'bright' ? 'bg-white-bg' : (bg === 'black' ? 'bg-black' : 'bg-dark-blue-bg')} top-0 py-4 fixed w-full z-50`}>
          <div className="container mx-auto px-5">
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-6 lg:gap-5">
              <Link to={`/${locale}`} className="lg:col-span-5">
                <h1 className="font-normal">
                  OpenTSS<span className="hidden lg:inline">: {t("Countering Tenant Screening")}</span>
                </h1>
              </Link>
              
              <div className="flex flex-row-reverse gap-2 items-start">
                <button onClick={() => { setMenuOpen(!menuOpen); }}>
                  {
                    menuOpen ? t("Close") : t("Menu")
                  } 
                </button>
                <button className={`text-${locale === "es" ? (bg === 'bright' ? "dark-blue" : "white") : "gray"}`} onClick={() => { handleLanguageClick("es") }}>
                  ES
                </button>
                <span className="text-gray">/</span>
                <button className={`text-${locale === "en" ? (bg === 'bright' ? "dark-blue" : "white") : "gray"}`} onClick={() => { handleLanguageClick("en") }}>
                  EN
                </button>
              </div>

              <div className="col-span-2 lg:col-span-3">
                <Link to={`/${locale}/how-tss-works`} className="text-lg">
                  <Trans i18nKey="How tenant screening works">
                    How <span className="font-bold">tenant screening works</span>
                  </Trans>
                </Link>
                <div className="indent-3">
                  <Link to={`/${locale}/companies`} className="text-m ">
                    { t("Tenant screening services lookup tool") }
                  </Link>
                </div>
                
                <div className="mt-5">
                  <Link to={`/${locale}/request-copy`} className="text-lg leading-none">

                    <Trans i18nKey="Menu request a copy">
                      Request a copy of your <br/>
                      <span className="font-bold">tenant screening report</span>
                    </Trans>
                  </Link>
                </div>

                <div className="mt-5">
                  <Link to={`/${locale}/submissions`} className="text-lg leading-none">

                    <Trans i18nKey="Menu donate report">
                      Donate your <span className="font-bold">tenant screening report</span> <br/>
                      for research  
                    </Trans>
                  </Link>
                </div>
                

              </div>
              <div className="col-span-2 lg:col-span-3">
                <div>     
                  <Link to={`/${locale}/submissions/retrieve`} className="text-sm">
                    { t("Retrieve your submission") }
                  </Link><br/>
                  <Link to={`/${locale}/about`} className="text-sm">
                    { t("About this project") }
                  </Link>
                </div>
                <div className="text-sm pt-4">
                  <Trans i18nKey="contact us desc">
                    If you have any questions for this project, <br/>
                    please email us at <a className="underline" href="mailto:opentss@mit.edu">opentss@mit.edu</a>
                  </Trans>
                </div>
                

              </div>
            </div>
          </div>

        </header>
        :
        <header className={`${bg === 'bright' ? 'bg-white-bg' : (bg === 'black' ? 'bg-black' : 'bg-dark-blue-bg')} top-0 py-4 fixed w-full z-50`}>
          <div className="container mx-auto px-5">
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-6 lg:gap-5">
            
              <h1 className="font-normal cursor-pointer" onClick={() => {
                if (headerMode === "focus") {
                  if (confirm("Leaving this page will lose the input you entered. Do you want to continue?")) {
                    resetSubmission();
                    navigate(`/${locale}`);
                  }
                } else {

                  navigate(`/${locale}`);
                }
              }}>
                OpenTSS
              </h1>
              {
                headerMode === "focus" ?
                <>
                  <div className="hidden lg:block lg:col-span-3">

                  </div>
                </> : 
                <>
                  <Link to={`/${locale}/how-tss-works`} className="hidden lg:block">
                    { t("How TSS Works") }
                  </Link>

                  <Link to={`/${locale}/companies`} className="hidden lg:block">
                    { t("Company Lookup") }
                  </Link>


                  <Link to={`/${locale}/request-copy`} className="hidden lg:block">
                    { t("Request Copy") }
                  </Link>

                  <Link to={`/${locale}/submissions`} className="hidden lg:block">
                    { t("Donate Your Report") }
                  </Link>
                </>
              }
              
              <div className="flex flex-row-reverse gap-2 items-start">
                {
                  headerMode === "focus" ?
                  null : 
                  <>
                    <button onClick={() => { setMenuOpen(!menuOpen); }}>
                      {
                        menuOpen ? t("Close") : t("Menu")
                      } 
                    </button>
                    <button className={`text-${locale === "es" ? (bg === 'bright' ? "dark-blue" : "white") : "gray"}`} onClick={() => { handleLanguageClick("es") }}>
                      ES
                    </button>
                    <span className="text-gray">/</span>
                    <button className={`text-${locale === "en" ? (bg === 'bright' ? "dark-blue" : "white") : "gray"}`} onClick={() => { handleLanguageClick("en") }}>
                      EN
                    </button>
                  </> 
                }
              </div>
            </div>
          </div>
        </header>
      }
      
      <div className="h-20">

      </div>
    </>

  )
}
