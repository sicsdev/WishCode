import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { useParams } from "react-router";
import moment from "moment";
import Loader from "../../Component/Loader";

const ViewUser = () => {
  const { id } = useParams();
  const [pageLoad, setPageLoad] = useState(false);
  const [userData, setUserData] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [loader, setloader] = useState(false);

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    setloader(true);
    axiosConfig
      .get(`/admin/user/edit/${id}`, config)
      .then((response) => {
        setloader(false);
        setUserData(response.data.data);
        setPageLoad(true);
      })
      .catch((error) => {
        setloader(false);
        seterrorMessage(error.message);
      });
  }, []);
  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />

          <section className="body-content-inner">
            <div className="container">
              {pageLoad == true ? (
                <>
                  <div className="dashboard card">
                    <div className="card-header">
                      <h5 className="text-white text-uppercase">
                        View User: {userData.name}
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
                                      "DD-MMMM-YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="dashboard card">
                  <div className="card-header">
                    <h5 className="text-white text-uppercase">No Data Found</h5>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      {loader === true ? <Loader /> : <></>}
    </>
  );
};

export default ViewUser;
