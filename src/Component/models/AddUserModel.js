import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../base_url/config";
import Loader from "../Loader";

const AddUserModel = ({
  show,
  handleClose,
  setShow,
  getPageData,
  companyID,
  userPermissionData,
}) => {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [loader, setloader] = useState(false);
  let [storePermissions, setStorePermissions] = useState([]);
  const [selectedSym, setSelectedSym] = useState([]);
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  const addCompanyUserhandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = await axiosConfig.post(
        "/company-admin/user/create",
        {
          name: userName,
          email: userEmail,
          companyID: companyID,
          user_permissions: storePermissions,
        },
        config
      );
      setShow(false);
      getPageData();
      setuserEmail("");
      setuserName("");
      setloader(false);
      setStorePermissions([]);
      toast.success("User Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
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

  const userPermissionHandler = (val) => {
    const findData = storePermissions.find((x) => x.id == val);
    if (findData) {
      const findIndex = storePermissions.indexOf(findData);
      if (findIndex != -1) {
        const deleteData = storePermissions.splice(findIndex, 1);
        let data = [...selectedSym];
        let ind = data.indexOf(val);
        data.splice(ind, 1);
        setSelectedSym(data);
      }
    } else {
      let payload = {
        id: val,
        permission: "yes",
      };
      storePermissions.push(payload);
      setSelectedSym((selectedSym) => {
        return [...selectedSym, val];
      });
    }
  };
  // console.log('storePermissions', storePermissions);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Add Company User</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            addCompanyUserhandler(e);
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
                  type="email"
                  className="form-control"
                  value={userEmail}
                  placeholder="Enter Email"
                  required
                  onChange={(e) => setuserEmail(e.target.value)}
                />
              </div>
              <div className="input-form">
                <div className="access-role-main">
                  <div className="row">
                    {userPermissionData !== undefined &&
                      userPermissionData.map((user_permission, index) => (
                        <div className="col-md-6 mt-2" key={index}>
                          <div className="role-btn">
                            <div className="button-checkbox input-group-btn">
                              <button
                                type="button"
                                className={
                                  selectedSym &&
                                  selectedSym.includes(user_permission.id)
                                    ? "text-white btn btn-lg-primary-outline w-100 bg-success"
                                    : "btn btn-lg-primary-outline w-100 bg-danger text-white"
                                }
                                onClick={(e) => {
                                  userPermissionHandler(user_permission.id);
                                }}
                              >
                                {user_permission.name}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
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
    </>
  );
};

export default AddUserModel;
