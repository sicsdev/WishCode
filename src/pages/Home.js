import React, { useState, useEffect } from "react";
import FrontHeader from "../Component/front/front-header";
import FrontFooter from "./frontFooter";
import FrontPageBanner from "../Component/front/FrontPageBanner";
import HomeCompanies from "../Component/front/HomeCompanies";
import HomeFeatures from "../Component/front/HomeFeatures";
import HomeBottom from "../Component/front/HomeBottom";
import { getRequestApi } from "../helper/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Component/Loader";

const Home = () => {
  const [loader, setloader] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [featureList, setFeatureList] = useState([]);

  useEffect(() => {
    getCompanyLists();
    getFeaturesList();
  }, []);

  const getCompanyLists = async () => {
    // setloader(true);
    let response = await getRequestApi(`/front/company_list`);
    if (response) {
      // setloader(false);
      if (response.data.data) {
        setCompanyList(response.data.data);
      } else {
        // setloader(false);
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      setloader(false);
    }
  };

  const getFeaturesList = async () => {
    // setloader(true);
    let response = await getRequestApi(`/front/feature_list`);
    if (response) {
      // setloader(false);
      if (response.data.data) {
        setFeatureList(response.data.data);
      } else {
        // setloader(false);
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      setloader(false);
    }
  };
  return (
    <>
      <div className="main-body">
        <FrontHeader />
        <div className="home_wrapper">
          <FrontPageBanner />
          <HomeCompanies companyList={companyList} />
          <HomeFeatures featureList={featureList} />
          <HomeBottom />
          <FrontFooter />
        </div>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Home;
