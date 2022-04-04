import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axiosConfig from "../../base_url/config";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewCompanyUserCom = ({
  totalCompanyUsers,
  editViewUser,
  getPageData,
  addUser,
  companyName
}) => {
  const [loader, setloader] = useState(false);
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  const deleteCompanyUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this User?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        setloader(true);
        try {
          const { data } = axiosConfig.delete(
            `/company-admin/user/delete/${id}`,
            config
          );
          setloader(false);
          toast.success("User Deleted Successfully!", {
            position: "bottom-right",
            autoClose: 2000,
          });
          getPageData();
        } catch {
          setloader(false);
          toast.error("Unable to delete the user!", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    });
  };

  return (
    <>
      <div className="dashboard card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">{companyName}</h5>
          <Link
            to=""
            className="btn btn-lg-primary text-white"
            onClick={(e) => {
              addUser();
            }}
          >
            Add User
          </Link>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive custom-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col" className="text-center">
                        Email
                      </th>
                      <th scope="col" className="text-center">
                        Role
                      </th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalCompanyUsers.map((user, key) => (
                      <tr key={key}>
                        <td>{user.name}</td>
                        <td className="text-center">
                          <a href={`mailto: ${user.email}`}>{user.email}</a>
                        </td>
                        <td className="text-center">Company User</td>
                        <td className="text-center">
                          <div className="action-btn">
                            <Link to={`/company/user/${user.id}`}>
                              <i
                                className="fa fa-eye"
                                aria-hidden="true"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="View"
                              ></i>
                            </Link>
                            <a
                              href="javascript:void(0)"
                              onClick={(e) => {
                                editViewUser(user);
                              }}
                            >
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                              ></i>
                            </a>
                            <a
                              href="javascript:void(0)"
                              onClick={(e) => {
                                deleteCompanyUser(user.id);
                              }}
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                              ></i>
                            </a>
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

export default ViewCompanyUserCom;
