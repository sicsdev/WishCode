import React from "react";
import moment from "moment";
import axiosConfig from "../../base_url/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { useState } from "react";
import EditFeatureModel from "../models/EditFeatureModel";

const ApproveFeatureReqCom = ({
  pendingFeatureList,
  loader,
  setloader,
  getPageData,
}) => {
  const handleEditFeatureModelClose = () => setShowEditFeatureModel(false);
  const [showEditFeatureModel, setShowEditFeatureModel] = useState(false);
  const [featureTitle, setfeatureTitle] = useState("");
  const [featureDescription, setfeatureDescription] = useState("");
  const [featureId, setfeatureId] = useState();
  const [selectedFile, setselectedFile] = useState(null);
  const [companyID, setCompanyID] = useState("");
  const [productName, setProductName] = useState("");
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  const updateFeatureStatusHandler = async (id, status) => {
    swal({
      title: "Are you sure?",
      text: `You want to ${status=="publish"?"Approve":status} this Feature ?`,
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        setloader(true);
        try {
          const { data } = await axiosConfig.post(
            `/admin/post/change-status`,
            {
              post_id: id,
              status: status,
            },
            config
          );
          setloader(false);
          getPageData();
          return toast.success(`Feature Status ${status} Successfully!`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        } catch (error) {
          setloader(false);
          return toast.error(
            `${
              error.response.data.message && error.response.data.message.post_id
                ? error.response.data.message.post_id[0]
                : error.response.data.message
            }`,
            {
              position: "bottom-right",
              autoClose: 2000,
            }
          );
        }
      }
    });
  };
  const editViewFeature = (val) => {
    setCompanyID(val.company_id);
    setShowEditFeatureModel(true);
    setfeatureTitle(val.title);
    setfeatureDescription(val.content);
    setfeatureId(val.id);
    setProductName(val.product_name);
  };
  return (
    <>
      <div className="dashboard card mt-5">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">Feature Request</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive custom-table approve-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Feature Title</th>
                      <th scope="col">Feature Description</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Created On</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingFeatureList?.map((feature, index) => (
                      <tr key={index}>
                        <td>
                          <p>{feature.title}</p>
                        </td>
                        <td>
                          <p className="feature-desc-string">
                            {feature.content}
                          </p>
                        </td>
                        <td>{feature.product_name}</td>
                        <td>
                          <p>{moment(feature.created_at).format("LL")}</p>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              type="button"
                              className="btn btn-lg-primary debny-btn w-100 mr-3"
                              onClick={(e) =>
                                updateFeatureStatusHandler(
                                  feature.id,
                                  "rejected"
                                )
                              }
                            >
                              Deny
                            </button>

                            <button
                              type="button"
                              className="btn btn-success approv-btn w-100 mr-3"
                              onClick={(e) => {
                                editViewFeature(feature);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn-success approv-btn w-100"
                              onClick={(e) =>
                                updateFeatureStatusHandler(
                                  feature.id,
                                  "publish"
                                )
                              }
                            >
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditFeatureModel
        showModal={showEditFeatureModel}
        handleCloseModal={handleEditFeatureModelClose}
        setshowModal={setShowEditFeatureModel}
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
        setProductName={setProductName}
        productName={productName}
      />
    </>
  );
};

export default ApproveFeatureReqCom;
