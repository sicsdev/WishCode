import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg--header">
        <div className="container">
          <div className="d-flex justify-content-between py-3 align-items-center">
            <div className="title-bar">
              <button onClick={() => navigate(-1)} className="btn back-btn">
                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
              </button>
            </div>
            {/* <div id="navbar-custom">
              <ul className="d-flex justify-content-center align-items-center mb-0">
                <li className="nav-item pl-lg-4 pr-2">
                  <a className="account-name d-inline-block">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
