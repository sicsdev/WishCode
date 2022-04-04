import React, { useState, useEffect } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import Loader from "../Component/Loader";
import { toast, ToastContainer } from "react-toastify";
import ProfileCom from "../Component/ProfileCom";
import { getRequestApi } from "../helper/Helper";

const Profile = () => {
  const [loader, setloader] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      setloader(true);
      let response = await getRequestApi(`/user-profile`);
      if (response?.data?.success === true) {
        setloader(false);
        setPageLoad(true);
        setProfileData(response.data.data);
      } else {
        setloader(false);
        setPageLoad(true);
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setloader(false);
      toast.error(error, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          {pageLoad === true ? (
            <section className="body-content-inner">
              <div className="container">
                <ProfileCom setloader={setloader} profileData={profileData} getProfileData={getProfileData} />
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Profile;
