import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { store } from "../providers/TSSProvider";
import FormControl from '@mui/joy/FormControl';
import Button from "@mui/joy/Button";
import _ from 'lodash';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Close } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";

const UploadReport = () => {

  const { submission, setSubmission, setSubmissionStep } = useContext(store);
  
  const goToNextStep = () => {
    setSubmissionStep(3);
  }
  const goBack = () => {
    setSubmissionStep(1);
  }


  const changeHandler = (event) => {
    let newSubmission = { ...submission };

    _.each(event.target.files, file => {
      submission.files.push(file)
    });
    
    setSubmission(newSubmission);
	};

  const checkStatus = () => {
    return submission.files.length === 0;
  }

  const removeHandler = (idx) => {
    let newSubmission = { ...submission };

    newSubmission.files.splice(idx, 1);

    setSubmission(newSubmission);
  }

  return (
    <>
       <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            <button onClick={goBack}><ArrowBack /> Back</button><br/><br/>
            Upload Report
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              Please upload your tenant screening report.
            </h2>
            <div className="pb-5"></div>
            <p>
              * If you do not have your copy of the tenant screening report, <Link to="/request-copy" className="underline">please click here and request a copy to your tenant screening service</Link>.
            </p>

            <div className="pt-5">
              <p className="pt-1">
                <span className="font-bold">If you have your physical report on you:</span> First, take photos of each page of the report. Then, upload all the photos here.
              </p>
              <p className="pt-3">
              <span className="font-bold">If you have a PDF file that you received from the tenant screening company:</span> please attach the PDF file here.
              </p>

              <div className="mt-5 py-10 px-10 bg-dark-blue-op-10 rounded-md">  
                <FormControl>
                  <Button variant="contained" component="label" startDecorator={<PhotoCamera />}>
                    Choose File...
                    <input hidden accept="image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword" multiple type="file" onChange={changeHandler} />
                  </Button>
                </FormControl>
              </div>

              <div className="mt-5 font-bold border-b border-b-dark-blue-bg pb-2">
                Uploaded Files
              </div>
              {
                _.map(submission.files, (file, i) => {
                  return (
                    <div key={i} className="py-3 flex justify-between items-center border-b border-b-white-op-10">
                      <div className="text-sm">
                        { file.name }
                      </div>
                      <div className="hover:opacity-50 cursor-pointer" onClick={_.bind(removeHandler, null, i) }>
                        <Close />
                      </div>
                    </div>
                  )
                })
              }


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
              <div className="pb-3 font-bold">
                You send your report through end-to-end-encryption. We will remove every identifiable information and store it to a safe.
              </div>
              <FormControl>
                <Button disabled={checkStatus()} onClick={goToNextStep}>Next</Button>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadReport;