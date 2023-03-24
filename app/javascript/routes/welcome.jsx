import * as React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      Here is welcome page.
      <Link to={'/tss-companies'}>companies</Link>
   </>
  )
}

export default Welcome;