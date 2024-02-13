import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { useEffect, useState } from "react";
import FeatureComp from "../Component/FeatureComp";
import { getRequestApi } from "../helper/Helper";

const AllFeatures = () => {
  const [allFeatures, setAllFeatures] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");

  useEffect(async () => {
    let response = await getRequestApi("/features");
    if (response) {
      setAllFeatures(response.data.data);
    }
  }, []);

  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                {<FeatureComp features={allFeatures} />}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AllFeatures;
