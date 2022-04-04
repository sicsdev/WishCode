import React from "react";
import { Link } from "react-router-dom";

const CountDashboardCom = ({ dashBoardData }) => {
  return (
    <>
      {dashBoardData.data_type === "admin" ? (
        <div className="row">
          <div className="col-md-3">
            <Link to="/admin/companies">
              <div className="card-counter primary">
                <i className="fa fa-building"></i>
                <span className="count-numbers">
                  {dashBoardData.total_company}
                </span>
                <span className="count-name">Total Company</span>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/admin/users">
              <div className="card-counter primary">
                <i className="fa fa-users"></i>
                <span className="count-numbers">
                  {dashBoardData.total_users}
                </span>
                <span className="count-name">Total Users</span>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to="/admin/approve-request">
              <div className="card-counter primary">
                <i className="fa fa-clock-o"></i>
                <span className="count-numbers">
                  {dashBoardData.total_pending_request}
                </span>
                <span className="count-name">Pending Requests</span>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to="/admin/approve-request">
              <div className="card-counter primary">
                <i className="fa fa-clock-o"></i>
                <span className="count-numbers">
                  {dashBoardData.total_claim_request}
                </span>
                <span className="count-name">Pending Claim Request</span>
              </div>
            </Link>
          </div>
        </div>
      ) : dashBoardData.data_type === "company_admin" ? (
        <div className="row">
          <div className="col-md-3">
            <Link to="/company/all-users">
              <div className="card-counter primary">
                <i className="fa fa-users"></i>
                <span className="count-numbers">
                  {dashBoardData.total_company_users}
                </span>
                <span className="count-name">Company Users</span>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/company/approve-requests">
              <div className="card-counter primary">
                <i className="fa fa-clock-o"></i>
                <span className="count-numbers">
                  {dashBoardData.total_pending_features}
                </span>
                <span className="count-name">Pending Features</span>
              </div>
            </Link>
          </div>
        </div>
      ) : dashBoardData.data_type === "company" ? (
        ""
      ) : (
        ""
      )}
    </>
  );
};

export default CountDashboardCom;
