import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputText from "../Component/Inputs/InputText";
import ButtonCom from "../Component/Inputs/ButtonCom";
import { postRequestAPi } from "../helper/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const ForgetPassCom = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loader, setloader] = useState(false);
  const forgetPasswordHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      let payload = {
        email: userEmail,
      };
      const res = await postRequestAPi("/forget-password", payload);
      if (res && res.success === true) {
        setloader(false);
        setUserEmail("");
        toast.success(
          "We have sent you an email containing your password reset link. Follow the link to reset your password!",
          {
            position: "bottom-right",
            autoClose: 4000,
          }
        );
      } else {
        setloader(false);
        return toast.error(
          `${
            res.message && res.message.email
              ? res.message.email[0]
              : res.message
          }`,
          {
            position: "bottom-right",
            autoClose: 2000,
          }
        );
      }
    } catch (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <div className="forget-form">
        <h3 className="pb-3">Forget Password?</h3>
        <form onSubmit={forgetPasswordHandler}>
          <InputText
            label={""}
            className={"form-control"}
            placeholder={"Email"}
            type={"email"}
            value={userEmail}
            setValue={setUserEmail}
            required={true}
          />
          <ButtonCom
            name={"Submit"}
            className={"btn btn-lg-primary w-100"}
            type={"submit"}
            disable={false}
          />
          <div className="forget-password pt-3">
            <Link to="/login" className="btn-link d-block pt-1">
              Sign In to Existing Account?
            </Link>
            <div className="line_wrapper">
              <div className="line_child"></div>
              <div className="or position-relative pt-1">
                <span>OR</span>
              </div>
              <div className="line_child"></div>
            </div>

            <Link to="/register" className="btn-link pt-1 d-block">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      {loader === true ? <Loader /> : <></>}
    </div>
  );
};

export default ForgetPassCom;
