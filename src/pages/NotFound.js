import React from "react";
import { Link } from "react-router-dom";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
const NotFound = () => {
  return (
    <div className="main-body">
      <Sidebar />
      <div className="body-wrapper" id="body-content">
        <Header />
        <section className="body-content-inner">
          <div className="container">
            <div>
              <h5>404 - Not Found!</h5>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
