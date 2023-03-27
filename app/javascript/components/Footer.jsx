import * as React from "react";
import mozilla_logo from '../assets/mozilla_logo.png';
import idss_logo from '../assets/idss_logo.png';
import df_logo from '../assets/df_logo.png';

const Footer = () => {

  return (
    <>  
      <div className="h-20"></div>
      <footer className="container mx-auto max-w-7xl mt-2 mb-2 px-12">
        <div className="grid grid-cols-6 gap-5 py-3 items-start">
          <div className="col-span-2 col-end-3 leading-5 text-sm">
            <h3>
              Who are we?
            </h3>
            <p className="text-white-op-50">
              We are researchers at MIT who want to address the challenges of knowing inner algorithms and representations and bias of tenant screening algorithms. 
            </p>
          </div>

          <div className="col-span-2 col-end-6 leading-5 text-sm">
            <h3>
              Who supports this project?
            </h3>
            <p className="text-white-op-50">
              This study is supported by <a className="underline" href="https://foundation.mozilla.org/en/what-we-fund/awards/mozilla-technology-fund-mtf/" target="_blank">the Mozilla Technology Fund</a>, with special thanks to <a href="https://idss.mit.edu/" target="_blank" className="underline">MIT IDSS</a> and <a href="https://dataplusfeminism.mit.edu" target="_blank" className="underline">the Data + Feminism Lab at MIT</a>.
            </p>
          
            <div className="mt-5 flex items-center">
              <a className="mr-2" href="https://foundation.mozilla.org" target="_blank"><img className="w-[97px]" src={mozilla_logo} alt="Mozilla" /></a>
              <a className="mr-2"  href="https://idss.mit.edu" target="_blank"><img className="w-[88px]" src={idss_logo} alt="MIT IDSS" /></a>
              <a href="https://dataplusfeminism.mit.edu" target="_blank"><img className="w-[68px]" src={df_logo} alt="Data + Feminism Lab" /></a>
            </div>
          </div>

        </div>
      </footer>

      <div className="h-20"></div>
    </>
  )
}

export default Footer;