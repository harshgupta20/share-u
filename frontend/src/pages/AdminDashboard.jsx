import React from "react";
import AdminTabs from "../components/AdminTabs";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <AdminTabs />
      <Footer />
    </>
  );
};

export default AdminDashboard;
