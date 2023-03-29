import * as React from "react";
import mozilla_logo_dark from '../assets/mozilla_logo_dark.png';
import idss_logo_dark from '../assets/idss_logo_dark.png';
import df_logo_dark from '../assets/df_logo_dark.png';
import mozilla_logo_bright from '../assets/mozilla_logo_bright.png';
import idss_logo_bright from '../assets/idss_logo_bright.png';
import df_logo_bright from '../assets/df_logo_bright.png';

const Footer = (props) => {
  const { bg } = props;

  return (
    <>  
      <div className="h-20"></div>
      <footer className="container mx-auto px-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-5 py-3 items-start">
          <div className="lg:col-span-2 lg:col-end-3 leading-5 text-sm">
            <h3 className={bg === "bright" ? "text-dark-blue" : "text-light-blue"}>
              Who are we?
            </h3>
            <p className="text-white-op-50">
              We are researchers at MIT who want to address the challenges of knowing inner algorithms and representations and bias of tenant screening algorithms. 
            </p>

            <div className="pt-5">
              <a href="#">Back to top</a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-end-6 leading-5 text-sm">
            <h3 className={bg === "bright" ? "text-dark-blue" : "text-light-blue"}>
              Who supports this project?
            </h3>
            <p className="text-white-op-50">
              This study is supported by <a className="underline" href="https://foundation.mozilla.org/en/what-we-fund/awards/mozilla-technology-fund-mtf/" target="_blank">the Mozilla Technology Fund</a>, with special thanks to <a href="https://idss.mit.edu/" target="_blank" className="underline">MIT IDSS</a> and <a href="https://dataplusfeminism.mit.edu" target="_blank" className="underline">the Data + Feminism Lab at MIT</a>.
            </p>
          
            <div className="mt-5 flex items-center">
              <a className="mr-3" href="https://foundation.mozilla.org" target="_blank"><img className="w-[97px]" src={bg === "bright" ? mozilla_logo_bright : mozilla_logo_dark} alt="Mozilla" /></a>
              <a className="mr-3"  href="https://idss.mit.edu" target="_blank"><img className="w-[88px]" src={bg === "bright" ? idss_logo_bright : idss_logo_dark} alt="MIT IDSS" /></a>
              <a href="https://dataplusfeminism.mit.edu" target="_blank"><img className="w-[68px]" src={bg === "bright" ? df_logo_bright : df_logo_dark} alt="Data + Feminism Lab" /></a>
            </div>
          </div>



        </div>
      </footer>

      <div className="h-20"></div>
    </>
  )
}

export default Footer;