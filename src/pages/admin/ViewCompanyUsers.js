import React from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { Link } from "react-router-dom";
import ViewCompanyUserCom from "../../Component/users/ViewCompanyUserCom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequestApi } from "../../helper/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";
import AddUserModel from "../../Component/models/AddUserModel";
import EditUserModel from "../../Component/models/EditUserModel";

const ViewCompanyUsers = () => {
  const { id } = useParams();
  const [loader, setloader] = useState(false);
  const [totalCompanyUsers, settotalCompanyUsers] = useState([]);
  const [companyData, setCompanyData] = useState();
  const [displayModel, setDisplayModel] = useState({
    addModel: false,
    editModel: false,
  });
  let [userPermissionData, setUserPermissionData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setshowModal(false);
  const [showModal, setshowModal] = useState(false);
  const [editUserData, setEditUserData] = useState("");

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

  const getAllCompanyUsers = async () => {
    setloader(true);
    let response = await getRequestApi(`/admin/company-users/${id}`);
    if (response) {
      setloader(false);
      settotalCompanyUsers(response.data.data);
      setCompanyData(response.data.companyData);
    } else {
      setloader(false);
    }
  };

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
                companyName={companyData ? companyData.company_name : ""}
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
          companyID={companyData ? companyData.company_user_id : ""}
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

export default ViewCompanyUsers;
