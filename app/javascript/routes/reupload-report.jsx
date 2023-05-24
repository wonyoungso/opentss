import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import { useLoaderData } from "react-router-dom";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ArrowBack } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import { FormControl } from "@mui/joy";
import Button from "@mui/joy/Button";
import Table from '@mui/joy/Table';
import _ from 'lodash';
import moment from "moment";

const ReuploadReport = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(0);
  const [errors, setErrors] = useState([]);
  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const { responseJson } = useLoaderData();


  const changeHandler = (event) => {
    let newFiles = [ ...files ];

    _.each(event.target.files, file => {
      newFiles.push(file)
    });
    
    setFiles(newFiles);
	};


  const goBack = () => {
    navigate(`/retrieve-submission/${responseJson.token}`);
  }

  const checkStatus = () => {
    return files.length === 0;
  }

  useEffect(() => {
    document.title = "Reupload your tenant screening report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  const removeHandler = (idx) => {
    let newFiles = [ ...files ];

    newFiles.splice(idx, 1);

    setFiles(newFiles);
  }

  const submit = async () => {
    const token = document.querySelector('[name=csrf-token]').content;
    const url = `/api/submissions/retrieve_result/${responseJson.token}/reupload_report_submit.json`;
    const headers = {
      'X-CSRF-Token': token
    }

    const formData  = new FormData();
    
    _.each(files, file => {
      formData.append("files[]", file);
    })


    setStatus(1);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers
    });
    
    if (response.ok) {
      const data = await response.json();
      setFiles([]);
      setStatus(2);

    } else {
      const data = await response.json();
      setErrors(data.errors);
      setStatus(3);
    }
  }

  return (
    <>
      <Header bg="bright" />
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              <button onClick={goBack}><ArrowBack /> Back</button><br/><br/>
              Reupload Report
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                Please reupload your tenant screening report.
              </h2>
              <div className="pb-5"></div>
              <p>
                We may ask you to reupload because either 1) the report is not legible or 2) there is an unexpected error so we couldn't properly obtain your report.
              </p>
              {
                status === 2 ?
                <div className="pt-5">
                  Your reupload request is successfully submitted. After we check your newly submitted report, we will issue an e-gift card to your email.
                </div> : null
              }

              {
                status === 3 ?
                <div className="pt-5">
                  There is an unexpected error. <br/><br/>
                  
                  <span className="text-red">
                  { JSON.stringify(errors) }
                  </span><br/><br/>
                  
                  Please try again later or contact to <a href="mailto:opentss@mit.edu">opentss@mit.edu</a>.
                </div> : null
              }

              {
                status === 0 ?
                <>
                <div className="mt-5 py-10 px-10 bg-dark-blue-op-10 rounded-md">  
                  <FormControl>
                    <Button variant="contained" component="label" startDecorator={<PhotoCamera />}>
                      Choose File...
                      <input hidden accept="image/heic, image/heif, image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword" multiple type="file" onChange={changeHandler} />
                    </Button>
                  </FormControl>
                </div>
                <div className="mt-5 font-bold border-b border-b-dark-blue-bg pb-2">
                  Uploaded Files
                </div>
                <div>
                  {
                    files.length > 0 ?
                    _.map(files, (file, i) => {
                      return (
                        <div key={i} className="py-3 flex justify-between items-center border-b border-b-white-op-10 last:border-b-dark-blue-bg">
                          <div className="text-sm">
                            { file.name }
                          </div>
                          <div className="hover:opacity-50 cursor-pointer" onClick={_.bind(removeHandler, null, i) }>
                            <Close />
                          </div>
                        </div>
                      )
                    }) : 
                    <div className="py-3 border-b border-b-dark-blue-bg text-sm text-white-op-70">
                      No files are attached.
                    </div>
                  }
                </div>
                </> : null
              }
              <div className="h-80" />
            </div>
          </div>
        </div>
        {
          status <= 1 ?
          <div className="fixed bottom-0 py-5 w-full z-50 bg-white-bg">
            <div className="container mx-auto px-5">
              <div className="lg:grid lg:grid-cols-6 lg:gap-5">
                <div className="hidden lg:block"></div>
                <div className="lg:col-span-3">
                  <div className="pb-3 font-bold">
                    You send your report through end-to-end-encryption. We will remove every identifiable information and store it to a secured server.
                  </div>
                  <FormControl>
                    <Button disabled={checkStatus()} loading={status === 1} onClick={submit}>Submit</Button>
                  </FormControl>
                </div>
              </div>
            </div>
          </div> : null
        } 
        
    </>
  );
};

export default ReuploadReport;