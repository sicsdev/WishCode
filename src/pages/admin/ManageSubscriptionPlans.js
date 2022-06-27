import React, { useState, useEffect } from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";
import axiosConfig from "../../base_url/config";

const ManageSubscriptionPlans = () => {
  const [pageLoad, setPageLoad] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllPlans();
  }, []);

  const getAllPlans = async () => {};

  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">Manage Plans</h5>
                </div>
                {pageLoad === true ? (
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive custom-table">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">Company Name</th>
                                <th scope="col">Subscription Status</th>
                                <th scope="col" className="text-center">
                                  User Name
                                </th>
                                <th scope="col" className="text-center">
                                  Email
                                </th>
                                <th scope="col" className="text-center">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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

export default ManageSubscriptionPlans;
