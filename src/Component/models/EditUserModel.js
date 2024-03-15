import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../base_url/config";
import Loader from "../Loader";

const EditUserModel = ({
  showModal,
  handleCloseModal,
  setshowModal,
  getPageData,
  companyID,
  updateUserPermissionData,
  editUserData,
}) => {
  //   console.log("qqqqq", editUserData.name);
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userId, setuserId] = useState("");
  const [loader, setloader] = useState(false);
  const [newPassword,setPassword] =useState("");
  const [confirmPassword,setConfirmPassword] =useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  let [storePermissions, setStorePermissions] = useState([]);
  const [selectedSym, setSelectedSym] = useState([]);

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    setuserName(editUserData.name);
    setuserEmail(editUserData.email);
    setuserId(editUserData.id);
  }, [editUserData.name, editUserData.email, editUserData.id]);

  useEffect(() => {
    setSelectedSym([]);
    setStorePermissions([]);
  }, [updateUserPermissionData]);

  const updateCompanyUserhandler = async (e) => {
    e.preventDefault();
    setloader(true);
    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      setloader(false);
      return; // Exit the function if passwords don't match
    }
    try {
      const { data } = await axiosConfig.put(
        `/company-admin/user/update/${userId}`,
        {
          name: userName,
          email: userEmail,
          password:confirmPassword,
          user_permissions: storePermissions,
        },
        config
      );
      setloader(false);
      setshowModal(false);
      getPageData();
      setStorePermissions([]);
      setPassword("");
      setConfirmPassword("");
      setPasswordMatch(true)
      toast.success(data.message, {
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

  const userPermissionHandler = (val, permission) => {
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
        permission: permission,
      };
      storePermissions.push(payload);
      setSelectedSym((selectedSym) => {
        return [...selectedSym, val];
      });
    }
    // console.log("Permissions: ", storePermissions);
  };
  //   console.log("storePermissions", storePermissions);
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Edit Company User</h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={updateCompanyUserhandler}>
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
                 <label>Change Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  placeholder="New Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
              </div>
              <div className="input-form">
                <div className="acess-role-main">
                  <div className="row">
                    {updateUserPermissionData &&
                      updateUserPermissionData.map((user_permission, index) => (
                        <div className="col-md-6" key={index}>
                          <div className="role-btn">
                            <div className="button-checkbox input-group-btn">
                              <button
                                type="button"
                                id={index}
                                className={
                                  user_permission.permission === "yes"
                                    ? selectedSym &&
                                      selectedSym.includes(
                                        user_permission.data.id
                                      )
                                      ? "text-white btn btn-lg-primary-outline w-100 bg-danger"
                                      : "text-white btn btn-lg-primary-outline w-100 bg-success"
                                    : selectedSym &&
                                      selectedSym.includes(
                                        user_permission.data.id
                                      )
                                    ? "text-white btn btn-lg-primary-outline w-100 bg-success"
                                    : "btn btn-lg-primary-outline w-100 bg-danger text-white "
                                }
                                onClick={(e) => {
                                  userPermissionHandler(
                                    user_permission.data.id,
                                    user_permission.permission === "no"
                                      ? "yes"
                                      : "no"
                                  );
                                }}
                              >
                                {user_permission.data.name}
                              </button>
                              <input type="checkbox" className="hidden" />
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
                setshowModal(false);
                setConfirmPassword("");
                setPassword("");
                setPasswordMatch(true);
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

export default EditUserModel;
