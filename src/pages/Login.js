import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "react-toastify/dist/ReactToastify.css";
import GoogleLoginComp from "../Component/SocialLogins/GoogleLoginComp";
import FacebookLoginComp from "../Component/SocialLogins/FacebookLoginComp";

const Login = ({ }) => {
  const myGoogleAppId = process.env.REACT_APP_GOOGLE_APP_ID;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloader, setIsLoader] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, []);

  const loginhandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    setIsLoader(true);
    try {
      const { data } = await axiosConfig.post(
        "/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("role", data?.data?.role_id);
      localStorage.setItem("userName", data?.data?.name);
      localStorage.setItem("token", data.token);
      setEmail("");
      setPassword("");
      setIsLoader(false);
      toast.success("login successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        if (data.data.role_id == 2) {
          navigate("/company/features");
        } else if (data.data.role_id == 4) {
          navigate("/products");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (error) {
      // console.log('Error', error.response.data);
      setIsLoader(false);
      return toast.error(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={myGoogleAppId}>
        <div className="auth-wrapper">
          <div className="login-form-inner">
            <div className="brand-nam">
              <h3 className="pb-3">WishTrax</h3>
            </div>
            <div className="login-form">
              <h3 className="pb-3">.Login to your account.</h3>
              <form onSubmit={loginhandler}>
                <div className="input-form">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Username"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-form">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-form">
                  <button type="submit" className="btn btn-lg-primary w-100">
                    {isloader ? (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    ) : (
                      ""
                    )}
                    Login
                  </button>
                </div>

                <div className="forget-password pt-3">
                  <Link to="/forget-password" className="btn-link d-block pt-1">
                    Forget Password?
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
              <GoogleLoginComp />
              <FacebookLoginComp/>
            </div>
          </div>
          <ToastContainer />
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default Login;
