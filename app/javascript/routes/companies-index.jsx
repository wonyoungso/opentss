import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { store } from "../providers/TSSProvider";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";

const ComapniesIndex = () => {

  const { setMenuOpen } = useContext(store);
  const navigate = useNavigate();


  useEffect(() => {
    document.title = "Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening";
    document.body.className = "bg-white-bg text-dark-blue";
    setMenuOpen(false);
  }, []);

  return (
    <>
      <Header bg="bright" />
      <Footer bg="bright" />
    </>
  );
};

export default ComapniesIndex;