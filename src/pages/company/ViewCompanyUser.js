import React from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { useParams } from "react-router";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequestApi } from "../../helper/Helper";
import Loader from "../../Component/Loader";

const ViewCompanyUser = () => {
  const [userData, setuserData] = useState([]);
  const [userPermissionData, setUserPermissionData] = useState([]);
  const [loader, setloader] = useState(false);
  let [storePermissions, setStorePermissions] = useState([]);

  const { id } = useParams();

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getUserData();
    getUserPermissions();
  }, []);
  const [selectedSym, setSelectedSym] = useState([]);

  const getUserData = async () => {
    setloader(true);
    let response = await getRequestApi(`/company-admin/user/edit/${id}`);
    if (response) {
      setuserData(response.data.data);
      setloader(false);
    } else {
      setloader(false);
    }
  };

  const getUserPermissions = async () => {
    let response = await getRequestApi(`/permissions/${id}`);
    if (response) {
      if (response && response.data.data.all_permissions) {
        let permissions = [];
        for (let i = 0; i < response.data.data.all_permissions.length; i++) {
          const element = response.data.data.all_permissions[i];
          const findPermission = response.data.data.user_permissions.find(
            (x) => x.permission_id === element.id
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
  };

  const userPermissionHandler = (val, permission) => {
    const findData = storePermissions.find((x) => x.id === val);
    if (findData) {
      const findIndex = storePermissions.indexOf(findData);
      if (findIndex !== -1) {
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
  };

  const updateUserPermissionHandler = async () => {
    if (storePermissions.length > 0) {
      try {
        const { data } = await axiosConfig.post(
          "/permissions/addUserPermissions",
          {
            user_permissions: storePermissions,
            id: id,
          },
          config
        );
        getUserPermissions();
        setStorePermissions([]);
        setSelectedSym([]);
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } catch (error) {
        return toast.error(
          `${
            error.response.data.message &&
            error.response.data.message.user_permissions
              ? error.response.data.message.user_permissions[0]
              : error.response.data.message
          }`,
          {
            position: "bottom-right",
            autoClose: 2000,
          }
        );
      }
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
                <div className="card-header">
                  <h5 className="text-white text-uppercase">
                    View: {userData.name}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="view-form-container">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-form">
                              <label>Name</label>
                              <p>{userData.name}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-form">
                              <label>Email</label>
                              <p>{userData.email}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-form">
                              <label>Created On</label>
                              <p>
                                {moment(userData.created_at).format(
                                  "DD-MMMM-YY"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="input-form">
                              <label>Modules User Can access</label>
                              <div className="acess-role-main">
                                <div className="row">
                                  {userPermissionData.map(
                                    (user_permission, index) => (
                                      <div className="col-md-3" key={index}>
                                        <div className="role-btn">
                                          <div className="button-checkbox input-group-btn">
                                            <button
                                              type="button"
                                              id={index}
                                              className={
                                                user_permission.permission ===
                                                "yes"
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
                                                  user_permission.permission ===
                                                    "no"
                                                    ? "yes"
                                                    : "no"
                                                );
                                              }}
                                            >
                                              {user_permission.data.name}
                                            </button>
                                            <input
                                              type="checkbox"
                                              className="hidden"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 text-right">
                            <button
                              type="button"
                              className="btn btn-lg-primary"
                              onClick={(e) => updateUserPermissionHandler()}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default ViewCompanyUser;
