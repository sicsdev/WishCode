import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import axiosConfig from "../base_url/config";
import FeatureComp from "../Component/FeatureComp";
import Loader from "../Component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequestApi } from "../helper/Helper";

const ViewProduct = () => {
  let { id } = useParams();
  const [companyFeatures, setCompanyFeatures] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [loader, setloader] = useState(false);
  const [companyData, setCompanyData] = useState("");

  let ciphertext = id
    .replace(/p1L2u3S/g, "+")
    .replace(/s1L2a3S4h/g, "/")
    .replace(/e1Q2u3A4l/g, "=");
  let bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  id = decryptedData;
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getProductData();
    getCompanyData();
  }, [id]);

  const getProductData = () => {
    setloader(true);
    axiosConfig
      .get(`/products/company/${id}`, config)
      .then((response) => setCompanyFeatures(response.data.data))
      .catch((error) => {
        setloader(false);
        seterrorMessage(error.message);
        console.error("There was an error!", error);
      });
    setloader(false);
  };
  const getCompanyData = async () => {
    setloader(true);
    let response = await getRequestApi(`/company/get/${id}`);
    if (response) {
      setloader(false);
      setCompanyData(response.data.data);
    } else {
      setloader(false);
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
                {
                  <FeatureComp
                    features={companyFeatures}
                    companyID={id}
                    suggestFeature={true}
                    getPageData={getProductData}
                    companyData={companyData}
                  />
                }
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

export default ViewProduct;
