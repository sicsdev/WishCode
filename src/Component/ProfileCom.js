import React, { useState, useEffect } from "react";
import InputText from "./Inputs/InputText";
import ButtonCom from "./Inputs/ButtonCom";
import { imageBaseUrl } from "../base_url/config";
import { postRequestAPi } from "../helper/Helper";
import { toast } from "react-toastify";

const ProfileCom = (props) => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUserName(props.profileData.name);
    setEmail(props.profileData.email);
  }, [props.profileData]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    if (password !== "") {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match!");
        return false;
      } else if (password.length <= 6) {
        setErrorMessage("Password is 6 characters minimum!");
        return false;
      } else {
      }
    }
    setErrorMessage("");
    props.setloader(true);
    const formData = new FormData();
    formData.append("user_name", userName);
    formData.append("password", password);
    formData.append("profile_pic", profileImage);

    const res = await postRequestAPi("/profile/update", formData);
    if (res && res.success === true) {
      props.setloader(false);
      props.getProfileData();
      setPassword("");
      setConfirmPassword("");
      toast.success(res.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      props.setloader(false);
    }
  };

  return (
    <>
      <div className="dashboard card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">My Profile</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <form
                onSubmit={(e) => updateProfileHandler(e)}
                autoComplete={false}
              >
                <InputText
                  label={"User Name"}
                  type="text"
                  value={userName}
                  setValue={setUserName}
                  className={"form-control"}
                  placeholder={"User Name"}
                  required={true}
                />
                <InputText
                  label={""}
                  className={"form-control"}
                  placeholder={"User Email"}
                  type={"email"}
                  value={email}
                  setValue={setEmail}
                  disabled={true}
                />
                <InputText
                  label={"New Password"}
                  type="password"
                  value={password}
                  setValue={setPassword}
                  className={"form-control"}
                  placeholder={"Update Password"}
                  required={""}
                />
                <InputText
                  label={"Confirm New Password"}
                  type="password"
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  className={"form-control"}
                  placeholder={"Confirm New Password"}
                  required={""}
                />
                <InputText
                  label={"Profile Image"}
                  type="file"
                  setValue={setProfileImage}
                  className={"form-control"}
                  placeholder={"Profile Image"}
                  accept=".jpg,.jpeg,.png"
                />
                <div className="user-img">
                  <img
                    src={`${imageBaseUrl}/${props.profileData.profile_pic}`}
                    alt=""
                  />
                </div>
                <span className="errorMessage">{errorMessage}</span>
                <ButtonCom
                  name={"Update Profile"}
                  type={"submit"}
                  className={"btn btn-lg-primary"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCom;
