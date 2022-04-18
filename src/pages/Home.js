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
          <section className="top-banner-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h2>
                    Lorem ipsum is a dummy
                  </h2>
                  <p>
                    Lorem ipsum is a dummy text for the dummy Lorem ipsum is a dummy text for the Lorem ipsum is a dummy text for the test.
                  </p>
                  <button className="btn btn-landing">SEE MORE</button>
                </div>
              </div>
            </div>
          </section>
          <section className="companies_wrapper section-gap">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title">
                    <h3>
                      COMPANIES
                      {/* <span className="pl-3">
                        <img
                          src={
                            window.location.origin + "/img/home/company-graph.png"
                          }
                          className="img-responsive"
                          alt="img"
                        />
                      </span> */}
                    </h3>
                  </div>


                  <div className="company_list_wrapper ">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card-wrapper">
                          <img
                            className="card-img-top pt-2"
                            src={`${imageBaseUrl}/images/default-company-logo.png`}
                            alt="Card cap"
                          />
                          <div className="card-body-content">
                            <p>
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>



          <section className="features_wrapper section-gap">
            <div className="container">
              <div className="section-title">
                <h3>Features</h3>
              </div>

              <div className="features_content_iinner ">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-wrapper">
                      <img
                        className="card-img-top pt-2"
                        src={`${imageBaseUrl}/images/default-company-logo.png`}
                        alt="Card cap"
                      />
                      <div className="card-body-content">
                        <h5>test title</h5>
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>



          <section className="signup_wrapper section-gap">
            <div className="container">
              <div className="section-title">
                <h3>Where can I get some?</h3>
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
                <button className="btn btn-landing">SIGN UP</button>
              </div>
            </div>
          </section>
          <section className="footer">
            <div className="container">
              <div className="copyright">
                <p className="mb-0">  © Copyright WishTrax 2022. All rights reserved.</p>
              </div>
            </div>
          </section>

        </div>

      </div>
    </>
  );
};

export default Home;
