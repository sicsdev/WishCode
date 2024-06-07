import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CountVoteModel = ({
  showModal,
  handleCloseModal,
  viewVoteCount,
  modalVotableId,
  modelVoteType,
  voteFilterVal,
  yesVoteCount,
  noVoteCount,
  optionalVoteCount,
  setVoteFilterVal,
}) => {
  const setVotCountFilter = (val) => {
    setVoteFilterVal(val);
    viewVoteCount(modalVotableId, modelVoteType, val);
  };
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        className="vote-count-modal"
      >
        <Modal.Header className="d-block">
          <Modal.Title className="vote-modal-title">
            <div className="row">
              <div className="col-md-3 "
              style={{width:"15%", maxWidth:"18%"}}
              >
                <h5 className="modal-title "> Vote Count</h5>
              </div>

              <div className="col-md-1"
              style={{width:"15%", maxWidth:"10%"}}
              
              >
                <div className="voting-option mb-2">
                  <label className="custom-radio">
                    All
                    <input
                      type="radio"
                      name="vote_count_type"
                      checked={voteFilterVal == "all"}
                      onChange={(e) => {
                        setVotCountFilter("all");
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="col-md-3"
             
              
              >
                <div className="voting-option mb-2">
                  <label className="custom-radio">
                    Company User
                    <input
                      type="radio"
                      name="vote_count_type"
                      checked={voteFilterVal == "company_user"}
                      onChange={(e) => {
                        setVotCountFilter("company_user");
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="voting-option mb-2">
                  <label className="custom-radio">
                    End User
                    <input
                      type="radio"
                      name="vote_count_type"
                      checked={voteFilterVal == "end_user"}
                      onChange={(e) => {
                        setVotCountFilter("end_user");
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="voting-option mb-2">
                  <label className="custom-radio">
                  Anonymous
                    <input
                      type="radio"
                      name="vote_count_type"
                      checked={''}
                      onChange={''}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="voting row">
              <div className="col-md-6">
                <span className="d-block py-3 no-of-vote-card "
                  style={{ height: "144px" }}
                >
                  <h4 className="mb-0">{yesVoteCount}</h4>
                  <span className="no-of-vote-text text-white"
                    style={{ position: "absolute", bottom: "17px" }}

                  >
                    Total Number of Vote For Yes
                  </span>
                </span>
              </div>
              <div className="col-md-6">
                <span className="d-block py-3 no-of-vote-card "
                  style={{ height: "144px" }}

                >
                  <h4 className="mb-0">{noVoteCount}</h4>
                  <span className="no-of-vote-text text-white"
                    style={{ position: "absolute", bottom: "17px" }}

                  >
                    Total Number of Vote For No
                  </span>
                </span>
              </div>
              <div className="col-md-6">
                <span className="d-block py-3 no-of-vote-card "
                  style={{ height: "144px" }}

                >
                  <h4 className="mb-0">{optionalVoteCount}</h4>
                  <span className="no-of-vote-text text-white"
                    style={{ position: "absolute", bottom: "17px" }}

                  >
                    Total Number of Vote For Optional
                  </span>
                </span>
              </div>
              <div className="col-md-6">
                <span className="d-block py-3 no-of-vote-card "
                  style={{ height: "144px" }}

                >
                  <h4 className="mb-0">0</h4>
                  <span className="no-of-vote-text text-white"
                    style={{ position: "absolute", bottom: "17px" }}
                  >
                    Total Number of Vote For Anonymous
                  </span>
                </span>
              </div>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default CountVoteModel;
