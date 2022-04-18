import React from "react";
import { Link } from "react-router-dom";

const HomeBottom = () => {
  return (
    <section className="signup_wrapper section-gap">
      <div className="container">
        <div className="section-title">
          <h3>Where can I get some?</h3>
          <p>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </p>
          <Link to="/register" className="btn btn-landing">
            SIGN UP
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBottom;
