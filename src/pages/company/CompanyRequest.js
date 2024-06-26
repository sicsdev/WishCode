import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { Link } from "react-router-dom";
import ApproveFeatureReqCom from "../../Component/admin/ApproveFeatureReqCom";
import { useState, useEffect } from "react";
import { getRequestApi } from "../../helper/Helper";
import Loader from "../../Component/Loader";
import { useColor } from "../../commanapi/ColorProvider";

const CompanyRequest = () => {
  const [loader, setloader] = useState(false);
  const [pendingFeatureRequests, setPendingFeatureRequests] = useState([]);
  const tokens = localStorage.getItem("token");
  const { isToggleOpen, toggleMenu } = useColor();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  useEffect(() => {
    getPendingFeatureData();
  }, []);

  const getPendingFeatureData = async () => {
    setloader(true);
    let response1 = await getRequestApi("/admin/company/pending-posts");
    if (response1) {
      setPendingFeatureRequests(response1.data.data);
      setloader(false);
    }
  };
  return (
    <>
      <div className="main-body">
        <Sidebar isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}>
          <Header isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}/>
          <section className="body-content-inner">
            <div className="container">
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
    </>
  );
};

export default CompanyRequest;
