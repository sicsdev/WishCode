import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  // const headerValue = useContext(HeaderContextApi);
  const [userRole, setUserRole] = useState("");
  // console.log("contextapivalue>>",headerValue);
  useEffect(() => {
    let getUserRole = parseInt(localStorage.getItem("role"));
    switch (getUserRole) {
      case 1:
        setUserRole('super-admin');
        break;
      case 2:
        setUserRole('company-admin')
        break;
      case 3:
        setUserRole('company-user');
        break;
      case 4:
        setUserRole('end-user');
        break;
      default:
        // Handle any other cases here
        setUserRole('default');
        break;
    }
  }, []);
  return (
    <>
      <nav className="bg--header">
        <div className="container">
          <div className="d-flex justify-content-between py-3 align-items-center">
            <div className="title-bar">
              <button onClick={() => navigate(-1)} className="btn back-btn context-button">
                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
              </button>
            </div>
            <div id="navbar-custom">
              <ul className="d-flex justify-content-center align-items-center mb-0">
                <li className="nav-item pl-lg-4 pr-2">
                  <div className="d-flex  align-items-center">
                    <div><i className="fa fa-user-circle" aria-hidden="true"></i></div>
                    <p className="mb-0" style={{ paddingLeft: "4px" }}>{localStorage.getItem("userName")}</p>
                    <p className="mb-0" style={{ fontSize: "12px", paddingLeft: "4px" }}>({userRole})</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
