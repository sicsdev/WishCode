import React from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { Link } from "react-router-dom";

const AddFeedback = () => {
  return (
    <>
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <div className="card-header">
                  <h5 className="text-white text-uppercase">Feedback</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-form">
                        <label for="feedback">Feedback</label>
                        <textarea
                          name="feedback"
                          id=""
                          cols="15"
                          rows="5"
                          className="form-control"
                        ></textarea>

                        <div className="switch-btn-wrapper">
                          <p> Private or Public</p>
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>

                          <div className="py-2 text-right">
                            <button
                              type="button"
                              className="btn btn-lg-primary "
                            >
                              Send
                            </button>
                          </div>
                        </div>
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

export default AddFeedback;
