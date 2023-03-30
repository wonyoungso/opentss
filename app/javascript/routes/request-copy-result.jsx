import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData } from 'react-router-dom';
import Footer from "../components/Footer";
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Checkbox from '@mui/joy/Checkbox';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { Button } from "@mui/joy";
import _ from 'lodash';


const RequestCopyResult = () => {

  const { setMenuOpen } = useContext(store);
  const { company, descriptions } = useLoaderData();
  const params = useParams();
  

  useEffect(() => {
    document.title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);
  }, []);

  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            { company.name } <br/>
            Request your report
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              {
                company.is_accept_letter ? 
                <>{company.name} directly accepts the request of your copy of tenant screening report.</> :
                <>{company.name} accepts the request of your copy of tenant screening report. We will help you generate the letter.</>
              }
            </h2>

            {
              company.is_accept_letter ?
              <>
                <div className="h-5"></div>
                <FormControl>
                  <Button onClick={() => {   window.open(company.request_copy_url, '_blank'); }}>{company.name} Inquiry Page</Button>
                </FormControl>
              </>:
              <>

              </>
            }
          </div>
        </div>
        {
            _.map(descriptions, description => {
              return (
                <div key={description.id} className="pt-10 lg:grid lg:grid-cols-6 lg:gap-5">
                  <div>
                    { description.subtitle }
                  </div>
                  <div className="lg:col-span-4">
                    <h2 className="font-bold text-4xl">
                      { description.title}
                    </h2>

                    <div className="pt-5" dangerouslySetInnerHTML={{ __html: description.content }} />
                    
                  </div>
                </div>
              );
            })
          }
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default RequestCopyResult;