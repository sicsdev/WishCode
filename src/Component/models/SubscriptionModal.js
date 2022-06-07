import React from "react";
import { Modal, Button } from "react-bootstrap";
import StripeSubscriptionForm from "../../Component/StripeSubscriptionForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import moment from "moment";
import swal from "sweetalert";
import axiosConfig from "../../base_url/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const SubscriptionModal = (props) => {
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  const cancleSubscriptionHandler = async (e) => {
    swal({
      title: "Are you sure?",
      text: `You want to cancle the Subscription?`,
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        props.setloader(true);
        try {
          const { data } = await axiosConfig.post(
            `/company-admin/subscription/cancle`,
            {
              subscription_id: props.companyData.subscription_id,
            },
            config
          );
          props.setloader(false);
          props.getPageData();
          props.setShowPriorityModel(false);
          return toast.success(`Subscription Cancelled Successfully!`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        } catch (error) {
          props.setloader(false);
          return toast.error(`${error.response.data.message}`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    });
  };

  return (
    <>
      <Modal
        show={props.showPriorityModel}
        onHide={props.handlePriorityClose}
        size={props.subscriptionStatus === "paid" ? "lg" : ""}
      >
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title font-weight-bold">
              {props.subscriptionStatus === "paid" ? (
                "View Subscription"
              ) : (
                <>{`${props.modalHeading}`}</>
              )}
            </h5>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {props.subscriptionStatus === "paid" ? (
              <>
                <div className="subs_wrapper">
                  <div className="table-responsive custom-table">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Total Amount</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {props.companyData.plan_type === "small"
                              ? `$${process.env.REACT_APP_SMALL_BUSINESS}`
                              : props.companyData.plan_type === "medium"
                              ? `$${process.env.REACT_APP_MEDIUM_BUSINESS}`
                              : `$${process.env.REACT_APP_ENTERPRISE_BUSINESS}`}
                          </td>
                          <td>
                            {moment(props.companyData.start_date).format("LL")}
                          </td>
                          <td>
                            {moment(props.companyData.end_date).format("LL")}
                          </td>
                          <td>
                            <span
                              className="ml-2 badge badge-pill badge-danger font-lg-12 p-2 text-uppercase btn"
                              onClick={(e) => cancleSubscriptionHandler()}
                            >
                              Cancel
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="table-responsive custom-table mt-3">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Card Number</th>
                          <th scope="col">Type</th>
                          <th scope="col">Expire Date</th>
                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {props?.cardDetails.map((card, key) => (
                          <tr>
                            <td>{`**** **** **** ${card.last4}`}</td>
                            <td>
                              <span className="ml-2 badge badge-pill badge-info font-lg-12 p-2 text-uppercase btn">
                                {" "}
                                Default
                              </span>
                            </td>
                            <td>{`${card.exp_month}/${card.exp_year}`}</td>
                            {/* <td></td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <Elements stripe={stripePromise}>
                <StripeSubscriptionForm
                  setShowModel={props.setShowPriorityModel}
                  getPageData={props.getPageData}
                />
              </Elements>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {props.subscriptionStatus === "paid" ? (
            <>
              <Button
                variant="secondary"
                className="btn btn-lg-primary"
                onClick={(e) => {
                  props.setShowPriorityModel(false);
                }}
              >
                Close
              </Button>
            </>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubscriptionModal;
