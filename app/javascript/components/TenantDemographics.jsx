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

const TenantDemographics = () => {

  const { submission, setSubmission, setSubmissionStep } = useContext(store);
  const { register, control, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange",
    defaultValues: submission
  });

  const goBack = () => {
    setSubmissionStep(2);
  }

  const onSubmit = (data) => {
    setSubmission({
      ...submission,
      gender: data.gender,
      race: data.race,
      is_hispanic_or_latino: data.is_hispanic_or_latino,
      age: data.age,
      partner: data.partner,
      dependents: data.dependents,
      income: data.income
    })
    setSubmissionStep(4);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: {value: true, message: "This field is required." }  }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="famale" label="Female" />
                          <Radio color="neutral" value="male" label="Male" />
                          <Radio color="neutral" value="transgender_female" label="Transgender Female" />
                          <Radio color="neutral" value="transgender_male" label="Transgender Male" />
                          <Radio color="neutral" value="gender_variant" label="Gender Variant / Non-Conforming" />
                          <Radio color="neutral" value="not_disclose" label="Prefer not to say" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["gender"] ? 
                      <span className="text-red">{errors["gender"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>


              <div className="py-5">
                <h3 className="font-bold pb-3">
                  Are you of Hispanic or Latino Origin?
                </h3>
                
                <FormControl>
                  <Controller
                    name="is_hispanic_or_latino"
                    control={control}
                    rules={{ required: {value: true, message: "This field is required." }  }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field}>
                          <Radio color="neutral" value="yes" label="Yes" />
                          <Radio color="neutral" value="no" label="No" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["is_hispanic_or_latino"] ? 
                      <span className="text-red">{errors["is_hispanic_or_latino"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  To which race do you most identify?
                </h3>
                <FormControl>
                  <Controller
                    name="race"
                    control={control}
                    rules={{ required: {value: true, message: "This field is required." }  }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field}>
                          <Radio color="neutral" value="white" label="White" />
                          <Radio color="neutral" value="black" label="Black / African American" />
                          <Radio color="neutral" value="native" label="Native American or Alaska Native" />
                          <Radio color="neutral" value="asian" label="Asian or Pacific Islander" />
                          <Radio color="neutral" value="other" label="Other" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["race"] ? 
                      <span className="text-red">{errors["race"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  What is your age?
                </h3>
                
                <FormControl>
                  <Controller
                    name="age"
                    control={control}
                    rules={{ required: {value: true, message: "This field is required." }  }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field}>
                          <Radio color="neutral" value="18-29" label="18-29" />
                          <Radio color="neutral" value="30-39" label="30-39" />
                          <Radio color="neutral" value="40-49" label="40-49" />
                          <Radio color="neutral" value="50-59" label="50-59" />
                          <Radio color="neutral" value="60-69" label="60-69" />
                          <Radio color="neutral" value="More than 70" label="More than 70" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["age"] ? 
                      <span className="text-red">{errors["age"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                  
                </FormControl>
              </div>


              <div className="py-5">
                <h3 className="font-bold pb-3">
                  Do you live with your partner?
                </h3>
                <FormControl>
                  <Controller
                    name="partner"
                    control={control}
                    rules={{ required:{value: true, message: "This field is required." }  }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field}>
                          <Radio color="neutral" value="yes" label="Yes" />
                          <Radio color="neutral" value="no" label="No" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["partner"] ? 
                      <span className="text-red">{errors["partner"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  How many dependents (children) do you live with? 
                </h3>
                <FormControl>
                  <Controller
                    name="dependents"
                    control={control}
                    rules={{ required: {value: true, message: "This field is required." } }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field}>
                          <Radio color="neutral" value="0" label="No dependents" />
                          <Radio color="neutral" value="1" label="1" />
                          <Radio color="neutral" value="2" label="2" />
                          <Radio color="neutral" value="3" label="3" />
                          <Radio color="neutral" value="4" label="4" />
                          <Radio color="neutral" value="More than 5" label="More than 5" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["dependents"] ? 
                      <span className="text-red">{errors["dependents"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  How much is your monthly income before tax?
                </h3>
                <FormControl>
                  <Input color={errors["income"] ? "danger" : "primary"} 
                    {...register("income", 
                      { 
                        required: {value: true, message: "This field is required." },
                        pattern: { value: /^[0-9]+$/, message: "This field only accepts numbers." }  
                      } 
                    )} 
                  startDecorator="$" />

                  <FormHelperText>
                    {
                      errors["income"] ? 
                      <span className="text-red">{errors["income"].message}</span> : 
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

export default TenantDemographics;