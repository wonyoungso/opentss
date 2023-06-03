import * as React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import { useLoaderData } from "react-router-dom";
import { FormControl } from "@mui/joy";
import Button from "@mui/joy/Button";

const ConfirmEmail = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();
  const { responseJson } = useLoaderData();
  let { locale } = useParams();


  useEffect(() => {
    document.title = "Retrieve Your Submission | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  return (
    <>
      <Header bg="bright" />
        <div className="container mx-auto px-5">
          <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              Email Confirmation
            </div>
            <div className="lg:col-span-3">
              <h2 className="font-bold text-4xl">
                Thank you, your email address is confirmed.
              </h2>
              <div className="py-3">
                Your email address ({responseJson.email}) is confirmed.
              </div>


              <FormControl>
                <Button onClick={() => { navigate(`/${locale}`)}}>Go to First Page</Button>
              </FormControl>
                

              <div className="h-48"></div>

            </div>
            <div className="lg:col-span-2"></div>
          </div>
        </div>
      <Footer bg="bright" />
    </>
  );
};

export default ConfirmEmail;