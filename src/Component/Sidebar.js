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
                  &nbsp;<span>Dashboard</span>
                </Link>
                <Link to="/admin/companies" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>All Companies</span>
                </Link>
                <Link to="/admin/users" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>End Users</span>
                </Link>
                <Link to="/admin/approve-request" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Approve Request</span>
                </Link>
                <Link to="/feature/all" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>View Features</span>
                </Link>
                <Link to="/search" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Search</span>
                </Link>
                <Link to="/admin/subscription/manage" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Manage Plans</span>
                </Link>
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span>Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}

            {user_role == 2 ? (
              <>
                <Link to="/dashboard" className="theme-color1">
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  &nbsp;<span>Dashboard</span>
                </Link>
                <Link to="/company/all-users" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Company Users</span>
                </Link>
                <Link to="/company/features" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Features</span>
                </Link>
                <Link to="/company/approve-requests" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Approve Requests</span>
                </Link>
                <Link to="/feature/all" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>View Features</span>
                </Link>
                <Link to="/company-profile/settings" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Company Profile</span>
                </Link>
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span>Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}

            {user_role == 3 ? (
              <>
                <Link to="/dashboard" className="theme-color1">
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  &nbsp;<span>Dashboard</span>
                </Link>
                <Link to="/features" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Features</span>
                </Link>
                <Link to="/feature/all" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>View Features</span>
                </Link>
                  {/* <Link to="/suggest/feature" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Suggest Features</span>
                </Link> */}
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span>Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}

            {user_role == 4 ? (
              <>
                <Link to="/products" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Products</span>
                </Link>
                <Link to="/features" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Features</span>
                </Link>
                <Link to="/search" className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Search</span>
                </Link>
                <Link onClick={handleSuggestNew} className="theme-color1">
                  <i className="fa fa-address-book-o" aria-hidden="true"></i>
                  &nbsp;<span>Suggest New</span>
                </Link>
                <Link to="" className="theme-color1" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;<span>Logout</span>
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
