import { PDFDocument } from 'pdf-lib'
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import _ from 'lodash';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from "@mui/joy/Button";
import Input from '@mui/joy/Input';
import { FormLabel } from '@mui/joy';
import { useForm } from "react-hook-form";



const PDFFillingForm = (props) => {
  const { company } = props;
  const { register, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({ mode: "onChange" });
  // const [data, setData] = useState("");

  async function onSubmit(data){
    const existingPdfBytes = await fetch(company.request_form_url).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm()
    
    // Get two text fields from the form
    _.map(data, (value, key) => {
      const nameField = form.getTextField(key);
      nameField.setText(value);
    });

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], {type: "application/pdf"}), `amrent_request_form.pdf`);
  }

  return (
    <>
      <div className="py-5">
        We understand that entering your personal information may be a concern. Please be assured that this tool is designed to work within your browser (or your phone), and therefore <span className="font-bold">we do not transmit or store any of the information you enter.</span> Think of it like using a word processor on your computer.
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          _.map(company.form_json, (field, key) => {
            return (
              <FormControl className="pt-5" key={key}>
                <FormLabel>{field.label}</FormLabel>
                <Input 
                  color={errors[field.label] ? "danger" : "primary"} 
                  {
                    ...register(field.label, 
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
                    errors[field.label] ? 
                    <span className="text-red">{errors[field.label].message}</span> : 
                    (field.required ? <>Required. </> : <>Optional. </>)
                  }
                </FormHelperText>
                <FormHelperText>
                  {field.caption}
                </FormHelperText>
              </FormControl>
            )
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