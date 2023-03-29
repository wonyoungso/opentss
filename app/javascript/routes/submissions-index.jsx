import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";

const SubmissionsIndex = () => {

  const { windowWidth } = useContext(store);
  const navigate = useNavigate();


  useEffect(() => {
    document.title = "Retrieve Your Submission | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
  }, []);

  return (
    <>
      <Header bg="bright" />
      <Footer bg="bright" />
    </>
  );
};

export default SubmissionsIndex;