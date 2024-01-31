import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { useState, useEffect } from "react";
import InputText from "../Component/Inputs/InputText";
import ButtonCom from "../Component/Inputs/ButtonCom";
import Loader from "../Component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequestApi } from "../helper/Helper";
import axiosConfig from "../base_url/config";
import { imageBaseUrl } from "../base_url/config";
import SubscriptionCom from "../Component/SubscriptionCom";

const StripeSetting = () => {
  const [loader, setloader] = useState(false);
  const [companyData, setCompanyData] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyProfileImage, setCompanyProfileImage] = useState("");
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getCompanyProfileData();
  }, []);

  const getCompanyProfileData = async () => {
    setloader(true);
    let response = await getRequestApi(`/company-admin/profile`);
    if (response) {
      setloader(false);
      if (response.data.data) {
        setCompanyData(response.data.data);
        setCompanyName(response.data.data.company_name);
        setCardDetails(response.data.cardDetails.data);
      } else {
        setloader(false);
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      setloader(false);
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("company_profile_pic", companyProfileImage);
    try {
      const { data } = await axiosConfig.post(
        "/company-admin/company-profile/update",
        formData,
        config
      );
      setloader(false);
      getCompanyProfileData();
      toast.success("Company Profile Updated Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${
          error.response.data.message &&
          error.response.data.message.company_name
            ? error.response.data.message.company_name[0]
            : error.response.data.message
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
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">Company Profile</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form onSubmit={(e) => updateProfileHandler(e)}>
                        <InputText
                          label={"Company Name"}
                          type="text"
                          value={companyName}
                          setValue={setCompanyName}
                          className={"form-control"}
                          placeholder={"Company Name"}
                          required={true}
                        />
                        <InputText
                          label={"Company Profile"}
                          type="file"
                          // value={""}
                          setValue={setCompanyProfileImage}
                          className={"form-control"}
                          placeholder={"Company Profile"}
                          accept=".jpg,.jpeg,.png"
                        />
                        <div className="user-img">
                          <img
                            src={`${imageBaseUrl}/${companyData.company_logo}`}
                            alt=""
                          />
                        </div>
                        <ButtonCom
                          name={"Submit"}
                          type={"submit"}
                          className={"btn btn-lg-primary"}
                        />
                      </form>
                      <div className="subscription-wrapper mt-5">
                        <SubscriptionCom
                          companyData={companyData}
                          getPageData={getCompanyProfileData}
                          setloader={setloader}
                          cardDetails={cardDetails}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default StripeSetting;
