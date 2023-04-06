import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../providers/TSSProvider";
import Button from "@mui/joy/Button";
import _ from 'lodash';
import { ArrowBack } from "@mui/icons-material";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import { Input, Option, Select, TextField, Textarea } from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import states from "../providers/states";
import defaultSubmission from "../providers/default_submission";

const FinalStep = () => {
  const navigate = useNavigate();
  const { submission, setSubmission, setSubmissionStep } = useContext(store);
  const [submitStatus, setSubmitStatus] = useState(0); // 0 = input 1= progress 2=success 3=error

  const { register, watch, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange",
    defaultValues: submission
  });

  const goBack = () => {
    setSubmissionStep(4);
  }

  async function onSubmit(data){
    const token = document.querySelector('[name=csrf-token]').content;
    const url = "/api/submissions.json";
    const headers = {
      'X-CSRF-Token': token
    }
    
    let finalSubmission = {...submission};
    finalSubmission.email = data.email;

    const formData  = new FormData();

    _.each(finalSubmission, (value, key) => {

      if (key === "files") {
        
        _.each(value, file => {
          formData.append("files[]", file);
        })

      } else {
        formData.append(key, value);
      }
    });

    setSubmitStatus(1);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers
    });
    
    if (response.ok) {
      const data = await response.json();
      setSubmission({
        ...defaultSubmission,
        files: []
      });

      setSubmitStatus(2);

    } else {
      const data = await response.json();

      setSubmitStatus(3);
    }
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              <button onClick={submitStatus === 1 ? null : goBack }><ArrowBack /> Back</button><br/><br/>
              Email address for 
              <br/>gift card
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                Finally, enter your information for gift card delivery.
              </h2>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  What is your email address?
                </h3>


                <FormControl>
                  <Input disabled={submitStatus === 1} placeholder="e.g., john@doe.com" color={errors["email"] ? "danger" : "primary"}
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
              </div>

              <div className="py-2">
                <h3 className="font-bold pb-3">
                  Confirm your email address.
                </h3>


                <FormControl>
                  <Input disabled={submitStatus === 1} placeholder="e.g., john@doe.com" color={errors["email_confirm"] ? "danger" : "primary"}
                    {
                      ...register("email_confirm", 
                        { 
                          required: {value: true, message: "This field is required." },
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "This field only allows email address (e.g., john@doe.com)"},
                          validate: (val) => {
                            if (watch('email') != val) {
                              return "Your email does not match.";
                            }
                          }
                        }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["email_confirm"] ? 
                      <span className="text-red">{errors["email_confirm"].message}</span> : 
                      <>Required. It is important to enter your correct and current email address because we will send a Visa gift card and a copy of your consent form to this email address.</>
                    }
                  </FormHelperText>
                </FormControl>
              </div>
            

              <div className="h-48"></div>

            </div>
            <div className="lg:col-span-2"></div>
          </div>
        </div>

        <div className="fixed bottom-0 py-5 w-full z-50 bg-white-bg">
          <div className="container mx-auto px-5">
            <div className="lg:grid lg:grid-cols-6 lg:gap-5">
              <div className="hidden lg:block"></div>
              <div className="lg:col-span-3">
                <FormControl>
                  <Button disabled={!isValid} loading={submitStatus === 1} type="submit">Done</Button>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  const renderSuccess = () => {
    return (
      <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            Thank you
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              Thank you very much! We will send a gift card as soon as we check your submission is complete.
            </h2>
            <div className="py-5">
              We have sent a confirmation email for your submission. You can check the status of your gift card delivery through the email. You will receive a $50 gift card via email, so please check your inbox in 1-2 days.
            </div>

            <FormControl>
              <Button onClick={() => { navigate("/")}}>Go to First Page</Button>
            </FormControl>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {
        submitStatus === 2 ?
        renderSuccess() : 
        renderForm()
      }
    </>
  )
}

export default FinalStep;