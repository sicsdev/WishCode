import React from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { getRequestApi } from "../../helper/Helper";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import Loader from "../../Component/Loader";

const Users = () => {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [allUsers, setAllUsers] = useState([]);
  const handleCloseModal = () => setshowModal(false);
  const [showModal, setshowModal] = useState(false);
  const [userId, setuserId] = useState();
  const [loader, setloader] = useState(false);

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setloader(true);
    let response = await getRequestApi("/admin/user/all");
    if (response) {
      setAllUsers(response.data.data.data);
      setloader(false);
    } else {
      setloader(false);
    }
  };

  const addUser = (val) => {
    setShow(true);
    setuserName("");
    setuserEmail("");
  };

  const addUserhandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosConfig.post(
        "/admin/user/create",
        {
          name: userName,
          email: userEmail,
        },
        config
      );
      setShow(false);
      getAllUsers();
      setuserEmail("");
      setuserName("");
      toast.success("User Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${
          error.response.data.message && error.response.data.message.email
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

  const editViewUser = (val) => {
    setshowModal(true);
    setuserName(val.name);
    setuserEmail(val.email);
    setuserId(val.id);
  };

  const updateUserhandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosConfig.put(
        `/admin/user/update/${userId}`,
        {
          name: userName,
          email: userEmail,
        },
        config
      );
      setshowModal(false);
      getAllUsers();

      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
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

  const deleteCompanyUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to Delete the User?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const { data } = axiosConfig.delete(
            `/admin/user/delete/${id}`,
            config
          );
          swal("Deleted!", "You deleted the user successfully!", "success");
          getAllUsers();
        } catch (error) {
          swal("Error!", "Enable to delete the user!", "error");
        }
      }
    });
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
                  <h5 className="text-white text-uppercase">Users</h5>
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
                              <th scope="col" className="text-center">
                                User Name
                              </th>
                              <th scope="col" className="text-center">
                                Email
                              </th>
                              <th scope="col" className="text-center">
                                Created On
                              </th>
                              <th scope="col" className="text-center">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {allUsers.map((user, key) => (
                              <tr key={key}>
                                <td>{user.name}</td>
                                <td className="text-center">
                                  <a href={`mailto: ${user.email}`}>
                                    {user.email}
                                  </a>
                                </td>
                                <td className="text-center">
                                  {moment(user.created_at).format(
                                    "DD-MMMM-YYYY"
                                  )}
                                </td>
                                <td className="text-center">
                                  <div className="action-btn">
                                    <Link to={`/admin/user/${user.id}`}>
                                      <i
                                        className="fa fa-eye"
                                        aria-hidden="true"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      ></i>
                                    </Link>
                                    <a
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
            </div>
          </section>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Add User</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            addUserhandler(e);
          }}
        >
          <Modal.Body>
            <>
              <div className="input-form">
                <label> Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={userName}
                  required
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={userEmail}
                  placeholder="Enter Email"
                  required
                  onChange={(e) => setuserEmail(e.target.value)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Edit User</h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={updateUserhandler}>
          <Modal.Body>
            <>
              <div className="input-form">
                <label> Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={userName}
                  required
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="input-form">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={userEmail}
                  placeholder="Enter Email"
                  required
                  disabled
                  onChange={(e) => setuserEmail(e.target.value)}
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
                setshowModal(false);
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

export default Users;
