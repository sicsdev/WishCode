import { useState } from "react";
import SubscriptionModal from "../Component/models/SubscriptionModal";

const SubscriptionCom = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const subscriptionModalHandler = () => {
    setShow(true);
  };
  return (
    <>
      <p>
        Subscription Status:{" "}
        <span className="badge badge-pill badge-secondary font-lg-12 p-2 text-uppercase">
          {props.companyData.subscription_status}
        </span>
        {props.companyData.subscription_status === "trial" ||
        props.companyData.subscription_status === "unpaid" ? (
          <span
            className="ml-2 badge badge-pill badge-danger font-lg-12 p-2 text-uppercase btn"
            onClick={(e) => subscriptionModalHandler()}
          >
            {`Upgrade Subscription ($${process.env.REACT_APP_MONTHLY_PRICE})`}
          </span>
        ) : props.companyData.subscription_status === "paid" ? (
          <span
            className="ml-2 badge badge-pill badge-info font-lg-12 p-2 text-uppercase btn"
            onClick={(e) => subscriptionModalHandler()}
          >
            {`View Subscription`}
          </span>
        ) : null}
      </p>
      <SubscriptionModal
        showPriorityModel={show}
        setShowPriorityModel={setShow}
        handlePriorityClose={handleClose}
        modalHeading={"Get Subscription"}
        companyData={props.companyData}
        subscriptionStatus={props.companyData.subscription_status}
        getPageData={props.getPageData}
        setloader={props.setloader}
        cardDetails={props.cardDetails}
      />
    </>
  );
};

export default SubscriptionCom;
