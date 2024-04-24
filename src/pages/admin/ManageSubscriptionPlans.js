import React, { useState, useEffect } from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";
import axiosConfig from "../../base_url/config";
import moment from "moment";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { useColor } from "../../commanapi/ColorProvider";

const ManageSubscriptionPlans = () => {
  const [pageLoad, setPageLoad] = useState(false);
  const [loader, setloader] = useState(false);
  const [show, setShow] = useState(false);
  const [totalPlans, setTotalPlans] = useState([]);
  const [planname, setPlanename] = useState('');
  const [amount, setAmount] = useState('');
  const [interval, setInterval] = useState("day");
  const { isToggleOpen, toggleMenu } = useColor();


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
      
      setTotalPlans(data.data);

    } catch (error) {

    }

  };
  const addPlanModal = (val) => {
    setShow(true);
    setPlanename("");
    setInterval("day");
    setAmount("");
  };
  const addPlanhandler = async (e) => {
    e.preventDefault();


    try {
      const { data } = await axiosConfig.post(
        "admin/subscription/plans/create",
        {
          nickname: planname,
          interval: interval,
          amount: amount,
        },
        config
      );
      setShow(false);
      getAllPlans();
      setPlanename("");
      setInterval("");
      setAmount("");
      
      toast.success("Plan Created Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${error.response.data.message && error.response.data.message.email
          ? error.response.data.message.email[0]
          : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  const deletePlan = async (price_id) => {
    swal({
      title: "Are you sure?",
      text: "You want to Delete the Plan?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const { data } = await axiosConfig.delete(
            `/admin/subscription/plans/delete/${price_id}`,
            config
          );
          swal("Deleted!", "You deleted the plan successfully!", "success");
          getAllPlans();
        } catch (error) {
          swal("Error!", error.message, "error");
        }
      }
    });
  };


  return (
    <>
      <div className="main-body">
      <Sidebar isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}>
          <Header isToggleOpen={isToggleOpen} toggleMenu={toggleMenu} />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">Manage Plans</h5>
                  <Link
                    to=""
                    className="btn btn-lg-primary"
                    onClick={(e) => {
                      addPlanModal();
                    }}

                  >
                    Add Plan
                  </Link>

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
                                <td>${plan?.amount / 100}</td>
                                <td>{plan?.interval}</td>
                                <td>{moment.unix(plan.created).format("MM/DD/YYYY")}</td>
                                <td className="text-center">
                                  <div className="action-btn">
                                    <a
                                      onClick={(e) => {
                                        deletePlan(plan.id);
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
                 {/* ) : (
                  ""
                )}  */}
              </div>
            </div>
          </section>
          </Sidebar>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
      <Modal show={show} >
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Create Plan</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            addPlanhandler(e);
          }}
        >
          <Modal.Body>
            <>
              <div className="input-form">
                <label>Plan Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Plan Name"
                  value={planname}
                  required
                  onChange={(e) => setPlanename(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  placeholder="Enter Amount"
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>Interval</label>

                <select
                  className="form-control"
                  onChange={(e) => {
                    setInterval(e.target.value)
                  }}
                >
                  <option
                    value="day"
                  >
                    Day
                  </option>
                  <option
                    value="week"
                  >
                    Week
                  </option>
                  <option
                    value="month"
                  >
                    Month
                  </option>
                  <option
                    value="year"
                  >
                    Year
                  </option>
                </select>
              </div>
      
            </>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-lg-primary">
              Submit
            </button>
            <Button
              variant="secondary"
              className="btn btn-lg-primary"
              onClick={(e) => {
                setShow(false);
              }}
            >
              Close Modal
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ManageSubscriptionPlans;
