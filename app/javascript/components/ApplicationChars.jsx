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
import AttachMoney from "@mui/icons-material/AttachMoney"
import { Input } from "@mui/joy";
import { useForm, Controller } from "react-hook-form";

const ApplicationChars = () => {

  const { submission, setSubmission, setSubmissionStep } = useContext(store);
  const { register, control, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange"
  });

  const goBack = () => {
    setSubmissionStep(3);
  }

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              <button onClick={goBack}><ArrowBack /> Back</button><br/><br/>
              Tenant Application
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                Now we will ask you about the tenant application.
              </h2>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  What was the rental decision?
                </h3>
                <FormControl>
                  <Controller
                    name="accepted"
                    control={control}
                    rules={{ required: {value: true, message: "This field is required." }  }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="accepted" label="Accepted" />
                          <Radio color="neutral" value="denied" label="Denied" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["accepted"] ? 
                      <span className="text-red">{errors["accepted"].message}</span> : 
                      <>Required. </>
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
                  <Button disabled={!isValid} type="submit">Next</Button>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ApplicationChars;