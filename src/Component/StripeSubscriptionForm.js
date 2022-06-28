import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axiosConfig from "../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useEffect } from "react";

const StripeSubscriptionForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loader, setloader] = useState(false);
  const tokens = localStorage.getItem("token");
  const [subscriptionpaln, setSubscriptionplan] = useState()
  const [planType, setPlanType] = useState(
    process.env.REACT_APP_MEDIUM_BUSINESS_PRICE_ID
  );
  const [planName, setPlanName] = useState("medium");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  const cardStyle = {
    style: {
      base: {
        color: "#575757",
        fontWeight: 600,
        fontFamily: "Nunito, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        letterSpacing: "0px",
        ":-webkit-autofill": {
          color: "#575757",
        },
        "::placeholder": {
          color: "#9C9C9C",
          fontSize: "14px",
          letterSpacing: "0.46px",
          fontWeight: "400",
          fontFamily: "Nunito, sans-serif",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const createPaymentMethod = async (e) => {
    if (!stripe || !elements) {
      return;
    }
    setloader(true);
    let cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      setloader(false);
    } else {
      await createPaymentIntent(cardElement, paymentMethod);
    }
  };
  const createPaymentIntent = async (cardElement, paymentMethod) => {
    let card_token = await stripe.createToken(cardElement);
    try {
      const response = await axiosConfig.post(
        "/company-admin/subscription/create",
        {
          token_id: card_token.token.id,
          planType: planType,
          planName: planName,
        },
        config
      );
      setloader(false);
      props.setShowModel(false);
      props.getPageData();
      return toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${error.response.data.message && error.response.data.message.token_id
          ? error.response.data.message.token_id[0]
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
    getAllsubscription();
  }, []);
  const getAllsubscription = async (e) => {
    try {
      const { data } = await axiosConfig.get(
        "company-admin/subscription/get_plans",
        config
      );
      console.log("data", subscriptionpaln)

      setSubscriptionplan(data.data);

    } catch (error) {

    }

  };
  return (
    <div className="stripecard-container">
      <div className="input-form">
        <label>Select Plan</label>
        <select
          className="form-control"
          onChange={(e) => {
            setPlanType(e.target.value);
            setPlanName(
              e.target[e.target.selectedIndex].getAttribute("data-type")
            );
          }}
          defaultValue={planType}
        >
          {subscriptionpaln?.map(plans =>
            <option key={plans.key} value={plans.key}>{plans.nickname}(${plans.amount/100}/{plans.interval})</option>
          )};
        </select>
      </div>

      <div className="stripe_card_number">
        <CardNumberElement options={cardStyle} className="form-control" />
      </div>

      <div className="card_wrapper">
        <div className="stripe_card_expiry">
          <CardExpiryElement options={cardStyle} className="form-control" />
        </div>
        <div className="stripe_card_cvv mt-3">
          <CardCvcElement options={cardStyle} className="form-control" />
        </div>
      </div>
      {/* <PaymentElement /> */}
      <div className="sign-in-btn">
        <form>
          <button
            type="button"
            className="btn btn-lg-primary mt-3"
            onClick={(e) => {
              createPaymentMethod();
            }}
          >
            Upgrade
          </button>
        </form>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </div>
  );
};

export default StripeSubscriptionForm;
