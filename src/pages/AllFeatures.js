import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { useEffect, useState } from "react";
import FeatureComp from "../Component/FeatureComp";
import axiosConfig from "../base_url/config";

const AllFeatures = () => {
  const [allFeatures, setAllFeatures] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [completeFeature, setCompleteFeature] = useState("all");
  const [loader, setloader] = useState(false);
  const tokens = localStorage.getItem("token");
  useEffect(() => {
    getAllCompanyFeatures(completeFeature);
  }, [])
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  const getAllCompanyFeatures = (featureType) => {
    setloader(true);
    axiosConfig
      .get(`/features?feature_type=${featureType}`, config)
      .then((response) => {
        setAllFeatures(response?.data?.data);
        setloader(false);
        setCompleteFeature(featureType)
      });
  };
  const handeCompleteToggle = (featureType) => {
    getAllCompanyFeatures(featureType);
  }
  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
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

              {<FeatureComp features={allFeatures} getAllCompanyFeatures={getAllCompanyFeatures}/>}

            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AllFeatures;
