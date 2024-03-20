import React from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { Link } from "react-router-dom";
import ApproveRequestCom from "../../Component/admin/ApproveRequestCom";
import { useState, useEffect } from "react";
import Loader from "../../Component/Loader";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequestApi } from "../../helper/Helper";
import ApproveFeatureReqCom from "../../Component/admin/ApproveFeatureReqCom";

const ApproveRequest = () => {
  const [loader, setloader] = useState(false);
  const [pendingCompanyList, setPendingCompanyList] = useState([]);
  const [frontPendingCompanyList, setFrontPendingCompanyList] = useState([]);
  const [pendingFeatureRequests, setPendingFeatureRequests] = useState([]);
  const [claimRequests, setClaimRequest] = useState([]);
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  useEffect(() => {
    getApproveRequestData();
    getPendingFeatureData();
    getClaimRequest();
  }, []);

  const getApproveRequestData = async () => {
    setloader(true);
    let response = await getRequestApi("/admin/company/pending-request");

    if (response) {
      setPendingCompanyList(response.data.data.companies);
      setFrontPendingCompanyList(response.data.data.pendingCompanyRequest);
      setloader(false);
    }
  };

  const getPendingFeatureData = async () => {
    setloader(true);
    let response1 = await getRequestApi("/admin/company/pending-posts");
    if (response1) {
      setPendingFeatureRequests(response1.data.data);
      setloader(false);
    }
  };

  const getClaimRequest = async () => {
    setloader(true);
    let response = await getRequestApi(`/admin/company/claim-requests/claim`);
    if (response) {
      setClaimRequest(response.data.data);
      setloader(false);
    }
  };
  return (
    <>
      <div className="main-body">
        <Sidebar>
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <ApproveRequestCom
                pendingCompanyList={pendingCompanyList}
                frontPendingCompanyList={frontPendingCompanyList}
                loader={loader}
                setloader={setloader}
                getPageData={getApproveRequestData}
                getClaimRequest={getClaimRequest}
                claimRequests={claimRequests}
              />
              <ApproveFeatureReqCom
                pendingFeatureList={pendingFeatureRequests}
                loader={loader}
                setloader={setloader}
                getPageData={getPendingFeatureData}
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

export default ApproveRequest;
