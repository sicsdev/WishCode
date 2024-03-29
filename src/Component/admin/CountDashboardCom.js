import React from "react";
import { Link } from "react-router-dom";

const CountDashboardCom = ({ dashBoardData }) => {
  return (
    <>
      {dashBoardData?.data_type === "admin" ? (
        <div className="row">
          <div className="col-md-3">
            <Link to="/admin/companies">
              <div className="card-counter primary">
                <i className="fa fa-building"></i>
                <span className="count-numbers custom-span">
                  {dashBoardData?.total_company}
                </span>
                <span className="count-name custom-span">Total Company</span>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/admin/users">
              <div className="card-counter primary">
                <i className="fa fa-users"></i>
                <span className="count-numbers custom-span">
                  {dashBoardData?.total_users}
                </span>
                <span className="count-name custom-span">Total Users</span>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to="/admin/approve-request">
              <div className="card-counter primary">
                <i className="fa fa-clock-o"></i>
                <span className="count-numbers custom-span">
                  {dashBoardData?.total_pending_request}
                </span>
                <span className="count-name custom-span">Pending Requests</span>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to="/admin/approve-request">
              <div className="card-counter primary">
                <i className="fa fa-clock-o"></i>
                <span className="count-numbers custom-span">
                  {dashBoardData?.total_claim_request}
                </span>
                <span className="count-name custom-span">Pending Claim Request</span>
              </div>
            </Link>
          </div>
        </div>
      ) : dashBoardData?.data_type === "company_admin" ? (
        <div className="row">
          <div className="col-md-3">
            <Link to="/company/all-users">
              <div className="card-counter primary">
                <i className="fa fa-users"></i>
                <span className="count-numbers custom-span">
                  {dashBoardData?.total_company_users}
                </span>
                <span className="count-name custom-span">Company Users</span>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/company/approve-requests">
              <div className="card-counter primary">
                <i className="fa fa-clock-o"></i>
                <span className="count-numbers custom-span">
                  {dashBoardData?.total_pending_features}
                </span>
                <span className="count-name custom-span">Pending Features</span>
              </div>
            </Link>
          </div>
        </div>
      ) : dashBoardData?.data_type === "company_user" ? (
        <div className="row">
        <div className="col-md-3">
          <Link to="/features">
            <div className="card-counter primary">
              <i className="fa fa-clock-o"></i>
              <span className="count-numbers custom-span">
                {dashBoardData?.total_not_completed_features}
              </span>
              <span className="count-name custom-span">Pending Features</span>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="">
            <div className="card-counter primary">
              <i className="fa fa-building"></i>
              <span className="count-numbers custom-span">
                {dashBoardData?.total_votes_on_company}
              </span>
              <span className="count-name custom-span">Total Votes Features</span>
            </div>
          </Link>
        </div>
      </div>
      ) : (
      //   <div className="row">
      //   <div className="col-md-3">
      //     <Link to="/company/all-users">
      //       <div className="card-counter primary">
      //         <i className="fa fa-clock-o"></i>
      //         <span className="count-numbers">
      //           {dashBoardData?.total_not_completed_features}
      //         </span>
      //         <span className="count-name">Pending Features</span>
      //       </div>
      //     </Link>
      //   </div>
      //   <div className="col-md-3">
      //     <Link to="/company/approve-requests">
      //       <div className="card-counter primary">
      //         <i className="fa fa-clock-o"></i>
      //         <span className="count-numbers">
      //           {dashBoardData?.total_pending_features}
      //         </span>
      //         <span className="count-name">Pending Features</span>
      //       </div>
      //     </Link>
      //   </div>
      // </div>
      ""
      )}
    </>
  );
};

export default CountDashboardCom;
