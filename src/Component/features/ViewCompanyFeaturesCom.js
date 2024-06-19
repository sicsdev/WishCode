import React from "react";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../base_url/config";
import moment from "moment";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import AddFeatureModel from "../models/AddFeatureModel";
import EditFeatureModel from "../models/EditFeatureModel";
import swal from "sweetalert";
import { stripHtml } from "../../helper/Helper";
import AssignFeatureModel from "../models/AssignFeatureModel";
const ViewCompanyFeaturesCom = ({
  totalCompanyFeatures,
  getPageData,
  companyId,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setshowModal(false);
  const handleCloseAssigned = () => setshowAssignedModal(false);
  const [showModal, setshowModal] = useState(false);
  const [showAssigned, setshowAssignedModal] = useState(false);
  const [featureId, setfeatureId] = useState();
  const [selectedFile, setselectedFile] = useState(null);
  const [featureTitle, setfeatureTitle] = useState("");
  const [featureDescription, setfeatureDescription] = useState("");
  const [loader, setloader] = useState(false);
  const [productName, setProductName] = useState("");
  const [searchFeature, setSearchFeature] = useState([]);
  const [assignUserId, setAssignUserId] = useState("");
  useEffect(() => {
    setSearchFeature(totalCompanyFeatures);
  }, [totalCompanyFeatures])

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  const addFeature = (val) => {
    setShow(true);
    setfeatureTitle("");
    setfeatureDescription("");
    setselectedFile(null);
  };

  const editViewFeature = (val) => {
    setshowModal(true);
    setfeatureTitle(val.title);
    setfeatureDescription(val.content);
    setfeatureId(val.id);
    setProductName(val.product_name);
  };

  const deleteCompanyFeature = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to Delete this Feature?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setloader(true);
        axiosConfig.delete(`/company-admin/post/delete/${id}`, config)
          .then((response) => {
            toast.success("Feature Deleted Successfully!", {
              position: "bottom-right",
              autoClose: 2000,
            });
            setloader(false);
            getPageData();
          })
          .catch((error) => {
            setloader(false);
            toast.error("Unable to delete the Feature!", {
              position: "bottom-right",
              autoClose: 2000,
            });
          });
      }
    });
  };


  const searchRandomFeature = (e) => {
    const filterdata = searchFeature?.filter((data) => data?.title?.toLowerCase().includes(e.target.value.toLowerCase()));
    if (e.target.value) {
      setSearchFeature(filterdata);
    } else {
      setSearchFeature(totalCompanyFeatures);
    }
  }


  //for feature assigned 
  const assignedFeatureToUser = (featureId, userId) => {
    setshowAssignedModal(true);
    setfeatureId(featureId)
    setAssignUserId(userId)
  }
  
  return (
    <>
      <div class="row justify-content-end">
        <div class="col-md-4">
          <input type="text" class="form-control" placeholder="Search Feature" onChange={(e) => searchRandomFeature(e)} />
        </div>
      </div>
      <div className="dashboard card">

        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">Company Feature</h5>
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
              {searchFeature?.map((feature, key) => (
                <div className="company-post-wrapper" key={key}>
                  <Link to={`/wish/${feature.id}`}>
                    <div className="comp-post">
                      <span className="text-lg-primary">
                        {moment(feature.created_at).format("DD MMM YYYY")}
                      </span>
                      <div className="options">
                        <h2>{feature.title}</h2>
                      </div>
                      <p>{stripHtml(feature.content)}</p>
                      <div className="user-img">
                        {feature.image ? (
                          <img
                            src={`${imageBaseUrl}/${feature.image}`}
                            alt=""
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="actions-links position-relative py-2 pt-4 ">
                        {feature?.company_id && feature?.company_name ? (
                          <Link
                            className="text-secondary mr-3"
                            to={`/dashboard/company/${feature.company_id}`}
                          >
                            <span className="font-weight-bold custom-span">
                              Company Name:
                            </span>{" "}
                            {feature?.company_name}{" "}
                          </Link>
                        ) : (
                          ""
                        )}
                        {feature?.product_id ? (
                          <Link
                            className="text-secondary"
                            to={`/dashboard/product/${feature.product_id}`}
                          >
                            <span className="font-weight-bold custom-span">
                              Category Name:
                            </span>{" "}
                            {feature?.product_name}
                          </Link>
                        ) : (
                          ""
                        )}
                        <span className="font-weight-bold custom-span p-1">
                          Assigned to :
                          
                        </span><span className="text-secondary">{feature?.assign_feature?.team?.name ?  feature?.assign_feature?.team?.name : feature?.assign_feature?.user?.name ? feature?.assign_feature?.user?.name :"Unassigned"}</span>

                        <Link
                          to={`/wish/${feature.id}`}
                          className="text-secondary p-2"
                        >
                          <i
                            className="fa fa-comments-o"
                            aria-hidden="true"
                          ></i>{" "}
                          {feature.comments_count}
                        </Link>
                        <Link
                          to={`/wish/${feature.id}`}
                          className="text-secondary"
                          data-toggle="modal"
                          data-target="#view-vote-post"
                        >
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>{" "}
                          {feature.post_votes_count}

                        </Link>

                      </div>
                    </div>

                  </Link>

                  <div className="select">
                    <a
                      href="javascript:void(0)"
                      onClick={(e) => {
                        editViewFeature(feature);
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
                        deleteCompanyFeature(feature.id);
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
                    <a
                      href="javascript:void(0)"
                      onClick={(e) => {
                        assignedFeatureToUser(feature?.id, feature?.user_assign_id)
                      }}
                    >
                      <i
                        className="fa fa-exchange"
                        aria-hidden="true"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Edit"
                      ></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddFeatureModel
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        setloader={setloader}
        companyId={companyId}
        getPageData={getPageData}
        featureTitle={featureTitle}
        featureDescription={featureDescription}
        selectedFile={selectedFile}
        setselectedFile={setselectedFile}
        setfeatureTitle={setfeatureTitle}
        setfeatureDescription={setfeatureDescription}
        featureId={featureId}
        setfeatureId={setfeatureId}
      />

      <EditFeatureModel
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        setshowModal={setshowModal}
        setloader={setloader}
        companyId={companyId}
        getPageData={getPageData}
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
      <AssignFeatureModel
        showAssigned={showAssigned}
        handleCloseAssigned={handleCloseAssigned}
        setshowAssignedModal={setshowAssignedModal}
        featureId={featureId}
        assignUserId={assignUserId}
      />
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default ViewCompanyFeaturesCom;
