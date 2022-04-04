import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ApproveRequestCom = ({
  pendingCompanyList,
  frontPendingCompanyList,
  loader,
  setloader,
  getPageData,
  getClaimRequest,
  claimRequests,
}) => {
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  const updateCompanyStatus = async (id, status, request_type) => {
    swal({
      title: "Are you sure?",
      text: `You want to ${status} this Company ?`,
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        setloader(true);
        try {
          const { data } = await axiosConfig.post(
            `/admin/company/change-status`,
            {
              companyID: id,
              status: status,
              request_type: request_type,
            },
            config
          );
          setloader(false);
          getPageData();
          getClaimRequest();
          return toast.success(`Company Status ${status} Successfully!`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        } catch (error) {
          setloader(false);
          return toast.error(
            `${
              error.response.data.message &&
              error.response.data.message.companyID
                ? error.response.data.message.companyID[0]
                : error.response.data.message
            }`,
            {
              position: "bottom-right",
              autoClose: 2000,
            }
          );
        }
      }
    });
  };

  return (
    <>
      <div className="dashboard card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">Company Request</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive custom-table approve-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Company Name</th>
                      <th scope="col">Company URL</th>
                      <th scope="col">Requested By</th>
                      <th scope="col">Email</th>
                      <th scope="col">Created On</th>
                      <th scope="col">Request Type</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frontPendingCompanyList?.map((newCompany, key) => (
                      <tr key={key}>
                        <td>
                          <p>{newCompany.company_name}</p>
                        </td>
                        <td>
                          <p>
                            <a href={newCompany.company_url} target="_blank">
                              {newCompany.company_url}
                            </a>
                          </p>
                        </td>
                        <td>
                          <p>{newCompany.name}</p>
                        </td>
                        <td>
                          <p>{newCompany.email}</p>
                        </td>
                        <td>
                          <p>{moment(newCompany.created_at).format("LL")}</p>
                        </td>
                        <td>
                          <p>New Company</p>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              type="button"
                              className="btn btn-lg-primary debny-btn w-100 mr-3"
                              onClick={(e) =>
                                updateCompanyStatus(
                                  newCompany.id,
                                  "rejected",
                                  "newFront"
                                )
                              }
                            >
                              Deny
                            </button>

                            <button
                              type="button"
                              className="btn btn-success approv-btn w-100"
                              onClick={(e) =>
                                updateCompanyStatus(
                                  newCompany.id,
                                  "approved",
                                  "newFront"
                                )
                              }
                            >
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {pendingCompanyList?.map((company, key) => (
                      <tr key={key}>
                        <td>
                          <p>{company.company_name}</p>
                        </td>
                        <td>
                          <p>
                            <a href={company.company_url} target="_blank">
                              {company.company_url}
                            </a>
                          </p>
                        </td>
                        <td>
                          <p>{company.name}</p>
                        </td>
                        <td>
                          <p>{company.email}</p>
                        </td>
                        <td>
                          <p>{moment(company.created_at).format("LL")}</p>
                        </td>
                        <td>
                          <p>New Company</p>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              type="button"
                              className="btn btn-lg-primary debny-btn w-100 mr-3"
                              onClick={(e) =>
                                updateCompanyStatus(
                                  company.id,
                                  "rejected",
                                  "new"
                                )
                              }
                            >
                              Deny
                            </button>

                            <button
                              type="button"
                              className="btn btn-success approv-btn w-100"
                              onClick={(e) =>
                                updateCompanyStatus(
                                  company.id,
                                  "approved",
                                  "new"
                                )
                              }
                            >
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {claimRequests?.map((claims, key) => (
                      <tr key={key}>
                        <td>{claims.company_name}</td>
                        <td>{claims.company_url}</td>
                        <td>{claims.name}</td>
                        <td>
                          <p>{claims.email}</p>
                        </td>
                        <td>
                          <p>{moment(claims.created_date).format("LL")}</p>
                        </td>
                        <td>
                          <p>Claim Company</p>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              type="button"
                              className="btn btn-lg-primary debny-btn w-100 mr-3"
                              onClick={(e) =>
                                updateCompanyStatus(
                                  claims.request_id,
                                  "rejected",
                                  "claim"
                                )
                              }
                            >
                              Deny
                            </button>

                            <button
                              type="button"
                              className="btn btn-success approv-btn w-100"
                              onClick={(e) =>
                                updateCompanyStatus(
                                  claims.request_id,
                                  "approved",
                                  "claim"
                                )
                              }
                            >
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApproveRequestCom;
