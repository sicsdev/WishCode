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

const ViewCompanyFeaturesCom = ({
  totalCompanyFeatures,
  getPageData,
  companyId,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setshowModal(false);
  const [showModal, setshowModal] = useState(false);
  const [featureId, setfeatureId] = useState();
  const [selectedFile, setselectedFile] = useState(null);
  const [featureTitle, setfeatureTitle] = useState("");
  const [featureDescription, setfeatureDescription] = useState("");
  const [loader, setloader] = useState(false);
  const [productName, setProductName] = useState("");

  const [searchFeature, setSearchFeature] = useState([]);

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
      getPageData();
    } catch {
      setloader(false);
      toast.error("Unable to delete the Feature!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const searchRandomFeature = (e) => {
    const filterdata = searchFeature?.filter((data) => data?.title?.toLowerCase().includes(e.target.value.toLowerCase()));
    if (e.target.value) {
      setSearchFeature(filterdata);
    } else {
      setSearchFeature(totalCompanyFeatures);
    }
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
            className="btn btn-lg-primary text-white"
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
              {searchFeature ? console.log("isArray") : console.log("notarray")}
              {searchFeature?.map((feature, key) => (
                <div className="company-post-wrapper" key={key}>
                  <Link to={`/feature/${feature.id}`}>
                    <div className="comp-post">
                      <span className="text-lg-primary">
                        {moment(feature.created_at).format("DD MMM YYYY")}
                      </span>
                      <div className="options">
                        <h2>{feature.title}</h2>
                      </div>
                      <p>{feature.content}</p>
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
                            <span className="font-weight-bold">
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
                            <span className="font-weight-bold">
                              Product Name:
                            </span>{" "}
                            {feature?.product_name}
                          </Link>
                        ) : (
                          ""
                        )}
                        <Link
                          to={`/feature/${feature.id}`}
                          className="text-secondary"
                        >
                          <i
                            className="fa fa-comments-o"
                            aria-hidden="true"
                          ></i>{" "}
                          {feature.comments_count}
                        </Link>
                        <Link
                          to={`/feature/${feature.id}`}
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
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default ViewCompanyFeaturesCom;
