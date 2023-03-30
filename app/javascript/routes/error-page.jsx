import * as React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";



const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header bg="bright" />
        <div className="container mx-auto px-5">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      <Footer bg="bright" />
    </>
  )
}

export default ErrorPage;