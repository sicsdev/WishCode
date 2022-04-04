import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";

const AllCompanies = () => {
  const [company, setcompany] = useState("");
  const [user, setuser] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [companyId, setcompanyId] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loader, setloader] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);

  const editViewUser = (val) => {
    setShow(true);
    setcompany(val.company_name);
    setuser(val.name);
    setuserEmail(val.email);
    setcompanyId(val.id);
  };

  const [totalCompanies, settotalCompanies] = useState([]);

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    getAllCompanies();
  }, []);

  const getAllCompanies = () => {
    setloader(true);
    axiosConfig
      .get("/admin/company/all", config)
      .then((response) => {
        setloader(false);
        settotalCompanies(response.data.data);
        setPageLoad(true);
      })
      .catch((data) => {
        setloader(false);
        setPageLoad(true);
        toast.success(data.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };
  const updateCompanyhandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = await axiosConfig.put(
        `/admin/company/update/${companyId}`,
        {
          company_name: company,
          name: user,
        },
        config
      );
      setShow(false);
      getAllCompanies();
      toast.success("Company Updated Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${
          error.response.data.message &&
          error.response.data.message.company_name
            ? error.response.data.message.company_name[0]
            : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  const deleteCompany = (id) => {
    try {
      setloader(true);
      const { data } = axiosConfig.delete(
        `/admin/company/delete/${id}`,
        config
      );
      toast.success("Company Deleted Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      getAllCompanies();
      setloader(false);
    } catch {
      setloader(false);
      toast.error("Unable to delete the company!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">Company Name</h5>
                  <Link
                    to="/admin/add-company"
                    className="btn btn-lg-primary text-white"
                  >
                    Add Company
                  </Link>
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
                            <tbody>
                              {totalCompanies.length !== 0 ? (
                                totalCompanies.map((company, key) => (
                                  <tr key={key}>
                                    <td>
                                      <a>{company.company_name}</a>
                                    </td>
                                    <td>{company.subscription_status}</td>
                                    <td className="text-center">
                                      <a>{company.name}</a>
                                    </td>
                                    <td className="text-center">
                                      <a>{company.email}</a>
                                    </td>
                                    <td className="text-center">
                                      <div className="action-btn">
                                        <Link
                                          to={`/admin/company/${company.id}`}
                                        >
                                          <i
                                            className="fa fa-eye"
                                            aria-hidden="true"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="View"
                                          ></i>
                                        </Link>
                                        <Link
                                          to=""
                                          onClick={(e) => {
                                            editViewUser(company);
                                          }}
                                        >
                                          <i
                                            className="fa fa-pencil-square-o"
                                            aria-hidden="true"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Edit"
                                          ></i>
                                        </Link>
                                        <a
                                          href="javascript:void(0)"
                                          onClick={(e) => {
                                            deleteCompany(company.id);
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
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5}>No Data Found!</td>
                                </tr>
                              )}
                            </tbody>
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

      <Modal show={show} toggle={setShow} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Update Company user</h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={updateCompanyhandler}>
          <Modal.Body>
            <>
              <div className="input-form">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  value={company}
                  required
                  onChange={(e) => setcompany(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={user}
                  placeholder="User Name"
                  required
                  onChange={(e) => setuser(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={userEmail}
                  disabled
                />
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
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default AllCompanies;
