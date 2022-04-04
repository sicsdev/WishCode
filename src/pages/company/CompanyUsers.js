import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModel from "../../Component/models/AddUserModel";
import { getRequestApi } from "../../helper/Helper";
import Loader from "../../Component/Loader";
import EditUserModel from "../../Component/models/EditUserModel";
import ViewCompanyUserCom from "../../Component/users/ViewCompanyUserCom";

const CompanyUsers = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setshowModal(false);
  const [showModal, setshowModal] = useState(false);
  const [companyName, setcompanyName] = useState();
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userId, setuserId] = useState();
  const [totalCompanyUsers, settotalCompanyUsers] = useState([]);
  let [userPermissionData, setUserPermissionData] = useState([]);
  const [loader, setloader] = useState(false);
  const [editUserData, setEditUserData] = useState("");
  const [displayModel, setDisplayModel] = useState({
    addModel: false,
    editModel: false,
  });

  const addUser = async (val) => {
    setloader(true);
    setDisplayModel({ addModel: true, editModel: false });
    setUserPermissionData([]);
    let response = await getRequestApi("/permissions/get/all");
    setloader(false);
    if (response) {
      setUserPermissionData(response.data.data);
    }
    setShow(true);
  };

  const editViewUser = async (val) => {
    setDisplayModel({ addModel: false, editModel: true });
    setloader(true);
    setUserPermissionData([]);
    let response = await getRequestApi(`/permissions/${val.id}`);
    if (response) {
      if (response && response.data.data.all_permissions) {
        let permissions = [];
        for (let i = 0; i < response.data.data.all_permissions.length; i++) {
          const element = response.data.data.all_permissions[i];
          const findPermission = response.data.data.user_permissions.find(
            (x) => x.permission_id == element.id
          );
          if (findPermission) {
            permissions.push({ data: element, permission: "yes" });
          } else {
            permissions.push({ data: element, permission: "no" });
          }
        }
        setUserPermissionData(permissions);
      }
    }
    setloader(false);
    setEditUserData(val);
    setshowModal(true);
  };

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getAllCompanyUsers();
  }, []);

  const getAllCompanyUsers = () => {
    setloader(true);
    axiosConfig
      .get("/company-admin/user/all", config)
      .then((response) => {
        setloader(false);
        settotalCompanyUsers(response.data.data);
        setcompanyName(response.data.company_name);
      })
      .catch((data) => {
        setloader(false);
        toast.success(data.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };

  const updateCompanyUserhandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosConfig.put(
        `/company-admin/user/update/${userId}`,
        {
          name: userName,
          email: userEmail,
        },
        config
      );
      setshowModal(false);
      getAllCompanyUsers();

      // console.log('data', data.message);
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

  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <ViewCompanyUserCom
                totalCompanyUsers={totalCompanyUsers}
                editViewUser={editViewUser}
                getPageData={getAllCompanyUsers}
                addUser={addUser}
                companyName={companyName}
              />
            </div>
          </section>
        </div>
      </div>
      {displayModel.addModel === true ? (
        <AddUserModel
          show={show}
          handleClose={handleClose}
          setShow={setShow}
          getPageData={getAllCompanyUsers}
          companyID=""
          userPermissionData={userPermissionData}
        />
      ) : (
        ""
      )}
      {displayModel.editModel === true && editUserData != undefined ? (
        <EditUserModel
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          setshowModal={setshowModal}
          getPageData={getAllCompanyUsers}
          companyID=""
          updateUserPermissionData={userPermissionData}
          editUserData={editUserData}
        />
      ) : (
        ""
      )}

      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default CompanyUsers;
