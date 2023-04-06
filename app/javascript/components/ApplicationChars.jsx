import * as React from "react";
import { useContext, useState, useEffect } from "react";
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
import { Input, Option, Select, TextField, Textarea } from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import states from "../providers/states";

const ApplicationChars = () => {

  const { submission, setSubmission, setSubmissionStep } = useContext(store);
  const { register, control, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange",
    defaultValues: submission
  });

  const [acceptedShow, setAcceptedShow] = useState(false);
  const [voucherShow, setVoucherShow] = useState(false);

  const goBack = () => {
    window.scrollTo(0, 0);
    setSubmissionStep(3);
  }

  const onSubmit = (data) => {
    window.scrollTo(0, 0);
    setSubmission({
      ...submission,
      accepted: data.accepted,
      security_deposit: data.security_deposit,
      rent: data.rent,
      bedrooms: data.bedrooms,
      house_type: data.house_type,
      voucher: data.voucher,
      minimum_rent: data.minimum_rent,
      landlord_name: data.landlord_name,
      property_address: data.property_address,
      property_address_city: data.property_address_city,
      property_address_state: data.property_address_state,
      property_address_zipcode: data.property_address_zipcode,
      experience_freeform: data.experience_freeform,
      interview_possible: data.interview_possible
    })
    setSubmissionStep(5);
  };

  useEffect(() => {
    setAcceptedShow(submission.accepted === "accepted");
    setVoucherShow(submission.voucher === "yes");
  }, []);

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
                    rules={{ 
                      required: {value: true, message: "This field is required." }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field} onChange={(e) => { 
                            setAcceptedShow(e.target.value === "accepted");
                            field.onChange(e);
                         }}>
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

              {
                acceptedShow ?
                <div className="py-5">
                  <h3 className="font-bold pb-3">
                    If you are accepted, how much was the security deposit? If there was no security deposit, please enter 0.
                  </h3>
                  <FormControl>
                    <Input color={errors["security_deposit"] ? "danger" : "primary"} 
                      {
                        ...register("security_deposit", 
                          { 
                            required: {value: true, message: "This field is required." }, 
                            pattern: { value: /^[0-9]+$/, message: "This field only accepts numbers." } 
                          } 
                        )
                      } 
                      startDecorator="$" />

                    <FormHelperText>
                      {
                        errors["security_deposit"] ? 
                        <span className="text-red">{errors["security_deposit"].message}</span> : 
                        <>Required. </>
                      }
                    </FormHelperText>
                  </FormControl>
                </div> : null
              }
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  How much was the rent of the property?
                </h3>
                <FormControl>
                  <Input color={errors["rent"] ? "danger" : "primary"}
                    {
                      ...register("rent", 
                        { 
                          required: {value: true, message: "This field is required." },
                          pattern: { value: /^[0-9]+$/, message: "This field only accepts numbers." }  
                        }
                      )
                    } 
                    startDecorator="$" />

                  <FormHelperText>
                    {
                      errors["rent"] ? 
                      <span className="text-red">{errors["rent"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>
            
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  How many bedrooms were there?
                </h3>
                <FormControl>
                  <Controller
                    name="bedrooms"
                    control={control}
                    rules={{ 
                      required: {value: true, message: "This field is required." }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="0" label="Studio" />
                          <Radio color="neutral" value="1" label="1 Bedroom" />
                          <Radio color="neutral" value="2" label="2 Bedrooms" />
                          <Radio color="neutral" value="3" label="3 Bedrooms" />
                          <Radio color="neutral" value="4" label="4 Bedrooms" />
                          <Radio color="neutral" value=">=5" label="More than 5 Bedrooms" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["bedrooms"] ? 
                      <span className="text-red">{errors["bedrooms"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  What was the house type?
                </h3>
                <FormControl>
                  <Controller
                    name="house_type"
                    control={control}
                    rules={{ 
                      required: {value: true, message: "This field is required." }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="single_family" label="Detached Single Family Housing" />
                          <Radio color="neutral" value="townhoue" label="Townhouse" />
                          <Radio color="neutral" value="multifamily" label="Multifamily Housing" />
                          <Radio color="neutral" value="manufactured" label="Manufactured Housing (i.e. Mobile Homes)" />
                          <Radio color="neutral" value="other" label="Other" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["house_type"] ? 
                      <span className="text-red">{errors["house_type"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  Do you have any types of housing vouchers?
                </h3>
                <p className="pb-3 text-white-op-70">
                  * Vouchers include Housing Choice Vouchers (Section 8), Veterans Affairs Supportive Housing (VASH), as well as city-level vouchers like CityFHEPS in NYC.
                </p>
                <FormControl>
                  <Controller
                    name="voucher"
                    control={control}
                    rules={{ 
                      required: {value: true, message: "This field is required." }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field} onChange={(e) => { 
                            setVoucherShow(e.target.value === "yes");
                            field.onChange(e);
                         }}>
                          <Radio color="neutral" value="yes" label="Yes" />
                          <Radio color="neutral" value="no" label="No" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["voucher"] ? 
                      <span className="text-red">{errors["voucher"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>
              
              {
                voucherShow ? 
                <div className="py-5">
                  <h3 className="font-bold pb-3">
                    What percentage of your income do you pay under your housing voucher?
                  </h3>

                  <p className="pb-3 text-white-op-70">
                    For instance, Housing Choice Vouchers require you to pay <span className="font-bold">30%</span> of your income as rent.
                  </p>

                  <FormControl>
                    <Input color={errors["minimum_rent"] ? "danger" : "primary"}
                      {
                        ...register("minimum_rent", 
                          { 
                            required: {value: true, message: "This field is required." },
                            pattern: { value: /^(?:100|[1-9][0-9]?|0)$/, message: "This field only accepts percetages (0-100)." }  
                          }
                        )
                      } 
                      endDecorator="%" />

                    <FormHelperText>
                      {
                        errors["minimum_rent"] ? 
                        <span className="text-red">{errors["minimum_rent"].message}</span> : 
                        <>Required. </>
                      }
                    </FormHelperText>
                  </FormControl>
                </div> : null
              }
             
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  Enter the name of the landlord or the property management company.
                </h3>
                <FormControl>
                  <Input color={errors["landlord_name"] ? "danger" : "primary"}
                    {
                      ...register("landlord_name",
                        { required: {value: true, message: "This field is required."} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["landlord_name"] ? 
                      <span className="text-red">{errors["landlord_name"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  Enter the property address *you applied*.
                </h3>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input color={errors["property_address"] ? "danger" : "primary"}
                    {
                      ...register("property_address",
                        { required: {value: true, message: "This field is required."} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["property_address"] ? 
                      <span className="text-red">{errors["property_address"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
                <div className="p-3"></div>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input color={errors["property_address_city"] ? "danger" : "primary"}
                    {
                      ...register("property_address_city",
                        { required: {value: true, message: "This field is required."} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["property_address_city"] ? 
                      <span className="text-red">{errors["property_address_city"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
                <div className="p-3"></div>

                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Controller
                    name="property_address_state"
                    control={control}
                    defaultValue=""
                    rules={
                      { required: {value: true, message: "This field is required."} }
                    }
                    render={({ field }) => {
                      return (
                        <Select {...field} placeholder="Choose State..." onChange={(e, newValue) => {
                          field.onChange(newValue)
                        }} color={errors["property_address_state"] ? "danger" : "primary"}>
                          {
                            _.map(states, state => {
                              return (
                                <Option key={state} value={state}>{state}</Option>
                              )
                            })
                          }
                        </Select>
                      )
                    }}
                  />


                  <FormHelperText>
                    {
                      errors["property_address_state"] ? 
                      <span className="text-red">{errors["property_address_state"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>
                
                <div className="p-3"></div>
                <FormControl>
                  <FormLabel>Zip Code</FormLabel>
                  <Input color={errors["property_address_zipcode"] ? "danger" : "primary"}
                    {
                      ...register("property_address_zipcode",
                        { required: { value: true, message: "This field is required."},
                          pattern:  { value: new RegExp("^\\d{5}(?:[-\\s]\\d{4})?$"), "message": "This field allows only zip code."} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["property_address_zipcode"] ? 
                      <span className="text-red">{errors["property_address_zipcode"].message}</span> : 
                      <>Required. </>
                    }
                  </FormHelperText>
                </FormControl>

              </div>
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  Please describe your experience with a landlord or property management company that uses tenant screening services.
                </h3>

                <p className="pb-3 text-white-op-70">
                  
                </p>

                <FormControl>
                  <Textarea minRows={4} placeholder="Type your experience..." color={errors["experience_freeform"] ? "danger" : "primary"}
                    {
                      ...register("experience_freeform")
                    } />

                  <FormHelperText>
                    {
                      errors["experience_freeform"] ? 
                      <span className="text-red">{errors["experience_freeform"].message}</span> : 
                      <>Optional. </>
                    }
                  </FormHelperText>
                </FormControl>
              </div> 
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  Would you be willing to participate in an interview with us to discuss your experience further, if we are interested in learning more?
                </h3>
                <FormControl>
                  <Controller
                    name="interview_possible"
                    control={control}
                    rules={{ 
                      required: {value: true, message: "This field is required." }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="yes" label="Yes" />
                          <Radio color="neutral" value="no" label="No" />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["interview_possible"] ? 
                      <span className="text-red">{errors["interview_possible"].message}</span> : 
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