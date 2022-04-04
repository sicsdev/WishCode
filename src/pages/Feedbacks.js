import React from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { Link } from "react-router-dom";

const Feedbacks = () => {
  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="row justify-content-end">
                <div className="col-md-4">
                  <input
                    type="seach"
                    className="form-control"
                    placeholder="search Feedback"
                  />
                </div>
              </div>
              <div className="dashboard card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">Feedback</h5>
                  <Link to="/feedback/add" className="btn btn-lg-primary">
                    Add Feedback
                  </Link>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive custom-table feedback-table">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Title</th>
                              <th scope="col">Description</th>
                              <th scope="col">Company</th>
                              <th scope="col">Product</th>
                              <th scope="col">Upvote</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p>Lorem ipsum dolor</p>
                              </td>
                              <td>
                                <p>Lorem ipsum dolor sit amet consectetur</p>
                              </td>
                              <td>
                                <p>Activision Bizard</p>
                              </td>
                              <td>
                                <p>Dail</p>
                              </td>
                              <td>
                                <p className="upvote">
                                  <img
                                    src={window.location.origin + "/img/up.png"}
                                    className="upvote-img"
                                    width="30px"
                                  />
                                  <span>5</span>
                                </p>
                              </td>
                              <td className="action-feedback">
                                <a className="d-block">
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  &nbsp; View User
                                </a>
                                <a
                                  className="d-block"
                                  data-toggle="modal"
                                  data-target="#source-control"
                                >
                                  <i
                                    className="fa fa-retweet"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  &nbsp; Source Control
                                </a>
                                <a
                                  href="javascript:void(0)"
                                  className="d-block"
                                  data-toggle="modal"
                                  data-target="#add-comment"
                                >
                                  <i
                                    className="fa fa-comments-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  &nbsp; Add Comment
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Feedbacks;
