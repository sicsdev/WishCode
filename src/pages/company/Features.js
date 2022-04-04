import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewCompanyFeaturesCom from "../../Component/features/ViewCompanyFeaturesCom";
import Loader from "../../Component/Loader";

const Features = () => {
  const [totalCompanyFeatures, settotalCompanyFeatures] = useState([]);
  const [loader, setloader] = useState(false);
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getAllCompanyFeatures();
  }, []);

  const getAllCompanyFeatures = () => {
    setloader(true);
    axiosConfig
      .get("/company-admin/post/all", config)
      .then((response) => {
        settotalCompanyFeatures(response.data.data.data);
        setloader(false);
      })
      .catch((data) => {
        setloader(false);
        toast.error(data.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <ViewCompanyFeaturesCom
                totalCompanyFeatures={totalCompanyFeatures}
                getPageData={getAllCompanyFeatures}
                companyId={""}
              />
            </div>
          </section>
        </div>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Features;
