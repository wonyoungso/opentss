import * as React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../providers/TSSProvider";
import Button from "@mui/joy/Button";
import _ from 'lodash';
import { ArrowBack } from "@mui/icons-material";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { Input } from "@mui/joy";

const TenantDemographics = () => {

  const { submission, setSubmission, setSubmissionStep } = useContext(store);
  const [showGenderLongform, setShowGenderLongform] = useState(false);
  
  const goToNextStep = () => {
    setSubmissionStep(4);
  }

  const goBack = () => {
    setSubmissionStep(2);
  }

  const checkStatus = () => {
    const genderComplete = (submission.gender !== "not_listed" && submission.gender !== "") || submission.gender === "not_listed" && submission.genderFreeform.length > 0;
    const ethnicityComplete = submission.ethnicity !== "";
    const raceComplete = submission.race !== "";
    
    return genderComplete && ethnicityComplete && raceComplete;
  }

  const genderOnChange = (e) => {
    let newSubmission = { ...submission };
  
    setShowGenderLongform(e.target.value === "not_listed");
    newSubmission.gender = e.target.value;
  
    setSubmission(newSubmission);
  }

  const genderFreeformOnChange = (e) => {
    setSubmission({
      ...submission,
      genderFreeform: e.target.value
    });
  }

  const raceOnChange = (e) => {
    setSubmission({
      ...submission,
      race: e.target.value
    })
  }

  const ethnicityOnChange = (e) => {
    setSubmission({
      ...submission,
      ethnicity: e.target.value
    });
  };


  return (
    <>
       <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            <button onClick={goBack}><ArrowBack /> Back</button><br/><br/>
            Tenant Demographics
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              Next, we will ask about you.
            </h2>

            <div className="py-5">
              <h3 className="font-bold pb-3">
                To which gender identity do you most identify?
              </h3>
              <FormControl>
                <RadioGroup name="radio-buttons-group" onChange={genderOnChange} value={submission.gender}>
                  <Radio color="neutral" variant="outlined" value="famale" label="Female" />
                  <Radio color="neutral" value="male" label="Male" />
                  <Radio color="neutral" value="transgender_female" label="Transgender Female" />
                  <Radio color="neutral" value="transgender_male" label="Transgender Male" />
                  <Radio color="neutral" value="gender_variant" label="Gender Variant / Non-Conforming" />
                  <Radio color="neutral" value="not_disclose" label="Prefer not to say" />
                  <Radio color="neutral" value="not_listed" label="Not Listed" />
                </RadioGroup>
              </FormControl>
              {
                showGenderLongform ? 
                <div className="pt-2">
                  <FormControl>
                    <Input placeholder="Enter your gender" value={submission.genderFreeform} onChange={genderFreeformOnChange}  />
                  </FormControl>
                </div> : null
              }
            </div>


            <div className="py-5">
              <h3 className="font-bold pb-3">
                To which race do you most identify?
              </h3>
              <FormControl>
                <RadioGroup name="radio-buttons-group" onChange={ethnicityOnChange} value={submission.ethnicity}>
                  <Radio color="neutral" value="yes" label="Yes" />
                  <Radio color="neutral" value="no" label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="py-5">
              <h3 className="font-bold pb-3">
                To which gender identity do you most identify?
              </h3>
              <FormControl>
                <RadioGroup name="radio-buttons-group" onChange={raceOnChange} value={submission.race}>
                  <Radio color="neutral" value="white" label="White" />
                  <Radio color="neutral" value="black" label="Black / African American" />
                  <Radio color="neutral" value="native" label="Native American or Alaska Native" />
                  <Radio color="neutral" value="asian" label="Asian or Pacific Islander" />
                </RadioGroup>
              </FormControl>
            </div>

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
                <Button disabled={!checkStatus()} onClick={goToNextStep}>Next</Button>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TenantDemographics;