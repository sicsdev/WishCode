import React, { useState } from 'react'
import FrontHeader from './front-header'
import FrontFooter from '../../pages/frontFooter'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getRequestApi } from '../../helper/Helper';
import { useNavigate } from 'react-router-dom';

const FrontShowCase = () => {
  const { company_name } = useParams();
  const [showCaseData, setShowCaseData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getHomePageData(company_name);
  }, [company_name]);

  const getHomePageData = async (companyName) => {
    let webApiUrl;
    if (companyName !== null) {
      webApiUrl = `/front/dashboard?company_name=${companyName}`;
    } else {
      webApiUrl = `/front/dashboard`;
    }
    let response = await getRequestApi(webApiUrl);
    if (response) {
      if (response?.data?.data) {
        setShowCaseData(response?.data?.data?.showCaseData);
      } else {

      }
    }
  };
  return (
    <div className="main-body">

      <div className="latest-wishes-table show-case container py-5 " style={{ minHeight: "calc(100vh - 77px)" }}>
        <div className="title-bar d-flex">
          <button onClick={() => navigate(-1)} className="btn back-btn">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>
        <div className="dashboard card mt-5">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="text-uppercase">
              Showcase of Completed Items
            </h5>
          </div>
          <div className="table-responsive custom-table approve-table">
            <table className="table table-hover mb-2">
              <thead>
                <tr>
                  <th scope="col">Feature Wishes</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {showCaseData?.length > 0 ? (
                  showCaseData?.map((ShowCase, key) => (
                    <tr key={key}>
                      <td>{ShowCase.title}</td>
                      <td>{ShowCase.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    No Result Found...
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FrontFooter />
    </div>
  )
}

export default FrontShowCase