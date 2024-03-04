import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axiosConfig from "../base_url/config";
import FeatureComp from "../Component/FeatureComp";
import Loader from "../Component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequestApi } from "../helper/Helper";

const ViewProduct = () => {
  const { id } = useParams();
  const { filter_type } = useParams();
  const [companyFeatures, setCompanyFeatures] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [loader, setloader] = useState(false);
  const [companyData, setCompanyData] = useState("");
  const [productData, setProductData] = useState("");
  const [companyId,setCompanyId]= useState("");
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
      .get(`/dashboard/feature/${filter_type}/${id}`, config)
      .then((response) => {
        setCompanyId(response?.data?.data[0]?.company_id);
        setCompanyFeatures(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error.message);
      })
      .finally(() => {
        setloader(false);
      });
  };
  const getCompanyData = async () => {
    setloader(true);
    if (filter_type === "company") {
      let response = await getRequestApi(`/company/get/${id}`);
      if (response) {
        setloader(false);
        setCompanyData(response?.data?.data);
      } else {
        setloader(false);
      }
    } else {
      let response = await getRequestApi(`/product/get/${id}`);
      if (response) {
        setloader(false);
        
        setProductData(response?.data?.data);
        
      } else {
        setloader(false);
      }
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
                {
                  <FeatureComp
                    features={companyFeatures}
                    companyID={companyId}
                    suggestFeature={true}
                    getPageData={getProductData}
                    companyData={companyData}
                    filter_type={filter_type}
                    productData={productData}
                  />
                }
             
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
