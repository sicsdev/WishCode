import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { imageBaseUrl } from "../base_url/config";
import AddFeatureModel from "./models/AddFeatureModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import axiosConfig from "../base_url/config";
import { Modal, Button } from "react-bootstrap";
import { stripHtml } from "../helper/Helper";
const FeatureComp = ({
  features,
  companyID,
  suggestFeature,
  getPageData,
  companyData,
  filter_type,
  productData,
  getAllCompanyFeatures,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const handleClaimCloseModal = () => setShowClaimModal(false);
  const [loader, setloader] = useState(false);
  const [featureId, setfeatureId] = useState();
  const [selectedFile, setselectedFile] = useState(null);
  const [featureTitle, setfeatureTitle] = useState("");
  const [featureDescription, setfeatureDescription] = useState("");
  const [claimEmail, setClaimEmail] = useState("");
  const [searchFeature, setSearchFeatures] = useState([]);
  const [searchParam, setSearchParam] = useState(null);

  useEffect(() => {
    setSearchFeatures(features);
  }, [features])


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

  const claimCompanyModalHandler = (company_id) => {
    setShowClaimModal(true);
  };

  const claimCompnayHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = await axiosConfig.post(
        `/company/claim_company`,
        {
          company_id: companyData.id,
          request_type: "claim",
          claim_email: claimEmail,
        },
        config
      );
      setloader(false);
      setShowClaimModal(false);
      setClaimEmail("");
      return toast.success(`Claim Request Send Successfully!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${error.response.data.message && error.response.data.message.company_id
          ? error.response.data.message.company_id[0]
          : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  useEffect(() => {
    if (searchParam) {
      const filterdata = searchFeature?.filter((data) => data?.title?.toLowerCase().includes(searchParam.toLowerCase()));
      setSearchFeatures(filterdata);
    } else {
      setSearchFeatures(features);
    }
  }, [searchParam])

  return (
    <>
      <div class="row justify-content-end">
        <div class="col-md-4">
          <input type="text" class="form-control" placeholder="Search Feature" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} onFocus={() => {
            setSearchParam('')
            getAllCompanyFeatures("all");
          }} />
        </div>
      </div>
      <div className="dashboard card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">
            {filter_type && filter_type === "company" ? (
              <>
                {`${filter_type} Posts: `} {companyData.company_name}
              </>
            ) : filter_type && filter_type === "product" ? (
              <>
                {`${filter_type} Posts: `} {productData?.product_name}
              </>
            ) : companyData ? (
              <>Company Posts: {companyData.company_name}</>
            ) : (
              "Company Posts"
            )}
          </h5>
          <div className="header-btns">
            {localStorage.getItem('role') == 4 ? <>{suggestFeature === true ? (
              <button
                type="button"
                className="btn btn-lg-primary mr-2"
                onClick={(e) => {
                  addFeature();
                }}
              >
                Suggest Feature
              </button>
            ) : (
              ""
            )}</> : ""}

            {companyData &&
              companyData.is_claimed === "0" &&
              companyData.requested_by !== null ? (
              <button
                type="button"
                className="btn btn-lg-primary"
                onClick={(e) => {
                  // claimCompnayHandler(companyData.id);
                  claimCompanyModalHandler(companyData.id);
                }}
              >
                Claim
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              {searchFeature !== undefined ? (
                searchFeature?.map((feature, key) => (
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
                                Product Name:
                              </span>{" "}
                              {feature?.product_name}
                            </Link>
                          ) : (
                            ""
                          )}
                          <Link
                            to={`/wish/${feature.id}`}
                            className="text-secondary"
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
                  </div>
                ))
              ) : (
                <div className="company-post-wrapper">
                  <h3>No data Found</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddFeatureModel
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        setloader={setloader}
        companyId={companyID}
        getPageData={getPageData}
        featureTitle={featureTitle}
        featureDescription={featureDescription}
        selectedFile={selectedFile}
        setselectedFile={setselectedFile}
        setfeatureTitle={setfeatureTitle}
        setfeatureDescription={setfeatureDescription}
        featureId={featureId}
        setfeatureId={setfeatureId}
        productData={productData?.product_name}
        companyData={companyData?.company_name}
      />
      <Modal show={showClaimModal} onHide={handleClaimCloseModal}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Claim Company</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            claimCompnayHandler(e);
          }}
        >
          <Modal.Body>
            <>
              <div className="input-form">
                <label> Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={claimEmail}
                  required
                  onChange={(e) => setClaimEmail(e.target.value)}
                />
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-lg-primary">
              Claim Now
            </button>
            <Button
              variant="secondary"
              className="btn btn-lg-primary"
              onClick={(e) => {
                setShowClaimModal(false);
              }}
            >
              Close Modal
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default FeatureComp;
