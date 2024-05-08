import React from "react";
import { imageBaseUrl } from "../base_url/config";
import moment from "moment";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosConfig from "../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stripHtml } from "../helper/Helper";

const SingleFeatureComp = ({ featureData }) => {
  const { id } = useParams();
  const [postFeedback, setPostFeedback] = useState("");

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  const addFeatureComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosConfig.post(
        "/comment/store",
        {
          post_id: id,
          comment: postFeedback,
        },
        config
      );
      //getFeatureData();
      setPostFeedback("");
      toast.success("Comment Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${
          error.response.data.message && error.response.data.message.comment
            ? error.response.data.message.comment[0]
            : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <>
      <div className="posts-wrapper">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="post-main">
              <div className="post-content pt-3">
                <h4>{featureData.title}</h4>
                <p>{stripHtml(featureData.content)}</p>
              </div>
              {featureData.comments !== undefined ? (
                <div>
                  {featureData.comments.map((feedback, index) => (
                    <div className="post-comments pt-3" key={index}>
                      <div className="row">
                        <div className="col-md-2">
                          <span className="d-block user-img text-center m-auto">
                            {feedback.user && feedback.user.profile_pic ? (
                              <img
                                src={`${imageBaseUrl}/${feedback.user.profile_pic}`}
                                alt=""
                              />
                            ) : (
                              ""
                            )}

                            <div className="font-lg-14"></div>
                          </span>
                        </div>
                        <div className="col-md-8">
                          <span className="d-block">
                            <h5>
                              {feedback.user && feedback.user.name
                                ? feedback.user.name
                                : ""}
                            </h5>
                            <p className="mb-0">{feedback.comment}</p>
                            <div className="post-date position-relative py-2">
                              <strong className="text-secondary">
                                <i
                                  className="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                {moment(feedback.created_at).fromNow()}
                              </strong>
                              <a className="text-secondary">
                                <strong className="pl-2">
                                  <i
                                    className="fa fa-reply"
                                    aria-hidden="true"
                                  ></i>
                                  Reply
                                </strong>
                              </a>
                              <a
                                className="text-secondary vote"
                                data-toggle="modal"
                                data-target="#vote-post"
                              >
                                Add Vote
                              </a>
                            </div>
                          </span>
                        </div>
                        <div className="col-md-2">
                          <div className="no-of-vote">
                            <a
                              className="text-secondary d-block"
                              data-toggle="modal"
                              data-target="#view-vote-post"
                            >
                              {" "}
                              <img
                                src={window.location.origin + "/img/up.png"}
                                width="20"
                                className="img-fluid"
                              />{" "}
                              5
                            </a>
                            <a
                              className="text-secondary view-count pt-3"
                              data-toggle="modal"
                              data-target="#view-count"
                            >
                              View Count
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>loading......</p>
                </div>
              )}

              <div className="add-comment pt-3" id="add-comment">
                <div className="input-group mb-3">
                  <form
                    className="post-comment-form"
                    onSubmit={(e) => {
                      addFeatureComment(e);
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add a comment"
                      id="comment-feedback"
                      value={postFeedback}
                      required
                      autoComplete="off"
                      onChange={(e) => setPostFeedback(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button type="submit" className="input-group-text">
                        Add Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleFeatureComp;
