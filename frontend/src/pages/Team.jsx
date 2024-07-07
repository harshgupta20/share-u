import React from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginStepper from "../components/LoginStepper";

const Team = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <div className="grid place-items-center h-screen">
       Team page
      </div>
      <Footer />
    </>
  );
};

export default Team;
