import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { store } from "../providers/TSSProvider";
import FormControl from '@mui/joy/FormControl';
import Button from "@mui/joy/Button";
import _ from 'lodash';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Close } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import Select from '@mui/joy/Select';
import FormHelperText from '@mui/joy/FormHelperText';
import Option from '@mui/joy/Option';
import { useTranslation, Trans } from "react-i18next";

const months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
const years = _.map(_.range(2023, 1960, -1), year => _.toString(year));

const UploadReport = () => {

  const { submission, setSubmission, setSubmissionStep, setHeaderMode } = useContext(store);

  let { locale } = useParams();
  const { t } = useTranslation();

  const goToNextStep = () => {
    window.scrollTo(0, 0);
    setSubmissionStep(3);
  }
  const goBack = () => {
    window.scrollTo(0, 0);
    
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
    return submission.files.length === 0 || _.isNull(submission.report_date_month) || _.isNull(submission.report_date_year);
  }

  const removeHandler = (idx) => {
    let newSubmission = { ...submission };

    newSubmission.files.splice(idx, 1);

    setSubmission(newSubmission);
  }

  const reportDateMonthChange = (evant, value) => {
    console.log(value);
    setSubmission({
      ...submission,
      report_date_month: value
    })
  }

  const reportDateYearChange = (event, value) => {
    setSubmission({
      ...submission,
      report_date_year: value
    })
  }

  useEffect(() => {

    setHeaderMode("focus");

    return () => {

      setHeaderMode("normal");
    };
  }, [])

  return (
    <>
       <div className="container mx-auto px-5">
        <div className="lg:grid lg:grid-cols-6 lg:gap-5">
          <div>
            <button onClick={goBack}><ArrowBack /> { t("Back") }</button><br/><br/>
            { t("Upload Report") }
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-bold text-4xl">
              { t("Please upload your tenant screening report.") }
            </h2>
            <div className="pb-5"></div>

            <Trans i18nKey="upload_report.title_desc">
              <p className="pt-1">
                <span className="font-bold">If you have your physical report on you:</span> First, take photos of each page of the report. Then, upload all the photos here.
              </p>
              <p className="pt-3">
                <span className="font-bold">If you have a PDF file that you received from the tenant screening company:</span> please attach the PDF file here.*
              </p>
            </Trans>
            
            

            <div className="pt-3">

              <div className="mt-5 py-10 px-10 bg-dark-blue-op-10 rounded-md">  
                <FormControl>
                  <Button variant="contained" component="label" startDecorator={<PhotoCamera />}>
                    { t("Choose File...") }
                    <input hidden accept="image/heic, image/heif, image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword" multiple type="file" onChange={changeHandler} />
                  </Button>
                </FormControl>
              </div>

              <div className="mt-5 font-bold border-b border-b-dark-blue-bg pb-2">
                { t("Uploaded Files") }
              </div>
              <div>
                {
                  submission.files.length > 0 ?
                  _.map(submission.files, (file, i) => {
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
                    { t("No files are attached.") }
                  </div>
                }
              </div>
                
              <div className="pt-10">
                <h3 className="font-bold pb-3">
                  { t("When approximately did you receive this report?") }
                </h3>

                <div className="flex gap-1 pb-1">
                  <Select placeholder={t("Month")} value={submission.report_date_month} onChange={reportDateMonthChange}>
                    {
                      _.map(months, month => {
                        return (
                          <Option key={month} value={month}>{t(month)}</Option>
                        )
                      })
                    }
                  </Select>
                  <Select placeholder={t("Year")} value={submission.report_date_year} onChange={reportDateYearChange}>
                    {
                      _.map(years, year => {
                        return (
                          <Option key={year} value={year}>{year}</Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <FormHelperText>
                  Required.
                </FormHelperText>
              </div>
              
              <Trans i18nKey="upload_report.copy_desc">
                <p className="text-sm pt-5 text-white-op-50">
                  * If you do not have your copy of the tenant screening report, <Link to={`/${locale}/request-copy`} className="underline">please click here and request a copy to your tenant screening report</Link>.
                </p>
              </Trans>
              

              <div className="h-60"></div>



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
                { t("You send your report through end-to-end encryption. We will remove every identifiable information and store it on a secured server.") }
              </div>
              <FormControl>
                <Button disabled={checkStatus()} onClick={goToNextStep}>{ t("Next") }</Button>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadReport;