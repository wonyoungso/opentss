import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";

const About = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About This Project | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-black text-white";
    setMenuOpen(false);
  }, []);
  

  return (
    <>
      <Header bg="black" />
    </>
  );
};

export default About;