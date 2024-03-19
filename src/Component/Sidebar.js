import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import AddFeatureModel from "./models/AddFeatureModel";

const Sidebar = () => {
  const navigate = useNavigate();
  const user_role = localStorage.getItem("role");
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [show,setShow] =useState(false);
  const handleClose = () => setShow(false);
  const [featureTitle,setFeatureTitle]= useState("");
  const [featureDescription,setFeatureDescription] =useState("")
  const [selectedFile, setselectedFile] = useState(null);
  const [loader, setloader] = useState(false);
  const toggleMenu = (e) => {
    setIsToggleOpen((prevState) => !prevState);
  };

  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    toast.success("Logout Successfully!!", {
      position: "bottom-right",
      autoClose: 2000,
    });
    window.location.reload();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
 const handleSuggestNew=()=>{
  setShow(true);
  setFeatureTitle("");
  setFeatureDescription("")
 }
 useEffect(()=>{
  getProductData();
 })
 const getProductData=()=>{
     return null;
 }
  return (
    <>
      <div
        id="sidebar-menu"
        className={
          isToggleOpen === true
            ? "sidebar-menu hide-mobile remove-sidebar-text"
            : "sidebar-menu hide-mobile"
        }
        style={isToggleOpen === true ? { width: "80px" } : { width: "300px" }}
      >
        <div className="brand-name">
          <h3>WishTrax</h3>
          <a className="d-inline-block" onClick={toggleMenu}>
            <img
              src={window.location.origin + "/img/toggle.png"}
              className="img-fluid"
              width="20px"
            />
          </a>
        </div>
        <div className="sidebar-menu-inner">
          <div className="menu-items">
            {user_role == 1 ? (
              <>
                <Link to="/dashboard" className="theme-color1">
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Dashboard</span>
                </Link>
                <Link to="/admin/companies" className="theme-color1">
                  <i className="fa fa-building-o" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">All Companies</span>
                </Link>
                <Link to="/admin/users" className="theme-color1">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">End Users</span>
                </Link>
                <Link to="/admin/approve-request" className="theme-color1">
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Approve Request</span>
                </Link>
                <Link to="/feature/all" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">View Features</span>
                </Link>
                <Link to="/search" className="theme-color1">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Search</span>
                </Link>
                <Link to="/admin/subscription/manage" className="theme-color1">
                  <i className="fa fa-columns" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Manage Plans</span>
                </Link>
                <Link to="/theme/setting" className="theme-color1">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </Link>
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}

            {user_role == 2 ? (
              <>
                <Link to="/dashboard" className="theme-color1">
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Dashboard</span>
                </Link>
                <Link to="/company/all-users" className="theme-color1">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Company Users</span>
                </Link>
                <Link to="/company/features" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Features</span>
                </Link>
                <Link to="/company/approve-requests" className="theme-color1">
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Approve Requests</span>
                </Link>
                <Link to="/feature/all" className="theme-color1">
                  <i className="fa fa-eye" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">View Features</span>
                </Link>
                <Link to="/company-profile/settings" className="theme-color1">
                  <i className="fa fa-building-o" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Company Profile</span>
                </Link>
                <Link to="/theme/setting" className="theme-color1">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </Link>
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}

            {user_role == 3 ? (
              <>
                <Link to="/dashboard" className="theme-color1">
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Dashboard</span>
                </Link>
                <Link to="/features" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Features</span>
                </Link>
                <Link to="/feature/all" className="theme-color1">
                  <i className="fa fa-eye" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">View Features</span>
                </Link>
                <Link to="/theme/setting" className="theme-color1">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </Link>
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}

            {user_role == 4 ? (
              <>
                <Link to="/products" className="theme-color1 active">
                  <i className="fa fa-product-hunt" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Products</span>
                </Link>
                <Link to="/features" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Features</span>
                </Link>
                <Link to="/search" className="theme-color1">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Search</span>
                </Link>
                <Link onClick={handleSuggestNew} className="theme-color1">
                  <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Suggest New</span>
                </Link>
                <Link to="/theme/setting" className="theme-color1">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </Link>
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span className="custom-sidebar-span">Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <AddFeatureModel
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        companyId={""}
        setloader={setloader}
        getPageData={getProductData}
        featureTitle={featureTitle}
        featureDescription={featureDescription}
        selectedFile={""}
        setselectedFile={setselectedFile}
        setfeatureTitle={setFeatureTitle}
        setfeatureDescription={setFeatureDescription}
        featureId={""}
        setfeatureId={""}
        productData={""}
        companyData={""}
      />
    </>
  );
};

export default Sidebar;
