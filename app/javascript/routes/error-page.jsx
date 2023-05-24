import * as React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { store } from "../providers/TSSProvider";



const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const { setMenuOpen } = useContext(store);
 
  useEffect(() => {
    document.title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";

    setMenuOpen(false);

  }, []);

  return (
    <>
      <Header bg="bright" />
        <div className="container mx-auto px-5">
           <div className="lg:grid lg:grid-cols-6 lg:gap-5">
            <div>
              Error Occured
            </div>
            <div className="lg:col-span-3">
              
              <p className="font-bold text-4xl">Sorry, an unexpected error has occurred.</p>

              <p className="pt-3">
                {error.data }
              </p>
            </div>
          </div>
        </div>
      <Footer bg="bright" />
    </>
  )
}

export default ErrorPage;