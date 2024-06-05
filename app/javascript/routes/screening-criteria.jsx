import * as React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate, useLoaderData} from 'react-router-dom';
import Footer from "../components/Footer";
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { Button, Option, Select, Radio, RadioGroup, Checkbox} from "@mui/joy";
import { FormLabel } from '@mui/joy';
import { useForm, Controller } from "react-hook-form";
import { useTranslation, Trans } from "react-i18next";
import CriteriaOverallResults from "../components/CriteriaOverallResults";
import screening_criteria_image from "../assets/screening_criteria_image.png";
import _ from 'lodash';
import { useSpring } from "framer-motion";

function randomBetween(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ScreeningCriteria = () => {

  const containerRef = useRef(null);
  const spring = useSpring(0, { damping: 300, stiffness: 200 });
  const { setMenuOpen, setCriteria, criteria, setSelectedScreeningDocument } = useContext(store);
  const { screening_documents } = useLoaderData();
  let [visibleResult, setVisibleResult] = useState(false);

  const navigate = useNavigate();
  let { locale } = useParams();
  const { t } = useTranslation();

  const { register, handleSubmit,reset, control, trigger, formState: { isValid, isDirty, errors } } = useForm({ mode: "onChange" });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Screening Critria: Will You Qualify? | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);
  }, []);

  function moveTo(to) {
    spring.set(window.scrollY, false);
    setTimeout(() => {
      spring.set(to);
    }, 50);
    console.log()
  }


  function randomPickShow(e){
    const income = randomBetween(1000, 5000);
    const eviction_judgment = Math.random() > 0.95 ? "yes" : "no";
    const eviction_filing = Math.random() > 0.95 ? "yes" : "no";
    const arrest =  Math.random() > 0.8 ? "yes" : "no";
    const charge_misdeam = Math.random() > 0.85 ? "yes" : "no";
    const charge_felony = Math.random() > 0.87 ? "yes" : "no";
    const convict_misdeam =  Math.random() > 0.9 ? "yes" : "no";
    const convict_felony =  Math.random() > 0.92 ? "yes" : "no";
    setCriteria({
      credit_score: randomBetween(350, 850),
      monthly_income: income,
      rental_debt: Math.random() > 0.5 ? randomBetween(0, 3000) : 0,
      collections: Math.random() > 0.9 ? randomBetween(0, 3000) : 0,
      other_debts: Math.random() > 0.6 ? randomBetween(0, 3000) : 0,
      monthly_debt_service: randomBetween(income * 0.3, income * 0.9),
      bankruptcy: Math.random() > 0.9 ? randomBetween(1, 7) : 0,
      voucher: Math.random() > 0.98 ? "yes" : "no",
      eviction_history_had_judgments: eviction_judgment,
      eviction_history_had_eviction_case_dismissed: eviction_filing,
      most_recent_eviction: (eviction_filing === "yes" || eviction_filing === "yes") ? randomBetween(1, 7): 0,
      criminal_history_been_arrested: arrest, 
      criminal_history_charged_misdemeanor: charge_misdeam, 
      criminal_history_charged_felony: charge_felony, 
      criminal_history_convicted_misdemeanor: convict_misdeam, 
      criminal_history_convicted_felony: convict_felony, 
      most_recent_criminal: (arrest === "yes" || charge_misdeam === "yes" || charge_felony === "yes" || convict_misdeam === "yes" || convict_felony === "yes") ? randomBetween(1, 7): 0
    });

    setVisibleResult(true);
    reset();
    setSelectedScreeningDocument(null);
    _.delay(() => {
      window.scrollTo(0, document.getElementById("scroll").offsetTop - 50)
    }, 400)
  }

  async function onSubmit(data){
    // const url = "http://localhost:808
    setCriteria({
      ...data,
      credit_score: Number(data.credit_score),
      monthly_income: Number(data.monthly_income),
      rental_debt: Number(data.rental_debt),
      collections: Number(data.collections),
      other_debts: Number(data.other_debts),
      monthly_debt_service: Number(data.monthly_debt_service),
      bankruptcy: Number(data.bankruptcy),
      most_recent_eviction: Number(data.most_recent_eviction),
      most_recent_criminal: Number(data.most_recent_criminal)
    })
    setVisibleResult(true);
    reset();

    setSelectedScreeningDocument(null);
    
    _.delay(() => {
      window.scrollTo(0, document.getElementById("scroll").offsetTop - 50)
    }, 400)
  }
  
  return (
    <>
      <Header bg="bright" />
      <div className="container mx-auto px-5">
        <div className="flex justify-center my-3 lg:my-7">
          <img src={screening_criteria_image} alt="screening criteria image" />
        </div>

        <div className="flex justify-center text-center">
          <div className="text-5xl font-bold">
            Screening Criteria:<br/>
            Will You Qualify?
          </div>
        </div>


        <div className="h-5"></div>
        
        <div className="flex justify-center">
          <div className="lg:w-1/2">
            This tool simulates your tenant screening outcomes based on the 1,227 screening documents we've collected from rental platforms. We're eager to gather more criteria documents!
          </div>
        </div>
        <div className="h-5"></div>
        
        <div className="lg:grid lg:grid-cols-6 lg:gap-5 pb-5">
          <div className="lg-col-span-1"></div>
          <div className="text-lg font-bold lg:col-span-4">
            Enter Information
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div className="lg:col-span-1">
            </div>
            <div className="lg:col-span-2">

              <div className="font-bold">
                Credit and Income
              </div>
              <FormControl className="pt-2">
                <FormLabel>Credit Score</FormLabel>
                <Input 
                  color={errors["credit_score"] ? "danger" : "primary"} 
                  {
                    ...register("credit_score", 
                      { 
                        required: { value: true, message: t("This field is required.") },
                        pattern: 
                          { value: new RegExp("^(3[5-9][0-9]|[4-7][0-9]{2}|8[0-4][0-9]|850)$"), message: "Only numbers ranging 350-850 is allowed" } 
                      }
                    )
                  } 
                  placeholder="e.g., 620" />
                <FormHelperText>
                  {
                    errors["credit_score"] ? 
                    <span className="text-red">{errors["credit_score"].message}</span> : 
                    (<>{ t("Required.") } </>)
                  }
                </FormHelperText>
              </FormControl>

              <FormControl className="pt-5">
                <FormLabel>Monthly Income ($)</FormLabel>
                <Input 
                  color={errors["monthly_income"] ? "danger" : "primary"} 
                  {
                    ...register("monthly_income", 
                      { 
                        required: { value: true, message: t("This field is required.") },
                        pattern: 
                          { value: new RegExp("^(0|[1-9][0-9]*)$"), message: "Only numbers are allowed." } 
                      }
                    )
                  } 
                  placeholder="e.g., 3500" />
                <FormHelperText>
                  {
                    errors["monthly_income"] ? 
                    <span className="text-red">{errors["monthly_income"].message}</span> : 
                    (<>{ t("Required.") } </>)
                  }
                </FormHelperText>
              </FormControl>


              <FormControl className="pt-7">
                <FormLabel>If you had rental debt from previous landlords, enter the amount here.</FormLabel>
                <Input 
                  color={errors["rental_debt"] ? "danger" : "primary"} 
                  {
                    ...register("rental_debt", 
                      { 
                        required: { value: true, message: t("This field is required.") },
                        pattern: 
                          { value: new RegExp("^(0|[1-9][0-9]*)$"), message: "Only numbers are allowed." } 
                      }
                    )
                  } 
                  placeholder="e.g., 3500" />
                <FormHelperText>
                  Enter 0 if you don't have. <>&nbsp;</>{
                    errors["rental_debts"] ? 
                    <span className="text-red">{errors["rental_debt"].message}</span> : 
                    (<>{ t("Required.") } </>)
                  }
                </FormHelperText>
              </FormControl>

              <FormControl className="pt-7">
                <FormLabel>If you had debt that sold to a collection agency, enter the amount here.</FormLabel>
                <Input 
                  color={errors["collections"] ? "danger" : "primary"} 
                  {
                    ...register("collections", 
                      { 
                        required: { value: true, message: t("This field is required.") },
                        pattern: 
                          { value: new RegExp("^(0|[1-9][0-9]*)$"), message: "Only numbers are allowed." } 
                      }
                    )
                  } 
                  placeholder="e.g., 3500" />
                <FormHelperText>
                  Enter 0 if you don't have. <>&nbsp;</>{
                    errors["collections"] ? 
                    <span className="text-red">{errors["collections"].message}</span> : 
                    (<>{ t("Required.") } </>)
                  }
                </FormHelperText>
              </FormControl>

              <FormControl className="pt-7">
                <FormLabel>If you had other debts, enter the amount here.</FormLabel>
                <Input 
                  color={errors["other_debts"] ? "danger" : "primary"} 
                  {
                    ...register("other_debts", 
                      { 
                        required: { value: true, message: t("This field is required.") },
                        pattern: 
                          { value: new RegExp("^(0|[1-9][0-9]*)$"), message: "Only numbers are allowed." } 
                      }
                    )
                  } 
                  placeholder="e.g., 3500" />
                <FormHelperText>
                  Enter 0 if you don't have. <>&nbsp;</>{
                    errors["other_debts"] ? 
                    <span className="text-red">{errors["other_debts"].message}</span> : 
                    (<>{ t("Required.") } </>)
                  }
                </FormHelperText>
              </FormControl>

              <FormControl className="pt-7">
                <FormLabel>How much do you pay monthly for your debt?</FormLabel>
                <Input 
                  color={errors["monthly_debt_service"] ? "danger" : "primary"} 
                  {
                    ...register("monthly_debt_service", 
                      { 
                        required: { value: true, message: t("This field is required.") },
                        pattern: 
                          { value: new RegExp("^(0|[1-9][0-9]*)$"), message: "Only numbers are allowed." } 
                      }
                    )
                  } 
                  placeholder="e.g., 3500" />
                <FormHelperText>
                  Enter 0 if you don't pay. <>&nbsp;</>{
                    errors["monthly_debt_service"] ? 
                    <span className="text-red">{errors["monthly_debt_service"].message}</span> : 
                    (<>{ t("Required.") } </>)
                  }
                </FormHelperText>
              </FormControl>

              <FormControl className="pt-7">
                <FormLabel>If you have ever filed for bankruptcy,<br/>select the most recent bankruptcy period.</FormLabel>
                <Controller
                  name="bankruptcy"
                  control={control}
                  rules={{ 
                    required: {value: true, message:  t("Bankruptcy period is required.")  }
                  }}
                  render={({ field }) => {
                    return (
                      <Select placeholder="Select" {...field} onChange={(e, value) => {
                          field.onChange(value);
                      }}>
                        <Option value="0">I have never filed for bankruptcy</Option>
                        <Option value="1">Less than 1 year ago</Option>
                        <Option value="2">1-2 years ago</Option>
                        <Option value="3">2-3 years ago</Option>
                        <Option value="4">3-4 years ago</Option>
                        <Option value="5">4-5 years ago</Option>
                        <Option value="6">5-6 years ago</Option>
                        <Option value="7">6-7 years ago</Option>
                        <Option value="8">More than 7 years ago</Option>
                      </Select>
                    )
                  }}
                />
              </FormControl>

              <FormControl className="pt-7">
                <FormLabel>Do you have a housing voucher?</FormLabel>
                <Controller
                  name="voucher"
                  control={control}
                  rules={{ 
                    required: {value: true, message: t("This field is required.") }
                  }}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <RadioGroup  {...field} onChange={(e) => { 
                          field.onChange(e);
                        }}>
                        <Radio color="neutral" value="yes" label={ t("Yes") } />
                        <Radio color="neutral" value="no" label={ t("No") } />
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

            <div className="lg:col-span-2">

              <div className="font-bold">
                Eviction History
              </div>
              <div className="pt-2"></div>
              <FormLabel>Have you ever (check all that apply):</FormLabel>
              <div className="pt-1"></div>
             
                <Controller
                  name="eviction_history_had_eviction_case_dismissed"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} value="yes" label="Had an eviction proceeding that was dismissed" />
                    )
                  }}
                />
                <div className="pt-2"></div>
                
                <Controller
                  name="eviction_history_had_judgments"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} value="yes" label="Had an eviction judgment" />
                    )
                  }}
                />
              <FormControl className="pt-5">
                <FormLabel>Most Recent Eviction History</FormLabel>
                <Controller
                  name="most_recent_eviction"
                  control={control}
                  rules={{ 
                    required: {value: true, message:  t("Most recent eviction history is required.")  }
                  }}
                  render={({ field }) => {
                    return (
                      <Select placeholder="Select" {...field} onChange={(e, value) => {
                          field.onChange(value);
                      }}>
                        <Option value="I don't have eviction history">I don't have eviction history</Option>
                        <Option value="1">Less than 1 year ago</Option>
                        <Option value="2">1-2 years ago</Option>
                        <Option value="3">2-3 years ago</Option>
                        <Option value="4">3-4 years ago</Option>
                        <Option value="5">4-5 years ago</Option>
                        <Option value="6">5-6 years ago</Option>
                        <Option value="7">6-7 years ago</Option>
                        <Option value="8">More than 7 years ago</Option>
                      </Select>
                    )
                  }}
                />
              </FormControl>

              <div className="font-bold pt-5">
                Criminal History
              </div>
              <div className="pt-2"></div>
              <FormLabel>Have you ever (check all that apply):</FormLabel>
              <div className="pt-1"></div>
              <Controller
                  name="criminal_history_been_arrested"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} value="yes" label="Been arrested" />
                    )
                  }}
                />
              <div className="pt-2"></div>
              <Controller
                  name="criminal_history_charged_misdemeanor"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} value="yes" label="Been charged with a misdemeanor" />
                    )
                  }}
                />
              <div className="pt-2"></div>
              <Controller
                  name="criminal_history_charged_felony"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} value="yes" label="Been charged with a felony" />
                    )
                  }}
                />
              <div className="pt-2"></div>
              <Controller
                  name="criminal_history_convicted_misdemeanor"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} value="yes" label="Been convicted of a misdemeanor" />
                    )
                  }}
                />
              <div className="pt-2"></div>
              <Controller
                  name="criminal_history_convicted_felony"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} value="yes" label="Been convicted of a felony" />
                    )
                  }}
                />


              <FormControl className="pt-5">
                <FormLabel>Most Recent Criminal History</FormLabel>
                <Controller
                  name="most_recent_criminal"
                  control={control}
                  rules={{ 
                    required: {value: true, message:  t("Most recent criminal history is required.")  }
                  }}
                  render={({ field }) => {
                    return (
                      <Select placeholder="Select" {...field} onChange={(e, value) => {
                          field.onChange(value);
                      }}>
                        <Option value="0">I don't have criminal history</Option>
                        <Option value="1">Less than 1 year ago</Option>
                        <Option value="2">1-2 years ago</Option>
                        <Option value="3">2-3 years ago</Option>
                        <Option value="4">3-4 years ago</Option>
                        <Option value="5">4-5 years ago</Option>
                        <Option value="6">5-6 years ago</Option>
                        <Option value="7">6-7 years ago</Option>
                        <Option value="8">More than 7 years ago</Option>
                      </Select>
                    )
                  }}
                />
              </FormControl>
            </div>

            <div className="lg:col-span-1">
            </div>
          </div>
          <div className="flex justify-center pt-5 pb-2">
            <div className="font-bold">
              We do not transmit or save your information for using this tool.
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80">
              <FormControl>
                <Button disabled={!isValid} type="submit">{ t("See Results") }</Button>
              </FormControl>
            </div>
          </div>
          <div className="flex justify-center pt-5 pb-2">
            <div className="">
              if you want to just see the results, click the below button.
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80">
              <FormControl>
                <Button type="submit" onClick={randomPickShow}>{ t("See the results using random applicant data") }</Button>
              </FormControl>
            </div>
          </div>
        </form>
        
        <div id="scroll">     
          {
            visibleResult ? 
            <CriteriaOverallResults screening_documents={screening_documents} criteria={criteria} />
            : null
          }
        </div>
        
      </div>
     
      <Footer bg="bright" />
    </>
  );
};

export default ScreeningCriteria;