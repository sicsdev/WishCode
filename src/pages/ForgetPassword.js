import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ForgetPassCom from "../Component/ForgetPassCom";

const ForgetPassword = () => {
  return (
    <>
      <div className="auth-wrapper custom-background" style={{ backgroundImage: `url('home-bg.png')` }}>
        <div className="login-form-inner">
          <div className="brand-nam">
            <h3 className="pb-3">WishTrax</h3>
          </div>
          <ForgetPassCom />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ForgetPassword;
