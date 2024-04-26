import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import AddFeatureModel from "./models/AddFeatureModel";
import { useColor } from "../commanapi/ColorProvider";

const Sidebar = ({ children, isToggleOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const user_role = localStorage.getItem("role");
  // const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDescription, setFeatureDescription] = useState("")
  const [selectedFile, setselectedFile] = useState(null);
  const [loader, setloader] = useState(false);
  const { menus } = useColor();

  // const toggleMenu = (e) => {
  //   setIsToggleOpen((prevState) => !prevState);
  // };

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
  const handleSuggestNew = () => {
    setShow(true);
    setFeatureTitle("");
    setFeatureDescription("")
  }
  useEffect(() => {
    getProductData();
  })
  const getProductData = () => {
    return null;
  }

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSidebar = (slug) => {
    if (isMobile) {
      toggleMenu();
    }
    navigate(slug);
  }

  return (
    <>
      <div
        id="sidebar-menu"
        className={`${isToggleOpen === true ? "sidebar-menu remove-sidebar-text" : "sidebar-menu"}`}
        style={
          isToggleOpen && isMobile === true
            ? { width: "0px" }
            : isToggleOpen && !isMobile === true
              ? { width: "80px" }
              : { width: "300px" }
        }
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
        <div className={`sidebar-menu-inner ${isToggleOpen && !isMobile === true ? "sidebarTitle" : ""}`}>
          <div className="menu-items">
            {user_role == 1 ? (
              <>
                <div to="/dashboard" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/dashboard")}>
                  <i className="fa fa-tachometer" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Dashboard</span>
                </div>
                <div to="/admin/companies" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/admin/companies")}>
                  <i className="fa fa-address-book-o" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">All Companies</span>
                </div>
                <div to="/admin/users" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/admin/users")}>
                  <i className="fa fa-users" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">End Users</span>
                </div>
                <div to="/admin/approve-request" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/admin/approve-request")}>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Approve Request</span>
                </div>
                <div to="/feature/all" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/feature/all")}>
                  <i className="fa fa-eye" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Priority List</span>
                </div>
                <div to="/search" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/search")}>
                  <i className="fa fa-search" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Search</span>
                </div>
                <div to="/admin/subscription/manage" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/admin/subscription/manage")}>
                  <i className="fa fa-columns" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Manage Plans</span>
                </div>
                <div to="" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/admin/set/menu")}>
                  <i className="fa fa-minus-square" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Set Menu</span>
                </div>
                <div to="" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/theme/setting")}>
                  <i className="fa fa-cog" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </div>
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
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/dashboard")}
                // style={{
                //   backgroundColor: active? "red":"",
                // }}
                >
                  <i className="fa fa-tachometer" aria-hidden="true" style={{ color: "#fff", fontSize: "30px", }}></i>
                  &nbsp;<span className="custom-sidebar-span">Dashboard</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/products")}>
                  <i className="fa fa-product-hunt" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">{menus?.product ? menus?.product : "Products"}</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/company/all-users")}>
                  <i className="fa fa-users" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Company Users</span>
                </div>
                <div to="" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/company/features")}>
                  <i className="fa fa-address-book-o" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">{menus?.feature ? menus?.feature : "Features"}</span>
                </div>
                <div to="" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/company/approve-requests")}>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Approve Requests</span>
                </div>
                <div to="" className="theme-color1 sidebar_links " onClick={() => handleSidebar("/feature/all")}>
                  <i className="fa fa-eye" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">{menus?.view_feature ? menus?.view_feature : "Priority List"}</span>
                </div>
                <div to="" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/company-profile/settings")}>
                  <i className="fa fa-building-o" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span"> {menus?.company_profile ? menus?.company_profile : "Company Profile"}</span>
                </div>
                <div to="/theme/setting" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/theme/setting")}>
                  <i className="fa fa-cog" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </div>
                <Link to="" className="theme-color1 sidebar_links" onClick={logOut}>
                  <i className="fa fa-sign-out" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Logout</span>
                </Link>
              </>
            ) : (
              ""
            )}

            {user_role == 3 ? (
              <>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/dashboard")}>
                  <i className="fa fa-tachometer" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Dashboard</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/products")}>
                  <i className="fa fa-product-hunt" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Products</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/features")}>
                  <i className="fa fa-address-book-o" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Features</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/feature/all")}>
                  <i className="fa fa-eye" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Priority List</span>
                </div>
                <div to="" className="theme-color1 sidebar_links" onClick={() => handleSidebar("/theme/setting")}>
                  <i className="fa fa-cog" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </div>
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
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/products")}>
                  <i className="fa fa-product-hunt" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Products</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/features")}>
                  <i className="fa fa-address-book-o" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Features</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/search")}>
                  <i className="fa fa-search" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Search</span>
                </div>
                <div onClick={() => { handleSuggestNew(); handleSidebar("/theme/setting"); }} className="theme-color1 sidebar_links">
                  <i className="fa fa-plus-square-o" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Suggest New</span>
                </div>
                <div className="theme-color1 sidebar_links" onClick={() => handleSidebar("/theme/setting")}>
                  <i className="fa fa-cog" aria-hidden="true" style={{ color: "#fff", fontSize: "30px" }}></i>
                  &nbsp;<span className="custom-sidebar-span">Theme Setting</span>
                </div>
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

      <div className={`${isToggleOpen === true ? "body-wrapper-1" : "body-wrapper"} `} id="body-content">
        {children}
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
