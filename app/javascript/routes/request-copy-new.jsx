import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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


const RequestCopyNew = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const { companies } = useLoaderData();
  const [moreThan60days, setMoreThan60days] = useState(false);
  const [findNameStatus, setFindNameStatus] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  

  useEffect(() => {
    document.title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);
  }, []);

  const onChangeHandler = (event) => {
    setFindNameStatus(event.target.checked);
  };

  const onChangeAutocomplateHandler = (event, value) => {
    setSelectedCompany(value);
  }

  const checkStatus = () => {
    if (findNameStatus) {
      // user should type  
      return companyName.length === 0;
    } else {
      // user should choose
      return _.isNull(selectedCompany);
    }
  };
  

  const goToNextStep = () => {
    if (findNameStatus) {
      navigate(`/request-copy/custom-form/${companyName}`);
    } else {
      navigate(`/request-copy/companies/${selectedCompany.id}?sixty_days=${moreThan60days ? "t" : "f"}`);
    }
  };



  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            Step 1. Identify the tenant screening service
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              Which is the tenant screening company you were screened?
            </h2>
            <p className="my-2">
              This is a tool that guides you through a process of requesting a letter to tenant screening services.
            </p>
            <div className="h-5"></div>            

            <FormControl>
              <FormLabel>Select the tenant screening service here.</FormLabel>
              <Autocomplete placeholder="Choose..." disabled={findNameStatus} getOptionLabel={option => option.name} options={companies} value={selectedCompany} onChange={onChangeAutocomplateHandler} />
            </FormControl>
            <div className="h-5"></div>

            <Checkbox label="I can't find the name in the list" checked={findNameStatus} onChange={onChangeHandler} />
            <div className="h-5"></div>
            {
              findNameStatus ?
              <FormControl>
                <FormLabel>Enter the name of the tenant screening company</FormLabel>
                <Input value={companyName} placeholder="e.g., TransUnion" onChange={(e) => { setCompanyName(e.target.value)}} />
                <div className="h-5"></div>
              </FormControl>
              : null
            }

            <FormControl>
              <Checkbox label="My rental application was screened more than 60 days ago" checked={moreThan60days} onChange={(e) => { setMoreThan60days(e.target.checked) }} />
            </FormControl>
            <div className="h-5"></div>
            
            <FormControl>
              <Button disabled={checkStatus()} onClick={goToNextStep} size="lg">
                Next
              </Button>  
            </FormControl>


            <div className="h-6"></div>  
          </div>
          <div className="lg:col-span-2"></div>

          <div>
            Questions
          </div>
          <div className="lg:col-span-3">
            <p className="text-white-op-70 pt-1 pb-5">
              Q: How do I know which company do they screen?
            </p>

            <h3 className="font-bold text-md">
              A: Check your email inbox. 
            </h3>
            <p className="text-white-op-70 pt-1 pb-5">
              You may have received an email from the tenant screening company to get a consent so they can collect data about you and provide the data to the landlord. 
            </p>
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default RequestCopyNew;