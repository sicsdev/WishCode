import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import { getRequestApi } from "../helper/Helper";
import Loader from "../Component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterDatatableCom from "../Component/filterDatatableCom";
import { useColor } from "../commanapi/ColorProvider";

const FeatureDatatable = () => {
  const [allFeatures, setAllFeatures] = useState([]);
  const [loader, setloader] = useState(false);
  const [completeFeature, setCompleteFeature] = useState("all");
  const { isToggleOpen, toggleMenu } = useColor();
  useEffect(() => {
    getAllfeatureData(completeFeature);
  }, []);
  const getAllfeatureData = async (featureType) => {
    setloader(true);
    let response = await getRequestApi(`/feature/filter/all?feature_type=${featureType}`);
    if (response && response.data && response.data.data) {
      setAllFeatures(response.data.data);
      setCompleteFeature(featureType)
      setloader(false);
    } else {
      setloader(false);
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };
  const handeCompleteToggle = (featureType) => {
    console.log(featureType);
    getAllfeatureData(featureType);
  }
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

              <div className="dashboard card">
                <FilterDatatableCom data={allFeatures} title={"Features Priority List"} />
              </div>
            </div>
          </section>
        </Sidebar>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default FeatureDatatable;
