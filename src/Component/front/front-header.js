import React, { useState } from "react";
import { Link } from "react-router-dom";

const FrontHeader = () => {
  const tokens = localStorage.getItem("token");
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
              <li>
                <Link to="/logout" className="btn btn-small sign_in_btn">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default FrontHeader;
