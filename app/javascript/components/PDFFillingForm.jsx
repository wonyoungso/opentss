import { PDFDocument } from 'pdf-lib'
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import _ from 'lodash';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from "@mui/joy/Button";
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import { FormLabel } from '@mui/joy';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';



const PDFFillingForm = (props) => {
  const { company } = props;
  const { register, handleSubmit, control, trigger, formState: { isValid, isDirty, errors } } = useForm({ mode: "onChange" });
  // const [data, setData] = useState("");

  useEffect(() => {
    // if (company.name === "National Tenant Network") {
      trigger();
      
  }, []);

  async function onSubmit(data){
    const existingPdfBytes = await fetch(company.request_form_url).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm()
    let restData;
    // Get two text fields from the form

    // NTN speicifc fields  
    if (company.name === "National Tenant Network") {
      const ntnSpecificFields = ['Adverse Action Check', "Landlord Phone Number", "Date of Birth", "Generation", "SSN", "Phone"];

      let ntnData = _.pick(data, ntnSpecificFields);
      restData = _.pick(data, _.difference(_.keys(data), ntnSpecificFields));

      // then ntn_specific checking
      // first, adverse action checkbox
      if (ntnData["Adverse Action Check"]) {
        form.getCheckBox("Annual Free Check").uncheck();
        form.getCheckBox("Adverse Action Check").check();
      } else {
        form.getCheckBox("Annual Free Check").check();
        form.getCheckBox("Adverse Action Check").uncheck();
      }

      // split landlord phone number into two
      const landlordPhoneNumber_01 = ntnData['Landlord Phone Number'].substring(0, 3);
      const landlordPhoneNumber_02 = ntnData['Landlord Phone Number'].substring(3, ntnData['Landlord Phone Number'].length);
      const lrdPhoneField_01 = form.getTextField("Landlord Phone Number_1");
      lrdPhoneField_01.setText(landlordPhoneNumber_01);
      const lrdPhoneField_02 = form.getTextField("Landlord Phone Number_2");
      lrdPhoneField_02.setText(landlordPhoneNumber_02);

      // split date of birth
      const dateOfBirthSplited = ntnData['Date of Birth'].split("/");
      form.getTextField("Date of Birth Month").setText(dateOfBirthSplited[0]);
      form.getTextField("Date of Birth Day").setText(dateOfBirthSplited[1]);
      form.getTextField("Date of Birth Year").setText(dateOfBirthSplited[2]);

      // determine generation
      if (_.includes(_.lowerCase(ntnData['Generation']), "sr")){
        form.getCheckBox("Generation Sr").check();
        form.getCheckBox("Generation Jr").uncheck();
        form.getCheckBox("Generation Other").uncheck();
      } else if (_.includes(_.lowerCase(ntnData['Generation']), "jr")){
        form.getCheckBox("Generation Jr").check();
        form.getCheckBox("Generation Sr").uncheck();
        form.getCheckBox("Generation Other").uncheck();
      } else {
        form.getCheckBox("Generation Other").check();
        form.getCheckBox("Generation Jr").uncheck();
        form.getCheckBox("Generation Sr").uncheck();
        form.getTextField("Other Generation").setText(ntnData['Generation']);
      }

      // SSN split
      _.each(ntnData["SSN"], (digit, idx) => {
        form.getTextField(`SSN_${idx + 1}`).setText(digit);
      })


      // split phone number into two
      const phoneNumber_01 = ntnData['Phone'].substring(0, 3);
      const phoneNumber_02 = ntnData['Phone'].substring(3, ntnData['Phone'].length);
      form.getTextField("Home Phone_1").setText(phoneNumber_01);
      form.getTextField("Home Phone_2").setText(phoneNumber_02);
      form.getTextField("Mobile Phone_1").setText(phoneNumber_01);
      form.getTextField("Mobile Phone_2").setText(phoneNumber_02);
      
      // fillout printed name and date
      const printedName = `${restData['First Name']}${_.isUndefined(restData['Middle Name']) ? " " : ` ${restData['Middle Name']} `}${restData['Last Name']}`
      form.getTextField("Printed Name").setText(printedName);
      form.getTextField("Printed Date").setText(restData['Date']);


    } else {
      restData = data;
    }

    console.log(company.form_json)

    _.map(restData, (value, key) => {
      console.log(key, value);
      if (company.form_json[key].field_type === "checkbox") {
        // console.log(value, key);
        const checkboxField = form.getCheckBox(key);
        if (value) {
          checkboxField.check();
        }
        
      } else { // textfield
        const nameField = form.getTextField(key);
        nameField.setText(value);

      }
    });

    if (company.custom_letter_required) {
      const dateField = form.getTextField("Date");
      dateField.setText(moment().format("MMMM D, YYYY"));

      const tenantNameField = form.getTextField("Tenant Name");
      tenantNameField.setText(data["Name"]);

      const companyNameField = form.getTextField("Company");
      companyNameField.setText(company.company_mail_name);

      const addressField = form.getTextField("Company Address");
      addressField.setText(company.company_address);

      const cityField = form.getTextField("Company City");
      cityField.setText(`${company.company_city}, `);

      const stateField = form.getTextField("Company State");
      stateField.setText(`${company.company_state} ${company.company_zip_code}`);

    }

    form.flatten();

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], {type: "application/pdf"}), `${company.name}_request_form.pdf`);
  }
  
  const renderTextField = (field, key) => {
    return (
      <FormControl className="pt-5" key={key}>
        <FormLabel>{field.label}</FormLabel>
        <Input 
          color={errors[field.field_name] ? "danger" : "primary"} 
          {
            ...register(field.field_name, 
              { 
                required: { value: field.required, message: "This field is required." },
                pattern: 
                  field.pattern ? 
                  { value: new RegExp(field.pattern.value), message: field.pattern.message } 
                  : false
              }
            )
          } 
          placeholder={field.placeholder} />
         <FormHelperText>
          {
            errors[field.field_name] ? 
            <span className="text-red">{errors[field.field_name].message}</span> : 
            (field.required ? <>Required. </> : <>Optional. </>)
          }
        </FormHelperText>
        <FormHelperText>
          {field.caption}
        </FormHelperText>
      </FormControl>
    );
  }

  const renderCheckBox = (checkboxField, key) => {

    return (
      <FormControl className="pt-5" key={key}>
        <Controller
            name={checkboxField.field_name}
            control={control}
            rules={{ 
                required: { value: checkboxField.required, message: "This field is required." },
                pattern: 
                  checkboxField.pattern ? 
                  { value: new RegExp(checkboxField.pattern.value), message: checkboxField.pattern.message } 
                  : false
              }}
            defaultValue=""
            render={({ field }) => {
              return (
                <Checkbox {...field} label={checkboxField.label} />
              )
            }}
          />
          
         <FormHelperText>
          {
            errors[checkboxField.label] ? 
            <span className="text-red">{errors[checkboxField.label].message}</span> : 
            (checkboxField.required ? <>Required. </> : <>Optional. </>)
          }
        </FormHelperText>
        <FormHelperText>
          {checkboxField.caption}
        </FormHelperText>
      </FormControl>
    )
  }

  return (
    <>
      <div className="py-5">
        We understand that entering your personal information may be a concern. However, please be assured that this tool is designed to work within your browser (or your phone), and therefore <span className="font-bold">we do not transmit or store any of the information you enter.</span> Think of it like using a word processor on your computer.
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          _.map(company.form_json, (field, key) => {
            if (field.field_type === "checkbox") {
              return renderCheckBox(field, key);
            } else { //
              return renderTextField(field, key);
            }
          })
          
        }
        <FormControl className="pt-5">
          <Button disabled={!isDirty || !isValid} type="submit" size="lg">
            Download {company.name} Request Report Form
          </Button>  
        </FormControl>
      </form>
      
    </>
  )
};

export default PDFFillingForm;