import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";

const HowTSSWorks = () => {

  const { windowWidth } = useContext(store);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "How Tenant Screening Service Works | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-dark-blue-bg text-white";
  }, []);
  

  return (
    <>
      <Header bg="dark" />
      <Footer bg="dark" />
    </>
  );
};

export default HowTSSWorks;