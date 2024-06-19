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
import { useColor } from "../../commanapi/ColorProvider";

const Features = () => {
  const [totalCompanyFeatures, settotalCompanyFeatures] = useState([]);
  const [loader, setloader] = useState(false);
  const [completeFeature, setCompleteFeature] = useState("all");
  const tokens = localStorage.getItem("token");
  const {isToggleOpen,toggleMenu}=useColor();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getAllCompanyFeatures(completeFeature);
  }, []);

  const getAllCompanyFeatures = (featureType) => {
    setloader(true);
    axiosConfig
      .get(`/company-admin/post/all?feature_type=${featureType}`, config)
      .then((response) => {
        settotalCompanyFeatures(response?.data?.data);
        setloader(false);
        setCompleteFeature(featureType)
      })
      .catch((data) => {
        setloader(false);
        toast.error(data.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };
  const handeCompleteToggle = (featureType) => {
    getAllCompanyFeatures(featureType);
  }
  console.log(totalCompanyFeatures,"toalfature")
  return (
    <>
      <div className="main-body">
        <Sidebar isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}>
          <Header isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}/>
          <section className="body-content-inner">
          <div className="container">
              <div className="row text-right align-items-center">
                <div className="switch-btn-wrapper mt-3 w-100 justify-content-end d-flex pr-3">
                  <b>Show/Hide Completed:</b>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="completeFeature"
                      checked={completeFeature == "completed"}
                      onChange={(e) => handeCompleteToggle(completeFeature == "all" ? "completed" : "all")}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="container">
              <ViewCompanyFeaturesCom
                totalCompanyFeatures={totalCompanyFeatures}
                getPageData={getAllCompanyFeatures}
                companyId={""}
              />
            </div>
          </section>
        </Sidebar>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Features;
