import React from "react";
import { Link } from "react-router-dom";

const FrontHeader = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light header_navbar">
        <div className="container">
          <div className="brand-nam brand navbar-left">
            <h3 className="">WishTrax</h3>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/login" className="btn btn-small sign_in_btn">
                SIGN IN
              </Link>
              <Link to="/register" className="btn btn-small register_btn">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default FrontHeader;
