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
import moment from "moment";
import { useTranslation, Trans } from "react-i18next";


const months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
const years = _.map(_.range(2023, 1960, -1), year => _.toString(year));

const ApplicationChars = () => {
  const { t } = useTranslation();
  const { submission, setSubmission, setSubmissionStep, revisitedSubmission, setRevisitedSubmission, setHeaderMode  } = useContext(store);
  const { register, trigger, control, watch, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ 
    mode: "onChange",
    defaultValues: submission
  });

  const [acceptedShow, setAcceptedShow] = useState(false);
  const [voucherShow, setVoucherShow] = useState(false);

  const goBack = () => {
    window.scrollTo(0, 0);
    console.log("press goback");

    let security_deposit;

    if (watch("accepted") === "accepted") {
      security_deposit = watch("security_deposit");
    } else {
      security_deposit = "-1";
    }

    setSubmission({
      ...submission,
      accepted: watch("accepted"),
      security_deposit: security_deposit,
      rent: watch("rent"),
      bedrooms: watch("bedrooms"),
      house_type: watch("house_type"),
      voucher: watch("voucher"),
      minimum_rent: watch("minimum_rent"),
      landlord_name: watch("landlord_name"),
      landlord_scale: watch("landlord_scale"),
      property_address: watch("property_address"),
      property_address_city: watch("property_address_city"),
      property_address_state: watch("property_address_state"),
      property_address_zipcode: watch("property_address_zipcode"),
      experience_freeform: watch("experience_freeform"),
      interview_possible: watch("interview_possible"),
      rent_apply_date_month: watch("rent_apply_date_month"),
      rent_apply_date_year: watch("rent_apply_date_year")
    })

    setSubmissionStep(3);
  }

  const onSubmit = (data) => {
    window.scrollTo(0, 0);

    let security_deposit;

    if (data.accepted === "accepted") {
      security_deposit = data.security_deposit;
    } else {
      security_deposit = "-1";
    }
    
    setSubmission({
      ...submission,
      accepted: data.accepted,
      security_deposit: security_deposit,
      rent: data.rent,
      bedrooms: data.bedrooms,
      house_type: data.house_type,
      voucher: data.voucher,
      minimum_rent: data.minimum_rent,
      landlord_name: data.landlord_name,
      landlord_scale: data.landlord_scale,
      property_address: data.property_address,
      property_address_city: data.property_address_city,
      property_address_state: data.property_address_state,
      property_address_zipcode: data.property_address_zipcode,
      experience_freeform: data.experience_freeform,
      interview_possible: data.interview_possible,
      rent_apply_date_month: data.rent_apply_date_month,
      rent_apply_date_year: data.rent_apply_date_year
    })
    setSubmissionStep(5);
  };

  useEffect(() => {
    setAcceptedShow(submission.accepted === "accepted");
    setVoucherShow(submission.voucher === "yes");
  }, []);

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  useEffect(() => {
    setHeaderMode("focus");
    if (revisitedSubmission[4]) {
      trigger();
    }
    
    setRevisitedSubmission({
      ...revisitedSubmission,
      4: true
    });

    return () => {

      setHeaderMode("normal");
    };
  }, []);

  useEffect(() => {
    trigger();
  }, [acceptedShow, voucherShow]);


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              <button onClick={goBack}><ArrowBack /> { t("Back") }</button><br/><br/>
              { t("Tenant Application") }
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                { t("Now we will ask you about the tenant application.") }
              </h2>

              <div className="pt-10">
                <h3 className="font-bold pb-3">
                  { t("When approximately did you apply?") }
                </h3>

                <div className="flex gap-1 pb-1">
                  <Controller
                      name="rent_apply_date_month"
                      control={control}
                      rules={{ 
                        required: {value: true, message:  t("Month field is required.")  },
                        validate: {
                          laterThanReportDate: (formValue) => {

                            if (_.isNull(formValue)) {
                              return false;
                            }

                            if (_.isNull(watch("rent_apply_date_year"))) {
                              return false;
                            }

                            const applicationDate = moment(`${watch("rent_apply_date_month")} ${watch("rent_apply_date_year")}`, "MMMM YYYY")
                            const reportDate = moment(`${submission.report_date_month} ${submission.report_date_year}`, "MMMM YYYY")
                            
                            _.delay(() => {
                              trigger("rent_apply_date_year");
                            }, 200);

                            return applicationDate.isSameOrBefore(reportDate) || t("application_chars.validate_date", { date: reportDate.format("MMMM YYYY")})
                          }
                        }
                      }}
                      render={({ field }) => {
                        return (
                          <Select placeholder={ t("Month") } {...field} onChange={(e, value) => {
                              field.onChange(value);
                          }}>
                            {
                              _.map(months, month => {
                                return (
                                  <Option key={month} value={month}>{ t(month) }</Option>
                                )
                              })
                            }
                          </Select>
                        )
                      }}
                    />
                  
                  <Controller
                      name="rent_apply_date_year"
                      control={control}
                      rules={{ 
                        required: {value: true, message: t("Year field is required.") },
                        validate: {
                          laterThanReportDate: (formValue) => {
                            if (_.isNull(formValue)) {
                              return false;
                            }

                            if (_.isNull(watch("rent_apply_date_month"))) {
                              return false;
                            }

                            const applicationDate = moment(`${watch("rent_apply_date_month")} ${watch("rent_apply_date_year")}`, "MMMM YYYY")
                            const reportDate = moment(`${submission.report_date_month} ${submission.report_date_year}`, "MMMM YYYY")
                            
                            _.delay(() => {
                              trigger("rent_apply_date_month");
                            }, 200);
                            return applicationDate.isSameOrBefore(reportDate) || t("application_chars.validate_date", { date: reportDate.format("MMMM YYYY")})
                          }
                        }
                      }}
                      render={({ field }) => {
                        return (
                          <Select placeholder={ t("Year") } {...field} onChange={(e, value) => {
                              field.onChange(value);
                          }}>
                            {
                              _.map(years, year => {
                                return (
                                  <Option key={year} value={year}>{ t(year) }</Option>
                                )
                              })
                            }
                          </Select>
                        )
                      }}
                    />
                </div>
                <FormHelperText>
                {
                    errors["rent_apply_date_year"] && errors["rent_apply_date_month"] ? 
                    <div className="text-red">
                      {
                        errors["rent_apply_date_month"].message === errors["rent_apply_date_year"].message ? 
                        errors["rent_apply_date_year"].message : 
                        <>
                          {errors["rent_apply_date_month"].message} {errors["rent_apply_date_year"].message}
                        </>
                      }
                     
                    
                    </div> : 
                    (
                      errors["rent_apply_date_month"] && !errors["rent_apply_date_year"] ? 
                      <div className="text-red">{errors["rent_apply_date_month"].message}</div> : 
                      (
                        errors["rent_apply_date_year"] && !errors["rent_apply_date_month"] ? 
                        <div className="text-red">{errors["rent_apply_date_year"].message}</div> : null
                      )
                    ) 
                  }
                  {
                    !errors["rent_apply_date_year"] && !errors["rent_apply_date_month"] ? 
                    t("Required.") : null
                  }
                </FormHelperText>
              </div>


              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("What was the rental decision?") }
                </h3>
                <FormControl>
                  <Controller
                    name="accepted"
                    control={control}
                    rules={{ 
                      required: {value: true, message: t("This field is required.") }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field} onChange={(e) => { 
                            setAcceptedShow(e.target.value === "accepted");
                            field.onChange(e);
                         }}>
                          <Radio color="neutral" value="accepted" label={ t("Accepted") } />
                          <Radio color="neutral" value="denied" label={ t("Denied") } />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["accepted"] ? 
                      <span className="text-red">{errors["accepted"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              {
                acceptedShow ?
                <div className="py-5">
                  <h3 className="font-bold pb-3">
                    { t("If you were accepted, how much was the security deposit? If there was no security deposit, please enter 0.") }
                  </h3>
                  <FormControl>
                    <Input color={errors["security_deposit"] ? "danger" : "primary"} 
                      {
                        ...register("security_deposit", 
                          { 
                            required: {value: true, message: t("This field is required.") }, 
                            pattern: { value: /^[0-9]+$/, message: t("This field only accepts numbers.") } 
                          } 
                        )
                      } 
                      startDecorator="$" />

                    <FormHelperText>
                      {
                        errors["security_deposit"] ? 
                        <span className="text-red">{errors["security_deposit"].message}</span> : 
                        t("Required.")
                      }
                    </FormHelperText>
                  </FormControl>
                </div> : null
              }
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("How much was the rent of the property?") }
                </h3>
                <FormControl>
                  <Input color={errors["rent"] ? "danger" : "primary"}
                    {
                      ...register("rent", 
                        { 
                          required: {value: true, message: t("This field is required.") },
                          pattern: { value: /^[0-9]+$/, message: t("This field only accepts numbers.") }  
                        }
                      )
                    } 
                    startDecorator="$" />

                  <FormHelperText>
                    {
                      errors["rent"] ? 
                      <span className="text-red">{errors["rent"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>
            
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("How many bedrooms were there?") }
                </h3>
                <FormControl>
                  <Controller
                    name="bedrooms"
                    control={control}
                    rules={{ 
                      required: {value: true, message: t("This field is required.") }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="0" label={ t("Studio") } />
                          <Radio color="neutral" value="1" label={ t("1 Bedroom") } />
                          <Radio color="neutral" value="2" label={ t("2 Bedrooms") } />
                          <Radio color="neutral" value="3" label={ t("3 Bedrooms") } />
                          <Radio color="neutral" value="4" label={ t("4 Bedrooms") } />
                          <Radio color="neutral" value=">=5" label={ t("More than 5 Bedrooms") } />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["bedrooms"] ? 
                      <span className="text-red">{errors["bedrooms"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("What was the house type?") }
                </h3>
                <FormControl>
                  <Controller
                    name="house_type"
                    control={control}
                    rules={{ 
                      required: {value: true, message: t("This field is required.") }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="single_family" label={ t("Detached Single Family Housing") } />
                          <Radio color="neutral" value="townhouse" label={ t("Townhouse") } />
                          <Radio color="neutral" value="multifamily" label={ t("Multifamily Housing") } />
                          <Radio color="neutral" value="manufactured" label={ t("Manufactured Housing (i.e. Mobile Homes)") } />
                          <Radio color="neutral" value="other" label={ t("Other") } />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["house_type"] ? 
                      <span className="text-red">{errors["house_type"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("Do you have any types of housing vouchers?") }
                </h3>
                <p className="pb-3 text-white-op-70">
                  { t("* Vouchers include Housing Choice Vouchers (Section 8), Veterans Affairs Supportive Housing (VASH), as well as city-level vouchers like CityFHEPS in NYC.") }
                </p>
                <FormControl>
                  <Controller
                    name="voucher"
                    control={control}
                    rules={{ 
                      required: {value: true, message: t("This field is required.") }
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
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>
              
              {
                voucherShow ? 
                <div className="py-5">
                  <h3 className="font-bold pb-3">
                    { t("What percentage of your income do you pay under your housing voucher?") }
                  </h3>

                  <p className="pb-3 text-white-op-70">
                    <Trans i18nKey="application_chars.hcv_desc">
                      For instance, Housing Choice Vouchers require you to pay maximum <span className="font-bold">30%</span> of your income as rent.
                    </Trans>
                  </p>

                  <FormControl>
                    <Input color={errors["minimum_rent"] ? "danger" : "primary"}
                      {
                        ...register("minimum_rent", 
                          { 
                            required: {value: true, message: t("This field is required.") },
                            pattern: { value: /^(?:100|[1-9][0-9]?|0)$/, message: t("This field only accepts percentages (0-100).") }  
                          }
                        )
                      } 
                      endDecorator="%" />

                    <FormHelperText>
                      {
                        errors["minimum_rent"] ? 
                        <span className="text-red">{errors["minimum_rent"].message}</span> : 
                        t("Required.")
                      }
                    </FormHelperText>
                  </FormControl>
                </div> : null
              }
             
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("Enter the name of the landlord or the property management company.") }
                </h3>
                <FormControl>
                  <Input color={errors["landlord_name"] ? "danger" : "primary"}
                    {
                      ...register("landlord_name",
                        { required: {value: true, message: t("This field is required.")} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["landlord_name"] ? 
                      <span className="text-red">{errors["landlord_name"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("Is the landlord individual or a company?") }
                </h3>
                <FormControl>
                  <Controller
                    name="landlord_scale"
                    control={control}
                    rules={{ 
                      required: {value: true, message: t("This field is required.") }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="individual" label={ t("Individual") } />
                          <Radio color="neutral" value="company" label={ t("Company") } />
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["landlord_scale"] ? 
                      <span className="text-red">{errors["landlord_scale"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("Enter the property address *you applied*.") }
                </h3>
                <FormControl>
                  <FormLabel>{ t("Address") }</FormLabel>
                  <Input color={errors["property_address"] ? "danger" : "primary"}
                    {
                      ...register("property_address",
                        { required: {value: true, message: t("This field is required.")} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["property_address"] ? 
                      <span className="text-red">{errors["property_address"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
                <div className="p-3"></div>
                <FormControl>
                  <FormLabel>{ t("City") }</FormLabel>
                  <Input color={errors["property_address_city"] ? "danger" : "primary"}
                    {
                      ...register("property_address_city",
                        { required: {value: true, message: t("This field is required.")} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["property_address_city"] ? 
                      <span className="text-red">{errors["property_address_city"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
                <div className="p-3"></div>

                <FormControl>
                  <FormLabel>{ t("State") }</FormLabel>
                  <Controller
                    name="property_address_state"
                    control={control}
                    defaultValue=""
                    rules={
                      { required: {value: true, message: t("This field is required.")} }
                    }
                    render={({ field }) => {
                      return (
                        <Select {...field} placeholder={ t("Choose State...") } onChange={(e, newValue) => {
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
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>
                
                <div className="p-3"></div>
                <FormControl>
                  <FormLabel>{ t("Zip Code") }</FormLabel>
                  <Input color={errors["property_address_zipcode"] ? "danger" : "primary"}
                    {
                      ...register("property_address_zipcode",
                        { required: { value: true, message: t("This field is required.")},
                          pattern:  { value: new RegExp("^\\d{5}(?:[-\\s]\\d{4})?$"), "message": t("This field allows only zip code (e.g., XXXXX or XXXXX-YYYY)")} }
                      )
                    }  />

                  <FormHelperText>
                    {
                      errors["property_address_zipcode"] ? 
                      <span className="text-red">{errors["property_address_zipcode"].message}</span> : 
                      t("Required.")
                    }
                  </FormHelperText>
                </FormControl>

              </div>
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("Please describe your experience with a landlord or property management company that uses tenant screening services.") }
                </h3>

                <p className="pb-3 text-white-op-70">
                  
                </p>

                <FormControl>
                  <Textarea minRows={4} placeholder={ t("Type your experience...") } color={errors["experience_freeform"] ? "danger" : "primary"}
                    {
                      ...register("experience_freeform")
                    } />

                  <FormHelperText>
                    {
                      errors["experience_freeform"] ? 
                      <span className="text-red">{errors["experience_freeform"].message}</span> : 
                      t("Optional.")
                    }
                  </FormHelperText>
                </FormControl>
              </div> 
              
              <div className="py-5">
                <h3 className="font-bold pb-3">
                  { t("Would you be willing to participate in an interview with us to discuss your experience further, if we are interested in learning more?") }
                </h3>
                <FormControl>
                  <Controller
                    name="interview_possible"
                    control={control}
                    rules={{ 
                      required: {value: true, message: t("This field is required.") }
                    }}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup  {...field}>
                          <Radio color="neutral" value="yes" label={ t("Yes") } />
                          <Radio color="neutral" value="no" label={ t("No") }/>
                        </RadioGroup>
                      )
                    }}
                  />
                  <FormHelperText>
                    {
                      errors["interview_possible"] ? 
                      <span className="text-red">{errors["interview_possible"].message}</span> : 
                      t("Required.")
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
                  <Button disabled={!isValid} type="submit">{ t("Next") }</Button>
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