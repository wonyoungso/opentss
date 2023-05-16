import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData, useParams} from 'react-router-dom';
import Footer from "../components/Footer";
import Autocomplete from '@mui/joy/Autocomplete';
import FormLabel from '@mui/joy/FormLabel';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import PDFFillingForm from "../components/PDFFillingForm";
import { Button } from "@mui/joy";
import _ from 'lodash';
import {  } from 'react-router-dom';

const formJSON = {
  "Name": {
    "field_name": "Name",
    "label": "Name",
    "caption": "",
    "required": true,
    "placeholder": "",
    "pattern": null
  },
  "Date of Birth": {
    "field_name": "Date of Birth",
    "label": "Date of Birth",
    "caption": "",
    "required": true,
    "placeholder": "MM/DD/YYYY",
    "pattern": {
      "value": "^(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$",
      "message": "This field allows MM/DD/YYYY date format."
    }
  },
  "Email": {
    "field_name": "Email",
    "label": "Email",
    "caption": "",
    "required": true,
    "placeholder": "",
    "pattern": null
  },
  "SSN": {
    "field_name": "SSN",
    "label": "SSN",
    "caption": "We understand that entering your Social Security number may be a concern. Please be assured that this tool is designed to work within your browser (or your phone), and therefore we do not transmit or store any of the information you enter. Think of it like using a word processor on your computer.",
    "required": true,
    "placeholder": "",
    "pattern": {
      "value": "^[0-9\\-]+$",
      "message": "This field allows only numbers or hyphen (-)."
    }
  },
  "Address": {
    "field_name": "Address",
    "label": "Address",
    "caption": "",
    "required": true,
    "placeholder": "",
    "pattern": null
  },
  "City": {
    "field_name": "City",
    "label": "City",
    "caption": "",
    "required": true,
    "placeholder": "",
    "pattern": null
  },
  "State": {
    "field_name": "State",
    "label": "State",
    "caption": "",
    "required": true,
    "placeholder": "CA, MD, MA...",
    "pattern": {
      "value": "^[A-Z]{2}$",
      "message": "This field allows 2-character state (e.g., CA, MD, MA)"
    }
  },
  "Zip Code": {
    "field_name": "Zip Code",
    "label": "Zip Code",
    "caption": "",
    "required": true,
    "placeholder": "",
    "pattern": {
      "value": "^\\d{5}(?:[-\\s]\\d{4})?$",
      "message": "This field allows only zipcode."
    }
  },
  "Name of Landlord": {
    "field_name": "Name of Landlord",
    "label": "Name of Landlord",
    "caption": "",
    "required": false,
    "placeholder": "",
    "pattern": null
  }
};

const RequestCopyCustom = () => {

  const { setMenuOpen } = useContext(store);
  let { companyname } = useParams();

  useEffect(() => {
    document.title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);

    _.each(document.querySelectorAll(".trix-content a"), elem => {
      const node = document.createAttribute("target");
      node.value = "_blank";
      console.log(node);
      elem.attributes.setNamedItem(node);
    });
  }, []);

  const finalCompany = {
    name: _.startCase(_.toLower(companyname)),
    form_json: formJSON,
    custom: true,
    request_form_url: "/custom_letter_template.pdf"
  };

  const renderComponent = () => {
    return (
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
         
            
          <div>
            { finalCompany.name } <br/>
            Request your report
          </div>
          <div className="lg:col-span-3">
            


            <h2 className="font-bold text-4xl">
              We will help you generate the letter to request your copy of tenant screening report, so you can send it to {finalCompany.name}.
              
            </h2>

            <PDFFillingForm company={finalCompany} />
              

          </div>
        </div>
        <div className="pt-10 lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            Next Step
          </div>
          <div className="lg:col-span-4">
            <h2 className="font-bold text-4xl">
              What's next after downloading the form?
            
            </h2>

            <div className="pt-5">
              To request a copy of your tenant screening report, begin by locating <span className="font-bold">the customer email or mailing address of the screening company. </span>
              <br/><br/>
              Typically, they will ask for a photocopy of <span className="font-bold">a government-issued identification</span>, such as a driver's license or passport. Take a photo of the identification.
              
              <br/><br/>
              First try to <span className="font-bold">email</span> them if you obtain an email address.
              <br/><br/>
              
              If the email address is unavailable, send the documents by mail.
            </div>
            
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      <Header bg="bright" />

      {
        renderComponent()
      }
      
      
      <Footer bg="bright" />
    </>
  );
};

export default RequestCopyCustom;