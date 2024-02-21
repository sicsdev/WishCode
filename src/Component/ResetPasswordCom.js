import React, { useState } from "react";
import InputText from "./Inputs/InputText";
import { Link } from "react-router-dom";
import ButtonCom from "./Inputs/ButtonCom";
import { toast } from "react-toastify";
import { postRequestAPi } from "../helper/Helper";
import { useNavigate } from "react-router-dom";

const ResetPasswordCom = (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return false;
    } else if (password.length <= 6) {
      setErrorMessage("Password is 6 characters minimum!");
      return false;
    } else {
      setErrorMessage("");
    }
    props.setloader(true);
    let payload = {
      token: props.token,
      password: password,
    };
    const res = await postRequestAPi("/reset", payload);
    if (res && res.success === true) {
      props.setloader(false);
      setPassword("");
      setConfirmPassword("");
      toast.success(res.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      props.setloader(false);
    }
  };

  return (
    <>
      <div className="forget-form">
        <h3 className="pb-3">Reset Password</h3>
        <form onSubmit={resetPasswordHandler}>
          <InputText
            label={""}
            className={"form-control"}
            placeholder={"New Password"}
            type={"password"}
            value={password}
            setValue={setPassword}
            required={true}
          />
          <InputText
            label={""}
            className={"form-control"}
            placeholder={"Confirm Password"}
            type={"password"}
            value={confirmPassword}
            setValue={setConfirmPassword}
            required={true}
          />
          <span className="errorMessage">{errorMessage}</span>
          <ButtonCom
            name={"Reset"}
            className={"btn btn-lg-primary w-100"}
            type={"submit"}
            disable={props.isReset}
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
    </>
  );
};

export default ResetPasswordCom;
