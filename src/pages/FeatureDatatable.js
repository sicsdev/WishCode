import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import { getRequestApi } from "../helper/Helper";
import Loader from "../Component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterDatatableCom from "../Component/filterDatatableCom";

const FeatureDatatable = () => {
  const [allFeatures, setAllFeatures] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    getAllfeatureData();
  }, []);

  const getAllfeatureData = async () => {
    setloader(true);
    let response = await getRequestApi("/feature/filter/all");
    if (response && response.data && response.data.data) {
      setAllFeatures(response.data.data);
      setloader(false);
    } else {
      setloader(false);
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };
  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <FilterDatatableCom data={allFeatures} title={"All Features"} />
              </div>
            </div>
          </section>
        </div>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default FeatureDatatable;
