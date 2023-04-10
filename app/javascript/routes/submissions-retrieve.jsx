import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { ArrowBack } from "@mui/icons-material";

const SubmissionsRetrieve = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const { register, reset, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange"
  });
  const [submitStatus, setSubmitStatus] = useState(0); // 0 = input 1= progress 2=success 3=error
  const [submissionData, setSubmissionData] = useState({});

  useEffect(() => {
    document.title = "Retrieve Your Submission | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setSubmitStatus(0);
    setMenuOpen(false);
  }, []);

 
  async function onSubmit(data){
    const token = document.querySelector('[name=csrf-token]').content;
    const url = "/api/submissions/query_email.json";
    const headers = {
      'X-CSRF-Token': token
    }
    
    const formData  = new FormData();
    formData.append("email", data.email);

    setSubmitStatus(1);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers
    });
    
    if (response.ok) {
      const data = await response.json();
      setSubmissionData(data);
      setSubmitStatus(2);
    } else {
      const data = await response.json();

      setSubmissionData(data);
      setSubmitStatus(3);
    }
  }

  const renderSubmitStatus = () => {
    if (submitStatus === 0 || submitStatus === 1) {
      return (
        <>
          <h2 className="font-bold text-4xl">
            Check your submission status here.
          </h2> 

          <p className="py-3">
            Please provide us with your email address so that we may send you a secure link to browse the status of your submission.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="e.g., john@doe.com" color={errors["email"] ? "danger" : "primary"}
                {
                  ...register("email", 
                    { 
                      required: {value: true, message: "This field is required." },
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "This field only allows email address (e.g., john@doe.com)"}
                    }
                  )
                }  />

              <FormHelperText>
                {
                  errors["email"] ? 
                  <span className="text-red">{errors["email"].message}</span> : 
                  <>Required. </>
                }
              </FormHelperText>
            </FormControl>
            <div className="py-3">
            </div>
            <FormControl>
              <Button disabled={!isValid} loading={submitStatus === 1} type="submit">Submit</Button>
            </FormControl>
          </form>
        </>
      );
    } else if (submitStatus === 2 && submissionData.submission_exist) {
      return (
        <>
          <h2 className="font-bold text-4xl">
            Thank you! We just sent an email with a secure link.
          </h2> 

          <p className="py-3">
            Please check your inbox — You can have access to the submission status through the secure link in the email. The link will be expired after 1 day.
          </p>
        </>
      );
    } else if (submitStatus === 2 && !submissionData.submission_exist) {
      return (
        <>
          <h2 className="font-bold text-4xl">
            We couldn't find your submissions.
          </h2> 

          <p className="py-3">
            Please try again with different email.
          </p>

          <button onClick={() => { reset(); setSubmitStatus(0); }}><ArrowBack /> Back</button>
        </>
      );
    } else if (submitStatus === 3) {
      return (
        <>
          <h2 className="font-bold text-4xl">
            Error Occured.
          </h2> 

          <p className="py-3">
            Please try again.
          </p>

          <button onClick={() => { reset(); setSubmitStatus(0); }}><ArrowBack /> Back</button>
        </>
      );
    }
  }
  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            Check your submission
          </div>
          <div className="lg:col-span-3">
            {
              renderSubmitStatus()
            }
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>
      <Footer bg="bright" />
    </>
  );
};

export default SubmissionsRetrieve;