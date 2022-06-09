import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { useParams } from "react-router-dom";
import { getRequestApi } from "../../helper/Helper";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViewCompanyFeaturesCom from "../../Component/features/ViewCompanyFeaturesCom";

const ViewCompanyFeatures = () => {
  const { id } = useParams();
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

  const getAllCompanyFeatures = async () => {
    setloader(true);
    let response = await getRequestApi(`/dashboard/feature/company/${id}`);
    if (response) {
      settotalCompanyFeatures(response.data.data);
    }
    setloader(false);
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
                companyId={id}
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

export default ViewCompanyFeatures;
