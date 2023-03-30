import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import saferent_01 from "../assets/saferent_03.png";
import saferent_score_01 from "../assets/saferent_score_01.png";
import saferent_score_02 from "../assets/saferent_score_02.png";
import transunion_01 from "../assets/transunion_01.png";

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
    description: <>TransUnion ResidentScore.</>
  },
  {
    id: 5,
    img_url: saferent_01,
    width: 250,
    description: <>MyRental Sample Report.</>
  },
  {
    id: 6,
    img_url: saferent_score_01,
    width: 400,
    description: <>SafeRent Score.</>
  },
  {
    id: 7,
    img_url: saferent_score_02,
    width: 400,
    description: <>List of data that SafeRent collects.</>
  },
  {
    id: 8,
    img_url: transunion_01,
    width: 300,
    description: <>TransUnion ResidentScore.</>
  },
  {
    id: 9,
    img_url: saferent_01,
    width: 250,
    description: <>MyRental Sample Report.</>
  },
  {
    id: 10,
    img_url: saferent_score_01,
    width: 400,
    description: <>SafeRent Score.</>
  },
  {
    id: 11,
    img_url: saferent_score_02,
    width: 400,
    description: <>List of data that SafeRent collects.</>
  },
  {
    id: 12,
    img_url: transunion_01,
    width: 300,
    description: <>TransUnion ResidentScore.</>
  }
]

export default function Hero(){
  return (  
    <>
      <div className="container mx-auto px-5">
        <div className="mt-5"></div>
        Have you ever <br/> 
        been screened by...
      </div>
      <div className="p-0 overflow-hidden">
        <div className="h-[400px] flex items-end pb-5" style={{width: 10000 }}>
          
          {
            _.map(heroImages, heroImage => {
              return (
                <div className="mr-5 last:mr-0" style={{width: heroImage.width}} key={heroImage.id}>
                  <div>
                    <img src={heroImage.img_url} alt="SafeRent Score" />
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

      <div className="container mx-auto px-5">
        <div className="mt-5"></div>
        
        <div className="font-bold text-6xl md:text-7xl lg:text-9xl leading-none">
          tenant screening <br/>services?
        </div>

        <div className="mt-4 mb-6">
          We need to audit them.
        </div>
      </div>
    </>
  )
}