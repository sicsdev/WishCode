import React, { useState, useEffect } from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";
import axiosConfig from "../../base_url/config";
import moment from "moment";
import { Link } from "react-router-dom";

const ManageSubscriptionPlans = () => {
  const [pageLoad, setPageLoad] = useState(false);
  const [loader, setloader] = useState(false);
  const [totalPlans, setTotalPlans] = useState([]);

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  useEffect(() => {
    getAllPlans();
  }, []);
  const getAllPlans = async (e) => {
    try {
      const { data } = await axiosConfig.get(
        "/admin/subscription/plans/all",
        config
      );
      console.log("thus", data)
      setTotalPlans(data.data);
      console.log("totalPlans", totalPlans)

      toast.success("User Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {

    }

  };




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
                {/* {pageLoad === true ? ( */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive custom-table">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Plan Name</th>
                              <th scope="col">Amount</th>
                              <th scope="col" className="text-">
                                Interval
                              </th>
                              <th scope="col" className="text-">
                                Date
                              </th>
                              <th scope="col" className="text-center">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalPlans?.map((plan, key) => (
                              <tr key={key}>
                                <td>{plan?.nickname}</td>
                                <td>{plan?.amount}</td>
                                <td>{plan?.interval}</td>
                                <td>{moment(plan?.created).format("DD-MMMM-YYYY")}</td>
                                <td className="text-center">
                                  <div className="action-btn">

                                    {/* <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="View"
                                    ></i> */}

                                    <a

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
                {/* ) : (
                  ""
                )} */}
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
