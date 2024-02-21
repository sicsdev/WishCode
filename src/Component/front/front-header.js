import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FrontHeader = () => {
  const tokens = localStorage.getItem("token");
  const navigate = useNavigate();
  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    toast.success("Logout Successfully!!", {
      position: "bottom-right",
      autoClose: 2000,
    });

  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light header_navbar">
        <div className="container">
          <div className="brand-nam brand navbar-left">
            <Link className="header-top_logo" to="/">
              <h3 className="">WishTrax</h3>
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {tokens === null ? (
              <li>
                <Link to="/login" className="btn btn-small sign_in_btn">
                  SIGN IN
                </Link>
                <Link to="/register" className="btn btn-small register_btn">
                  Register
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="" onClick={logOut} className="btn btn-small sign_in_btn">
                    Logout
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="btn btn-small sign_in_btn">
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default FrontHeader;
