import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputText from "../Component/Inputs/InputText";
import ButtonCom from "../Component/Inputs/ButtonCom";
import InputRadioCom from "../Component/Inputs/InputRadioCom";
import { postRequestAPi } from "../helper/Helper";
import swal from "sweetalert";

const UserRegister = () => {
  const [userType, setUserType] = useState("user");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [passwordHint, setPasswordHint] = useState(false);
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, []);

  const mustContainData = [
    ["an uppercase letter (A-Z)", containsUL],
    ["a lowercase letter (a-z)", containsLL],
    ["a number (0-9)", containsN],
    ["a special character (!@#$)", containsSC],
    ["at least 8 characters", contains8C],
  ];

  const validatePassword = (value) => {
    let passwordOne = value;
    setPassword(passwordOne);
    setPasswordHint(true);
    let temp_all_valid = true;
    setDisableButton(false);
    // has uppercase letter
    if (passwordOne.toLowerCase() !== passwordOne) {
      setContainsUL(true);
    } else {
      setContainsUL(false);
      temp_all_valid = false;
    }

    // has lowercase letter
    if (passwordOne.toUpperCase() !== passwordOne) {
      setContainsLL(true);
    } else {
      setContainsLL(false);
      temp_all_valid = false;
    }
    // has number
    if (/\d/.test(passwordOne)) {
      setContainsN(true);
    } else {
      setContainsN(false);
      temp_all_valid = false;
    }
    // has special character
    if (/[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(passwordOne)) {
      setContainsSC(true);
    } else {
      setContainsSC(false);
      temp_all_valid = false;
    }
    // has 8 characters
    if (passwordOne.length >= 8) {
      setContains8C(true);
    } else {
      setContains8C(false);
      temp_all_valid = false;
    }
    // all validations passed
    if (temp_all_valid) {
      setPasswordHint(false);
      setDisableButton(true);
    }
  };

  const createCompanySlug = (val) => {
    // let Text = company_name;
    let slug = val
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setCompanySlug(slug);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
    let payload = {
      user_name: userName,
      email: userEmail,
      user_password: password,
      company_name: companyName,
      company_slug: companySlug,
      user_type: userType,
    };
    const res = await postRequestAPi("/register", payload);
    if (res && res.success === true) {
      if (userType === "company") {
        swal(
          "Success",
          "Your request send to Admin Successfully. You will get email nortification once admin approve your request!",
          "success"
        );
      } else {
        swal("Success", res.message, "success");
      }
      setUserType("user");
      setUserName("");
      setUserEmail("");
      setCompanyName("");
      setCompanySlug("");
      setPassword("");
      setConfirmPassword("");
      toast.success(res.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      return toast.error(
        `${
          res.message && res.message.email
            ? res.message.email[0]
            : res.message.company_slug
            ? res.message.company_slug[0]
            : res.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <>
      <div className="auth-wrapper custom-background" style={{ backgroundImage: `url('home-bg.png')` }}>
        <div className="login-form-inner">
          <div className="brand-nam">
            <h3 className="pb-3">WishTrax</h3>
          </div>
          <div className="login-form">
            <h3 className="pb-3">Create Account</h3>
            <form autoComplete="off" onSubmit={registerHandler}>
              <InputRadioCom
                label={"End User"}
                className={"form-check-input"}
                value={"user"}
                setValue={setUserType}
                name={"user_type"}
                checked={userType}
              />
              <InputRadioCom
                label={"Company"}
                className={"form-check-input"}
                value={"company"}
                setValue={setUserType}
                name={"user_type"}
                checked={userType}
              />
              <InputText
                label={""}
                className={"form-control"}
                placeholder={"User Name"}
                type={"text"}
                value={userName}
                setValue={setUserName}
                required={true}
              />
              <InputText
                label={""}
                className={"form-control"}
                placeholder={"User Email"}
                type={"email"}
                value={userEmail}
                setValue={setUserEmail}
                required={true}
              />
              <InputText
                label={""}
                className={"form-control"}
                placeholder={"Password"}
                type={"password"}
                value={password}
                setValue={validatePassword}
                required={true}
              />
              {passwordHint == true ? (
                <div className="password-hint-sec">
                  {mustContainData.map((item, key) => {
                    if (item[1] === false) {
                      return (
                        <div className="password-hint-wrapper" key={key}>
                          <div>
                            <div className="mr-2">
                              <i
                                className="fa fa-times alert-red"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div style={{ paddingLeft: 5 }}>
                            <p className="mb-0" style={{ fontSize: 14 }}>
                              Must contain {item[0]}
                            </p>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              ) : (
                ""
              )}
              <InputText
                label={""}
                className={"form-control"}
                placeholder={"Confirm Password"}
                type={"password"}
                value={confirmPassword}
                setValue={setConfirmPassword}
                required={true}
              />
              {userType === "company" ? (
                <>
                  <InputText
                    label={""}
                    className={"form-control"}
                    placeholder={"Company Name"}
                    value={companyName}
                    setValue={setCompanyName}
                    type={"text"}
                    onblur={createCompanySlug}
                    isOnBlur={true}
                    required={true}
                  />
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <input
                        type={"text"}
                        className={"form-control"}
                        value={"wishtrax.com/"}
                        readOnly
                      />
                    </div>
                    <div className="col-md-8 col-sm-6">
                      <InputText
                        label={""}
                        className={"form-control"}
                        placeholder={"Company Slug"}
                        value={companySlug}
                        setValue={setCompanySlug}
                        type={"text"}
                        onblur={createCompanySlug}
                        isOnBlur={true}
                        required={true}
                      />
                    </div>
                  </div>
                </>
              ) : null}

              {disableButton == false ? (
                <ButtonCom
                  name={"Register"}
                  className={"btn btn-lg-primary w-100"}
                  type={"submit"}
                  disable={true}
                />
              ) : (
                <ButtonCom
                  name={"Register"}
                  className={"btn btn-lg-primary w-100"}
                  type={"submit"}
                  disable={false}
                />
              )}
              <div className="forget-password pt-3">
                <span className="d-block pt-1">
                  By signing up, you agree to our Terms , Data Policy and
                  Cookies Policy .
                </span>
                <div className="line_wrapper">
                  <div className="line_child"></div>
                  <div className="or position-relative pt-1">
                    <span>OR</span>
                  </div>
                  <div className="line_child"></div>
                </div>
                <Link to="/login" className="btn-link pt-1 d-block">
                  Have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UserRegister;
