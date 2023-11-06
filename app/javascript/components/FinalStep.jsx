import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useTranslation, Trans } from "react-i18next";

const FinalStep = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { locale } = useParams();
  const [displayEmail, setDisplayEmail] = useState("");
  const { submission, setSubmission, setSubmissionStep, revisitedSubmission, setRevisitedSubmission, setHeaderMode } = useContext(store);
  const [submissionErrors, setSubmissionErrors] = useState(null); 
  const [submitStatus, setSubmitStatus] = useState(0); // 0 = input 1= progress 2=success 3=error

  const { register, watch, trigger, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange",
    defaultValues: submission
  });

  const goBack = () => {
    setSubmission({
      ...submission,
      email: watch("email"),
      email_confirm: watch("email_confirm")
    })
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
    setDisplayEmail(data.email);
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

    formData.append("locale", locale);

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
      setHeaderMode("normal");

    } else {
      const data = await response.json();

      setSubmissionErrors(data.errors)
      setSubmitStatus(3);
    }
  }

  useEffect(() => {
    setHeaderMode("focus");
    if (revisitedSubmission[5]) {
      trigger();
    }
    
    setRevisitedSubmission({
      ...revisitedSubmission,
      5: true
    });

    return () => {

      setHeaderMode("normal");
      if (submitStatus === 2) {
        setSubmissionStep(1);
        setRevisitedSubmission({
          1: false,
          2: false,
          3: false, 
          4: false,
          5: false
        })
      }
    };
  }, []);

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              <button onClick={submitStatus === 1 ? null : goBack }><ArrowBack /> { t("Back") }</button><br/><br/>
              { t("Email address for gift card") }
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                { t("Finally, enter your information for gift card delivery.") }
              </h2>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("What is your email address?") }
                </h3>


                <FormControl>
                  <Input disabled={submitStatus === 1} placeholder={ t("e.g., john@gmail.com") } color={errors["email"] ? "danger" : "primary"}
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
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-2">
                <h3 className="font-bold pb-3">
                  { t("Confirm your email address.") }
                </h3>


                <FormControl>
                  <Input disabled={submitStatus === 1} placeholder={ t("e.g., john@gmail.com") } color={errors["email_confirm"] ? "danger" : "primary"}
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
                      t("Required. It is important to enter your correct and current email address because we will send a Visa gift card and a copy of your consent form to this email address.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>
            
              <div className="py-2">
                <p className="text-red font-bold">By clicking "Done," you acknowledge that your submission contains real and factual information, that the tenant screening report is not an adverse action letter, and that the tenant screening report is not fabricated. You are also informed that you will not receive a reward if you submit a fabricated report. We may request your identification for verification purposes. Please note that we may not grant a reward if there is any evidence of fabrication. </p>
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
                  <Button disabled={!isValid} loading={submitStatus === 1} type="submit">{ t("Done")} </Button>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  const renderErrors = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              <button onClick={submitStatus === 1 ? null : goBack }><ArrowBack /> { t("Back") }</button><br/><br/>
              { t("Email address for gift card") }
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                { t("Finally, enter your information for gift card delivery.") }
              </h2>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("What is your email address?") }
                </h3>


                <FormControl>
                  <Input disabled={submitStatus === 1} placeholder={ t("e.g., john@gmail.com") } color={errors["email"] ? "danger" : "primary"}
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
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-2">
                <h3 className="font-bold pb-3">
                  { t("Confirm your email address.") }
                </h3>


                <FormControl>
                  <Input disabled={submitStatus === 1} placeholder={ t("e.g., john@gmail.com") } color={errors["email_confirm"] ? "danger" : "primary"}
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
                      t("Required. It is important to enter your correct and current email address because we will send a Visa gift card and a copy of your consent form to this email address.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>



              <div className="py-2">
                <p className="text-red font-bold">By clicking "Done," you acknowledge that your submission contains real and factual information, that the tenant screening report is not an adverse action letter, and that the tenant screening report is not fabricated. You are also informed that you will not receive a reward if you submit a fabricated report.</p>
              </div>
              {
                submissionErrors ?
                <>
                  <div className="pt-5"></div>
                  <p className="text-red">The following errors are found:</p>
                </> : null
              }
              
              {
                _.map(submissionErrors, (value, key) => {
                  return (
                    <p className="text-red font-bold">
                      {key}: { value.join(" ") }
                    </p>
                  )
                })
              }


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
                  <Button disabled={!isValid} loading={submitStatus === 1} type="submit">{ t("Done")} </Button>
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
            { t("Thank you") }
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              { t("Thank you very much! We will send a gift card as soon as we check your submission is completed.") }
            </h2>
            
            <Trans i18nKey="submissions.final_desc" values={{ displayEmail: displayEmail }}>
              <div className="py-3">
                <span className="font-bold">Please confirm your email address:</span> We have received and processed your tenant screening report. In the meantime, please confirm your email address through the email we just sent.
              </div>

              <div className="py-3">
                <span className="font-bold">What's next?</span> You will be receiving a $100 Visa gift card via email. Please anticipate its arrival in your inbox within 7 days. Kindly note that we review each submission individually, and in the event that your tenant screening report is illegible due to a blurry photograph, we may request that you re-upload the report for clarity.
                <br/><br/>
                <span className="font-bold text-red">After your submission, we'll review it to ensure it's a valid submission (e.g., not fabricated or a wrong document). We may request that you re-upload the report. We might request your identification for verification purposes. Please note that we may not grant a reward if there is any evidence of fabrication. </span>
                <br/><br/>
                Once we have confirmed the submission is valid, we will promptly send the gift card to your email address ({displayEmail}). Within the gift card email, you will have the option to choose between receiving a digital gift card or a physical one. 
              </div>

              <div className="py-3">
                <span className="font-bold">How can I check the status of my submission?</span> To check the status of your submission, use the following <Link to="/en/submissions/retrieve" className="underline">link</Link>. You will be prompted to enter your email address, and then we will send a secure link to retrieve the status of your submission.
              </div>


              <div className="py-3">
                <span className="font-bold">How can I reach out to you?</span> Please send an email to <a className="underline" href="mailto:opentss@mit.edu">opentss@mit.edu</a>! we will respond as soon as we have your email.
              </div>
            </Trans>
            


            <FormControl>
              <Button onClick={() => { navigate(`/${locale}`)}}>{ t("Go to First Page") }</Button>
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
        (
          submitStatus === 3 ?
          renderErrors() : 
          renderForm()
        )
      }
    </>
  )
}

export default FinalStep;