import React from "react";
import { imageBaseUrl } from "../base_url/config";

const Home = () => {
  return (
    <>
      <div className="main-body">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light header_navbar">
            <div className="container">
              <div className="brand-nam brand navbar-left">
                <h3 className="">WishTrax</h3>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <button className="btn btn-small sign_in_btn">SIGN IN</button>
                  <button className="btn btn-small register_btn">
                    Register
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="home_wrapper">
          <section className="top-banner-wrapper bg-yellow">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h2>
                    Lorem ipsum is a dummy text for the <span>dummy</span>
                  </h2>
                  <p>
                    Lorem ipsum is a dummy text for the <span>dummy</span>
                  </p>
                  <button className="btn">SEE MORE</button>
                </div>
              </div>
            </div>
          </section>
          <section className="companies_wrapper p-5 bg-red">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3>
                    COMPANIES
                    <span className="pl-3">
                      <img
                        src={
                          window.location.origin + "/img/home/company-graph.png"
                        }
                        className="img-responsive"
                        alt="img"
                      />
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </section>
          <section className="company_list_wrapper p-5 bg-white">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="features_wrapper p-5 bg-red">
            <div className="container">
              <div className="row">
                <h3 className="pb-5">Features</h3>
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h5>test title</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h5>test title</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h5>test title</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img
                      className="card-img-top pt-2"
                      src={`${imageBaseUrl}/images/default-company-logo.png`}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h5>test title</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="footer">
          <div className="">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
