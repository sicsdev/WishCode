import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ResetPasswordCom from "../Component/ResetPasswordCom";
import Loader from "../Component/Loader";
import { getRequestApi } from "../helper/Helper";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  let { token } = useParams();
  const [loader, setloader] = useState(false);
  const [isReset, setIsReset] = useState(true);

  useEffect(() => {
    verifyResetTokenHandler();
  }, [token]);

  const verifyResetTokenHandler = async (e) => {
    setloader(true);
    try {
      let response = await getRequestApi(`/verify/${token}`);
      if (response?.data?.success === true) {
        setloader(false);
        setIsReset(false);
      } else {
        setloader(false);
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setloader(false);
      toast.error("Invalid Token", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="login-form-inner">
          <div className="brand-nam">
            <h3 className="pb-3">WishTrax</h3>
          </div>
          <ResetPasswordCom
            setloader={setloader}
            token={token}
            isReset={isReset ? isReset : ""}
          />
        </div>
        {loader === true ? <Loader /> : <></>}
        <ToastContainer />
      </div>
    </>
  );
};

export default ResetPassword;
