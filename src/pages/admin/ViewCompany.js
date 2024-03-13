import React from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { useParams } from "react-router";
import moment from "moment";
import Loader from "../../Component/Loader";
import AddUserModel from "../../Component/models/AddUserModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequestApi } from "../../helper/Helper";
import swal from "sweetalert";
import EditUserModel from "../../Component/models/EditUserModel";
import CountVoteModel from "../../Component/models/CountVoteModel";
import AddFeatureModel from "../../Component/models/AddFeatureModel";
import EditFeatureModel from "../../Component/models/EditFeatureModel";

const ViewCompany = () => {
  const [companyData, setcompanyData] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [pageLoad, setPageLoad] = useState(false);
  const [loader, setloader] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setshowModal(false);
  const [showModal, setshowModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const handleCloseVoteModal = () => setShowVoteModal(false);
  const [userPermissionData, setUserPermissionData] = useState([]);
  const [editUserData, setEditUserData] = useState("");
  const [modelVoteType, setModelVoteType] = useState("");
  const [displayModel, setDisplayModel] = useState({
    addModel: false,
    editModel: false,
  });
  const [modalVotableId, setModalVotableId] = useState("");
  const [voteFilterVal, setVoteFilterVal] = useState("all");
  const [yesVoteCount, setYesVoteCount] = useState("");
  const [noVoteCount, setNoVoteCount] = useState("");
  const [optionalVoteCount, setOptionalVoteCount] = useState("");

  const [featureId, setfeatureId] = useState();
  const [selectedFile, setselectedFile] = useState(null);
  const [featureTitle, setfeatureTitle] = useState("");
  const [featureDescription, setfeatureDescription] = useState("");
  const [showFeatureModel, setShowFeatureModel] = useState(false);
  const [productName, setProductName] = useState("");
  const handleFeatureModelClose = () => setShowFeatureModel(false);

  const [showEditFeatureModel, setShowEditFeatureModel] = useState(false);
  const handleEditFeatureModelClose = () => setShowEditFeatureModel(false);

  const [allFeatures, setAllFeatures] = useState([]);
  const { id } = useParams();
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getCompanyData();
    getCompanyFeatures();
  }, []);

  const getCompanyData = () => {
    setloader(true);
    axiosConfig
      .get(`/admin/company/edit/${id}`, config)
      .then((response) => {
        setcompanyData(response.data.data);
        setPageLoad(true);
        setloader(false);
      })
      .catch((error) => {
        setloader(false);
        seterrorMessage(error.message);
        console.error("There was an error!", error);
      });
  };

  const getCompanyFeatures = async () => {
    let response = await getRequestApi(`/dashboard/feature/company/${id}/5`);
    if (response) {
      setAllFeatures(response.data.data);
    }
  };
  // console.log('asas', allFeatures);
  const addUser = async (val) => {
    setDisplayModel({ addModel: true, editModel: false });
    setloader(true);
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

  const deleteCompanyUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this User?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        setloader(true);
        try {
          const { data } = axiosConfig.delete(
            `/company-admin/user/delete/${id}`,
            config
          );
          setloader(false);
          toast.success("User Deleted Successfully!", {
            position: "bottom-right",
            autoClose: 2000,
          });
          getCompanyData();
        } catch {
          setloader(false);
          toast.error("Unable to delete the user!", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    });
  };

  const viewVoteCount = async (comment_id, vote_type, filter_type) => {
    setModalVotableId(comment_id);
    setModelVoteType(vote_type);
    let response = await getRequestApi(
      `/company/vote/vote-type-count/${vote_type}/${comment_id}/${filter_type}`
    );
    if (response) {
      setShowVoteModal(true);
      setYesVoteCount(response.data.data.yes);
      setNoVoteCount(response.data.data.no);
      setOptionalVoteCount(response.data.data.optional);
      setVoteFilterVal(filter_type);
    }
  };

  const addFeature = (val) => {
    setShowFeatureModel(true);
    setfeatureTitle("");
    setfeatureDescription("");
    setselectedFile(null);
  };

  const editViewFeature = (val) => {
    setShowEditFeatureModel(true);
    setfeatureTitle(val.title);
    setfeatureDescription(val.content);
    setfeatureId(val.id);
    setProductName(val.product_name);
  };

  const deleteCompanyFeature = (id) => {
    try {
      setloader(true);
      const { data } = axiosConfig.delete(
        `/company-admin/post/delete/${id}`,
        config
      );
      toast.success("Feature Deleted Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setloader(false);
      getCompanyFeatures();
    } catch {
      setloader(false);
      toast.error("Unable to delete the Feature!", {
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
              <div className="row">
                {pageLoad == true ? (
                  <>
                    <div className="col-md-6">
                      <div className="dashboard card">
                        <div className="card-header">
                          <h5 className="text-white text-uppercase">
                            View Company:{" "}
                            {companyData.company_data.company_name}
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
                                      <p>{companyData.company_data.name}</p>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-form">
                                      <label>Email</label>
                                      <p>{companyData.company_data.email}</p>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-form">
                                      <label>Company Status</label>
                                      <p>
                                        {
                                          companyData.company_data
                                            .company_status
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-form">
                                      <label>Subscription Status</label>
                                      <p>
                                        {
                                          companyData.company_data
                                            .subscription_status
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-form">
                                      <label>Created On</label>
                                      <p>
                                        {moment(
                                          companyData.company_data.created_at
                                        ).format("DD-MMMM-YY")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="dashboard card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="text-white text-uppercase">
                            Company Users
                          </h5>
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
                                  <thead></thead>
                                  <tbody>
                                    {companyData.company_users.length !== 0 ? (
                                      companyData.company_users.map(
                                        (user, key) => (
                                          <tr key={key}>
                                            <td className="">{user.name}</td>
                                            <td className="text-center">
                                              <div className="action-btn">
                                                <Link
                                                  to={`/company/user/${user.id}`}
                                                >
                                                  <i
                                                    className="fa fa-eye"
                                                    aria-hidden="true"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="View"
                                                  ></i>
                                                </Link>
                                                <a
                                                  href="javascript:void(0)"
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
                                                  href="javascript:void(0)"
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
                                        )
                                      )
                                    ) : (
                                      <tr>
                                        <td colSpan={2}>No User Found!</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                <Link
                                  to={`/admin/company-users/${id}`}
                                  type="button"
                                  className="btn btn-lg-primary text-white"
                                >
                                  View All
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="dashboard card mt-5">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="text-white text-uppercase">
                            Company Features
                          </h5>
                          <Link
                            to=""
                            className="btn btn-lg-primary"
                            onClick={(e) => {
                              addFeature();
                            }}
                          >
                            Add Feature
                          </Link>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="table-responsive custom-table approve-table">
                                <table className="table table-hover">
                                  <thead>
                                    <tr>
                                      <th scope="col">Title</th>
                                      <th scope="col">Feedbacks</th>
                                      <th scope="col">Votes</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Created</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {allFeatures !== undefined &&
                                    allFeatures.length !== 0 ? (
                                      allFeatures.map((feature, index) => (
                                        <tr key={index}>
                                          <td>
                                            <Link to={`/feature/${feature.id}`}>
                                              {feature.title}
                                            </Link>
                                          </td>
                                          <td>{feature.comments_count}</td>
                                          <td>
                                            <p
                                              className="votes-count d-flex"
                                              onClick={(e) => {
                                                viewVoteCount(
                                                  feature.id,
                                                  "post",
                                                  "all"
                                                );
                                              }}
                                            >
                                              <img
                                                src={
                                                  window.location.origin +
                                                  "/img/up.png"
                                                }
                                                className="img-fluid d-block"
                                                alt=""
                                                width="20px"
                                              />
                                              {feature.post_votes_count}
                                            </p>
                                          </td>
                                          <td>{feature.status}</td>
                                          <td>
                                            {moment(feature.created_at).format(
                                              "LL"
                                            )}
                                          </td>
                                          <td>
                                            <div className="action-btn d-flex">
                                              <Link
                                                to=""
                                                onClick={(e) => {
                                                  editViewFeature(feature);
                                                }}
                                                href="javascript:void(0)"
                                              >
                                                <i
                                                  className="fa fa-pencil-square-o"
                                                  aria-hidden="true"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title="Edit"
                                                ></i>
                                              </Link>
                                              <Link
                                                to=""
                                                onClick={(e) => {
                                                  deleteCompanyFeature(
                                                    feature.id
                                                  );
                                                }}
                                              >
                                                <i
                                                  className="fa fa-trash-o"
                                                  aria-hidden="true"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title="Delete"
                                                ></i>
                                              </Link>
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={6}>No Feature Found!</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                <Link
                                  to={`/admin/company-features/${id}`}
                                  type="button"
                                  className="btn btn-lg-primary text-white"
                                >
                                  View All
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-md-12">
                    <div className="dashboard card">
                      <div className="card-header">
                        <h5 className="text-white text-uppercase">
                          No Data Found
                        </h5>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {displayModel.addModel === true ? (
        <AddUserModel
          show={show}
          handleClose={handleClose}
          setShow={setShow}
          getPageData={getCompanyData}
          companyID={
            companyData && companyData.company_data
              ? companyData.company_data.company_user_id
              : ""
          }
          userPermissionData={userPermissionData}
        />
      ) : (
        ""
      )}
      {displayModel.editModel === true ? (
        <EditUserModel
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          setshowModal={setshowModal}
          getPageData={getCompanyData}
          companyID=""
          updateUserPermissionData={userPermissionData}
          editUserData={editUserData}
        />
      ) : (
        ""
      )}
      <CountVoteModel
        showModal={showVoteModal}
        handleCloseModal={handleCloseVoteModal}
        viewVoteCount={viewVoteCount}
        modalVotableId={modalVotableId}
        modelVoteType={modelVoteType}
        voteFilterVal={voteFilterVal}
        yesVoteCount={yesVoteCount}
        noVoteCount={noVoteCount}
        optionalVoteCount={optionalVoteCount}
        setVoteFilterVal={setVoteFilterVal}
      />
      <AddFeatureModel
        show={showFeatureModel}
        handleClose={handleFeatureModelClose}
        setShow={setShowFeatureModel}
        setloader={setloader}
        companyId={id}
        getPageData={getCompanyFeatures}
        featureTitle={featureTitle}
        featureDescription={featureDescription}
        selectedFile={selectedFile}
        setselectedFile={setselectedFile}
        setfeatureTitle={setfeatureTitle}
        setfeatureDescription={setfeatureDescription}
        featureId={""}
        setfeatureId={""}
      />
      <EditFeatureModel
        showModal={showEditFeatureModel}
        handleCloseModal={handleEditFeatureModelClose}
        setshowModal={setShowEditFeatureModel}
        setloader={setloader}
        companyId={id}
        getPageData={getCompanyFeatures}
        featureTitle={featureTitle}
        featureDescription={featureDescription}
        selectedFile={selectedFile}
        setselectedFile={setselectedFile}
        setfeatureTitle={setfeatureTitle}
        setfeatureDescription={setfeatureDescription}
        featureId={featureId}
        setfeatureId={setfeatureId}
        setProductName={setProductName}
        productName={productName}
      />
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default ViewCompany;
