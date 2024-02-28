import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosConfig from "../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageBaseUrl } from "../base_url/config";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import swal from "sweetalert";
import { getRequestApi } from "../helper/Helper";
import ImageComponent from "../Component/ImageComponent";
import { isUserPermission } from "../helper/Helper";
import CountVoteModel from "../Component/models/CountVoteModel";
import Loader from "../Component/Loader";
import ExtraFeatureButtonCom from "../Component/features/ExtraFeatureButtonCom";
import axios from "axios";

const SingleFeature = () => {
  const { id } = useParams();
  const userRole = localStorage.getItem("role");
  const [loader, setloader] = useState(false);
  const [postFeedback, setPostFeedback] = useState("");
  const [featureData, setFeatureData] = useState([]);
  const [reply, setReply] = useState(false);
  const [show, setShow] = useState(false);
  const [toggleVal, setToggleVal] = useState("");
  const [commentId, setCommentId] = useState("");
  const [voteableType, setVoteableType] = useState("");
  const [current_user_id, setCurrent_userId] = useState("");
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setshowModal(false);
  const [showModal, setshowModal] = useState(false);
  const [yesVoteCount, setYesVoteCount] = useState("");
  const [noVoteCount, setNoVoteCount] = useState("");
  const [optionalVoteCount, setOptionalVoteCount] = useState("");
  const [privateComment, setPrivateComment] = useState("off");
  const [replyId, setReplyId] = useState(null);
  const [voteFilterVal, setVoteFilterVal] = useState("all");
  const [modalVotableId, setModalVotableId] = useState("");
  const [modelVoteType, setModelVoteType] = useState("");
  const [commentFile, setCommentFile] = useState({ preview: "", raw: "" });
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const closeReleaseModal = () => setShowReleaseModal(false);
  const [releaseToggleVal, setReleaseToggleVal] = useState("yes");
  const [showReleaseCountModal, setShowReleaseCountModal] = useState(false);
  const closeReleaseCountModal = () => setShowReleaseCountModal(false);
  const [yesReleaseVoteCount, setYesReleaseVoteCount] = useState("");
  const [noReleaseVoteCount, setNoReleaseVoteCount] = useState("");
  const [partialReleaseVoteCount, setPartialReleaseVoteCount] = useState("");
  const [releaseVoteFilterVal, setReleaseVoteFilterVal] = useState("all");
  const [userPermissions, setUserPermissions] = useState([]);
  const [ipAddress, setIpAddress] = useState("");
  const [totalVote, setTotalVote] = useState("");
  const [userVote, setUserVote] = useState("");

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    getFeatureData();
    getUserPermissions();
    getIpAddrees();
  }, []);

  useEffect(() => {
    if (current_user_id) {
      const findVal = featureData?.post_votes?.find((x) => x.user_id === current_user_id);
      if (findVal) {
        setUserVote(findVal.type);
      } else {
        setUserVote("");
      }
    }
  }, [current_user_id])

  const getFeatureData = () => {
    setloader(true);
    axiosConfig
      .get(`/post/${id}`, config)
      .then((response) => {
        setloader(false);
        setFeatureData(response?.data?.data);
        setCurrent_userId(response?.data?.current_id);
        setTotalVote(response?.data?.data?.post_votes?.length)
      })
      .catch((data) => {
        setloader(false);
        toast.success(data?.response?.data?.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };

  const getUserPermissions = async () => {
    let response = await getRequestApi(`/user-permissions`);
    if (response) {
      if (response && response.data.data) {
        setUserPermissions(response.data.data);
      }
    }
  };

  const getIpAddrees = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIpAddress(res.data.IPv4);
  };

  const addFeatureComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post_id", id);
    formData.append("comment", postFeedback);
    formData.append("comment_status", privateComment);
    formData.append("image", commentFile.raw);
    try {
      const { data } = await axiosConfig.post(
        "/comment/store",
        formData,
        config
      );
      getFeatureData();
      setPostFeedback("");
      setCommentFile({ preview: "", raw: "" });

      toast.success("Comment Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${error.response.data.message && error.response.data.message.comment
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

  const voteComment = (val, type) => {
    setShow(true);
    setCommentId(val.id);
    setVoteableType(type);
    if (type == "comment") {
      const findVal = val.votes.find((x) => x.user_id === current_user_id);
      if (findVal) {
        setToggleVal(findVal.type);
      } else {
        setToggleVal("yes");
      }
    } else {
      const findVal = val.post_votes.find((x) => x.user_id === current_user_id);
      if (findVal) {
        setToggleVal(findVal.type);
      } else {
        setToggleVal("yes");
      }
    }
  };

  const releaseVoteHandler = (val, type) => {
    setShowReleaseModal(true);
    setCommentId(val.id);
    setVoteableType(type);
    if (type == "comment") {
      const findVal = val.release_votes.find(
        (x) => x.user_id === current_user_id
      );
      if (findVal) {
        setReleaseToggleVal(findVal.type);
      } else {
        setReleaseToggleVal("yes");
      }
    } else {
      const findVal = val.post_votes.find((x) => x.user_id === current_user_id);
      if (findVal) {
        setReleaseToggleVal(findVal.type);
      } else {
        setReleaseToggleVal("yes");
      }
    }
  };

  const viewVoteCount = async (comment_id, vote_type, filter_type) => {
    setModalVotableId(comment_id);
    setModelVoteType(vote_type);
    let response = await getRequestApi(
      `/company/vote/vote-type-count/${vote_type}/${comment_id}/${filter_type}`
    );
    if (response) {
      setshowModal(true);
      setYesVoteCount(response.data.data.yes);
      setNoVoteCount(response.data.data.no);
      setOptionalVoteCount(response.data.data.optional);
      setVoteFilterVal(filter_type);
    }
  };

  const viewReleaseVoteCount = async (comment_id, vote_type, filter_type) => {
    setModalVotableId(comment_id);
    setModelVoteType(vote_type);
    let response = await getRequestApi(
      `/company/release-vote/vote-type-count/${vote_type}/${comment_id}/${filter_type}`
    );
    if (response) {
      setShowReleaseCountModal(true);
      setYesReleaseVoteCount(response.data.data.yes);
      setNoReleaseVoteCount(response.data.data.no);
      setPartialReleaseVoteCount(response.data.data.partial);
      setReleaseVoteFilterVal(filter_type);
    }
  };

  const handlereply = (e, id) => {
    e.preventDefault();
    setReply(true);
    setReplyId(id);
  };

  const replySubmitHandler = async (event, cmtid) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let formObject = Object.fromEntries(formData.entries());

    let commentReply = formObject.postreply;

    try {
      const { data } = await axiosConfig.post(
        "/comment/reply/store",
        {
          post_id: id,
          comment: commentReply,
          comment_id: cmtid,
        },
        config
      );
      getFeatureData();
      event.target.reset();
      toast.success("Reply Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${error.response.data.message && error.response.data.message.comment
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

  const setValRadio = (val) => {
    setToggleVal(val);
  };

  const setReleaseValRadio = (val) => {
    setReleaseToggleVal(val);
  };

  const addVotehandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosConfig.post(
        "/vote/store",
        {
          voteable_id: commentId,
          type: toggleVal,
          voteable_type: voteableType,
          ipAddress: ipAddress,
        },
        config
      );
      setShow(false);
      getFeatureData();
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${error.response.data.message && error.response.data.message.type
          ? error.response.data.message.type[0]
          : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };
  // add vote handler on change
  const addChangeVotehandler = async (e, type) => {
    e.preventDefault();
    try {
      const { data } = await axiosConfig.post(
        "/vote/store",
        {
          voteable_id: featureData?.id,
          type: type,
          voteable_type: "post",
          ipAddress: ipAddress,
        },
        config
      );
      setShow(false);
      setUserVote(type);
      getFeatureData();
      setTotalVote(featureData?.post_votes?.length)
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${error.response.data.message && error.response.data.message.type
          ? error.response.data.message.type[0]
          : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };
  const approveComment = (id, val) => {
    let apVal = "";
    if (val == "1") {
      apVal = "0";
    } else {
      apVal = "1";
    }
    swal({
      title: "Are you sure?",
      text: "You want to Approve/Disapprove this comment?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const { data } = await axiosConfig.post(
            `/company/comment/is_approved`,
            {
              id: id,
              comment_approved: apVal,
            },
            config
          );
          swal(
            "Updated!",
            "You Approved/Disapproved comment successfully!",
            "success"
          );
          getFeatureData();
        } catch (error) {
          swal("Error!", "Enable to update the comment status!", "error");
        }
      }
    });
  };

  const completeFeatureStatus = (id, val) => {
    let apVal = "";
    if (val == "completed") {
      apVal = "publish";
    } else {
      apVal = "completed";
    }
    swal({
      title: "Are you sure?",
      text: "You want to Complete this Feature?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const { data } = await axiosConfig.post(
            `/admin/post/change-status`,
            {
              post_id: id,
              status: apVal,
            },
            config
          );
          swal("Updated!", "You Completed a Feature successfully!", "success");
          getFeatureData();
        } catch (error) {
          swal(
            "Error!",
            "Enable to update the Feature status to Complete!",
            "error"
          );
        }
      }
    });
  };

  const completeComment = (id, val) => {
    let apVal = "";
    if (val == "1") {
      apVal = "0";
    } else {
      apVal = "1";
    }

    swal({
      title: "Are you sure?",
      text: "You want to Complete/Uncomplete this comment?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const { data } = await axiosConfig.post(
            `/company/comment/is_completed`,
            {
              id: id,
              is_complete: apVal,
            },
            config
          );
          swal(
            "Success!",
            "You Complete/Uncomplete this comment successfully!",
            "success"
          );
          getFeatureData();
        } catch (error) {
          swal("Error!", "Enable to update the comment status!", "error");
        }
      }
    });
  };

  const setVotCountFilter = (val) => {
    setVoteFilterVal(val);
    viewVoteCount(modalVotableId, modelVoteType, val);
  };

  const setReleaseVoteCountFilter = (val) => {
    setReleaseVoteFilterVal(val);
    viewReleaseVoteCount(modalVotableId, modelVoteType, val);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCommentFile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    } else {
      setCommentFile({
        preview: "",
        raw: "",
      });
    }
  };

  const deleteComment = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this Feedback?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        try {
          const { data } = await axiosConfig.delete(
            `/comment/delete/${id}`,
            config
          );
          swal(
            "Success!",
            "You Deleted this Feedback successfully!",
            "success"
          );
          getFeatureData();
        } catch (error) {
          swal("Error!", "Enable to Delete Feedback!", "error");
        }
      }
    });
  };

  const updateReleaseVoteHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosConfig.post(
        "/release-vote/store",
        {
          voteable_id: commentId,
          type: releaseToggleVal,
          voteable_type: voteableType,
          ipAddress: ipAddress,
        },
        config
      );
      setShowReleaseModal(false);
      getFeatureData();
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      return toast.error(
        `${error.response.data.message && error.response.data.message.type
          ? error.response.data.message.type[0]
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
      <div className="main-body">
        <Sidebar />
        <div className="body-wrapper" id="body-content">
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="posts-wrapper">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="post-main">
                      <div className="post-content pt-3">
                        <div className="row">
                          <div className="col-md-9">
                            {featureData?.company_id &&
                              featureData?.company_name ? (
                              <Link
                                className="text-secondary mr-3"
                                to={`/dashboard/company/${featureData.company_id}`}
                              >
                                <span className="font-weight-bold">
                                  Company Name:
                                </span>{" "}
                                {featureData?.company_name}{" "}
                              </Link>
                            ) : (
                              ""
                            )}
                            {featureData?.product_id ? (
                              <Link
                                className="text-secondary"
                                to={`/dashboard/product/${featureData.product_id}`}
                              >
                                <span className="font-weight-bold">
                                  Product Name:
                                </span>{" "}
                                {featureData?.product_name}
                              </Link>
                            ) : (
                              ""
                            )}
                            <h4>{featureData.title}</h4>
                            <p>{featureData.content}</p>
                            <a href={`${imageBaseUrl}/${featureData?.image}`} target="_blank">
                              <div className="user-img">
                                {featureData.image ? (
                                  <img
                                    src={`${imageBaseUrl}/${featureData.image}`}
                                    alt=""
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </a>
                            {userRole != 4 ? (
                              <>
                                <ExtraFeatureButtonCom
                                  featureData={featureData}
                                  loader={loader}
                                  setloader={setloader}
                                  getFeatureData={getFeatureData}
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-3">
                            <div className="no-of-vote custom-grid">
                              {userRole == 2 || userRole == 1 ?(
                                <>
                                  <a className="text-secondary d-block mb-2">
                                <img
                                  src={window.location.origin + "/img/up.png"}
                                  width="20"
                                  className="img-fluid"
                                />
                                {featureData && featureData.post_votes
                                  ? featureData.post_votes.length
                                  : ""}
                              </a>
                                 </>
                              ):""}
                            
                              {userRole == 3 || userRole == 4 ? (
                                <>
                                 <div className="d-flex font-weight-bold">
                                <span className="text-secondary d-block mb-2">

                                  <span>Total Vote : </span>

                                  {totalVote}
                                </span>
                              </div>
                                  {/* <button
                                    className="input-group-text vote"
                                    onClick={(e) => {
                                      voteComment(featureData, "post");
                                    }}
                                  > */}
                                  <i
                                    className="fa mr-1"
                                    aria-hidden="true"
                                  ></i>
                                  {/* {featureData &&
                                    featureData.post_votes &&
                                    featureData.post_votes.find(
                                      (x) => x.user_id == current_user_id
                                    ) != undefined
                                    ? "Total Vote"
                                    : "Total Vote"} */}
                                  {/* </button> */}
                                  {/* <div> */}
                                  <div className="voting-row">
                                    <p>Your Vote:</p>
                                    <div className="voting row">
                                      <div className="col-md-4">
                                        <div className="voting-option mb-2">
                                          <label className="custom-radio">
                                            <i className="fa fa-thumbs-up"
                                              style={{ color: userVote == "yes" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                                              aria-hidden="true"></i>
                                            <input
                                              type="radio"
                                              checked="checked"
                                              name="vote_type"
                                              checked={userVote === "yes"}
                                              value={userVote}
                                              onChange={(e) => {
                                                addChangeVotehandler(e, "yes")
                                                // setValRadio("yes");
                                              }}
                                            />
                                            {/* <span className="checkmark bg-white">
                      </span> */}
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="voting-option mb-2">
                                          <label className="custom-radio">
                                            <i className="fa fa-thumbs-down"
                                              style={{ color: userVote == "no" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                                              aria-hidden="true"></i>
                                            <input
                                              type="radio"
                                              name="vote_type"
                                              value={userVote}
                                              checked={userVote === "no"}
                                              onChange={(e) => {
                                                addChangeVotehandler(e, "no");
                                                // setValRadio("no");
                                              }}
                                            />
                                            {/* <span className="checkmark bg-white"></span> */}
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="voting-option mb-2">
                                          <label className="custom-radio">
                                            <i className="fa fa-question"
                                              style={{ color: userVote == "optional" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                                              aria-hidden="true"></i>
                                            <input
                                              type="radio"
                                              name="vote_type"
                                              value={userVote}
                                              checked={userVote === "optional"}
                                              onChange={(e) => {
                                                addChangeVotehandler(e, "optional")
                                                // setValRadio("optional");
                                              }}
                                            />
                                            {/* <span className="checkmark bg-white"></span> */}
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                </>
                              ) : (
                                ""
                              )}
                              { (featureData.user_id == current_user_id && userRole == 2 ) || 
                               (featureData.user_id == current_user_id && userRole == 3 )||
                                current_user_id == 1 || userRole == 2?(
                                <>
                                  <button
                                    className="btn input-group-text vote"
                                    onClick={(e) => {
                                      viewVoteCount(
                                        featureData.id,
                                        "post",
                                        "all"
                                      );
                                    }}
                                  >
                                    View Count
                                  </button>
                                  <div className="switch-btn-wrapper mt-3">
                                    <span className="mt-2 company-label">
                                      Complete
                                    </span>
                                    <label className="switch">
                                      <input
                                        type="checkbox"
                                        name="completeFeature"
                                        checked={
                                          featureData.status == "completed"
                                        }
                                        onChange={(e) => {
                                          completeFeatureStatus(
                                            featureData.id,
                                            featureData.status
                                          );
                                        }}
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {featureData.comments !== undefined ? (
                        <>
                          {featureData.comments.map((feedback, index) => (
                            <div key={index}>
                              <div className="post-comments pt-3">
                                <div className="row">
                                  <div className="col-md-2">
                                    <span className="d-block user-img text-center m-auto">
                                      {feedback.user &&
                                        feedback.user.profile_pic &&
                                        feedback.user.role_id == "3" ? (
                                        <>
                                          <img
                                            src={`${imageBaseUrl}/${feedback.user.profile_pic}`}
                                            alt=""
                                          />
                                          <div className="font-lg-14 pt-2 mb-0">
                                            <p className="badge badge-pill badge-secondary">
                                              Company User
                                            </p>
                                          </div>
                                        </>
                                      ) : (
                                        <img
                                          src={`${imageBaseUrl}/${feedback.user.profile_pic}`}
                                          alt=""
                                        />
                                      )}

                                      <div className="font-lg-14">
                                        <p className="pt-2 mb-0">
                                          {feedback.user && feedback.user.name
                                            ? feedback.user.name
                                            : ""}
                                        </p>
                                      </div>
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
                                      {feedback.comment_image &&
                                        feedback.comment_image != null ? (
                                        <div className="user-img">
                                          <ImageComponent
                                            imageUrl={feedback.comment_image}
                                          />
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <div className="post-date position-relative py-2">
                                        <strong className="text-secondary">
                                          <i
                                            className="fa fa-clock-o"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {moment(
                                            feedback.created_at
                                          ).fromNow()}
                                        </strong>

                                        {userRole == 3 || userRole == 4 ? (
                                          <>
                                            <a
                                              className="text-secondary reply-icon"
                                              onClick={(e) =>
                                                handlereply(e, feedback.id)
                                              }
                                            >
                                              <strong className="pl-2">
                                                <i
                                                  className="fa fa-reply"
                                                  aria-hidden="true"
                                                ></i>
                                                Reply
                                              </strong>
                                            </a>
                                            {feedback.is_completed == "1" ? (
                                              <a
                                                className="text-secondary vote"
                                                onClick={(e) => {
                                                  releaseVoteHandler(
                                                    feedback,
                                                    "comment"
                                                  );
                                                }}
                                              >
                                                {feedback.release_votes.find(
                                                  (x) =>
                                                    x.user_id == current_user_id
                                                ) != undefined
                                                  ? "Update Release Vote"
                                                  : "Release Vote"}
                                              </a>
                                            ) : (
                                              <a
                                                className="text-secondary vote"
                                                onClick={(e) => {
                                                  voteComment(
                                                    feedback,
                                                    "comment"
                                                  );
                                                }}
                                              >
                                                {feedback.votes.find(
                                                  (x) =>
                                                    x.user_id == current_user_id
                                                ) != undefined
                                                  ? "Update Vote"
                                                  : "Add Vote"}
                                              </a>
                                            )}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {feedback.user_id == current_user_id ? (
                                          <a
                                            className="text-secondary reply-icon"
                                            onClick={(e) => {
                                              deleteComment(feedback.id);
                                            }}
                                          >
                                            <strong className="pl-2">
                                              <i
                                                className="fa fa-trash"
                                                aria-hidden="true"
                                              ></i>
                                              Delete
                                            </strong>
                                          </a>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div
                                        className="input-group mb-3 reply-comment"
                                        id={feedback.id}
                                        style={
                                          feedback.id == replyId
                                            ? { display: "block" }
                                            : { display: "none" }
                                        }
                                      >
                                        <form
                                          onSubmit={(e) =>
                                            replySubmitHandler(e, feedback.id)
                                          }
                                        >
                                          <input
                                            key={index}
                                            type="text"
                                            className="form-control"
                                            placeholder="Reply"
                                            autoComplete="off"
                                            id={feedback.id}
                                            required
                                            name="postreply"
                                          />
                                          <label htmlFor="upload-button-1">
                                            <span className="fa-stack fa-2x mt-3 mb-2">
                                              <i
                                                className="fa fa-upload image-icon-upload"
                                                aria-hidden="true"
                                              ></i>
                                            </span>
                                          </label>
                                          <input
                                            type="file"
                                            id="upload-button-1"
                                            style={{ display: "none" }}
                                          />
                                          <div className="input-group-append">
                                            <button
                                              type="submit"
                                              className="input-group-text"
                                            >
                                              Reply
                                            </button>
                                          </div>
                                        </form>
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
                                        <img
                                          src={
                                            window.location.origin +
                                            "/img/up.png"
                                          }
                                          width="20"
                                          className="img-fluid"
                                        />
                                        {feedback.is_completed === "1"
                                          ? feedback.release_votes.length
                                          : feedback.votes.length}
                                      </a>
                                      {feedback.comment_approved == "1" &&
                                        (userRole == 3 || userRole == 4) ? (
                                        <img
                                          src={
                                            window.location.origin +
                                            "/img/approved.png"
                                          }
                                          className="img-fluid d-block"
                                          alt=""
                                          width="90px"
                                        />
                                      ) : (
                                        ""
                                      )}

                                      {feedback.is_completed == "1" &&
                                        (userRole == 3 || userRole == 4) ? (
                                        <div className="font-lg-14 pt-2 mb-0">
                                          <p className="badge badge-pill badge-secondary released-msg">
                                            Released
                                          </p>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {featureData.user_id == current_user_id ||
                                        current_user_id == 1 ||
                                        isUserPermission(
                                          userPermissions,
                                          "vote-count"
                                        ) == true ? (
                                        <>
                                          {feedback.is_completed === "1" ? (
                                            <a
                                              className="text-secondary view-count pt-3"
                                              onClick={(e) => {
                                                viewReleaseVoteCount(
                                                  feedback.id,
                                                  "comment",
                                                  "all"
                                                );
                                              }}
                                            >
                                              View Release Count
                                            </a>
                                          ) : (
                                            <a
                                              className="text-secondary view-count pt-3"
                                              onClick={(e) => {
                                                viewVoteCount(
                                                  feedback.id,
                                                  "comment",
                                                  "all"
                                                );
                                              }}
                                            >
                                              View Count
                                            </a>
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}

                                      {featureData.user_id == current_user_id ||
                                        current_user_id == 1 ||
                                        isUserPermission(
                                          userPermissions,
                                          "approve-feedback"
                                        ) == true ? (
                                        <>
                                          {/* <div className="switch-btn-wrapper">
                                            <span className="mt-2 company-label">
                                              Approve
                                            </span>
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                name="trial_period"
                                                checked={
                                                  feedback.comment_approved ==
                                                  "1"
                                                }
                                                onChange={(e) => {
                                                  approveComment(
                                                    feedback.id,
                                                    feedback.comment_approved
                                                  );
                                                }}
                                              />
                                              <span className="slider round"></span>
                                            </label>
                                          </div> */}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {featureData.user_id == current_user_id ||
                                        current_user_id == 1 ||
                                        isUserPermission(
                                          userPermissions,
                                          "complete-feedback"
                                        ) == true ? (
                                        <>
                                          {/* <div className="switch-btn-wrapper">
                                            <span className="mt-2 company-label">
                                              Completed
                                            </span>
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                name="mark_as_completed"
                                                checked={
                                                  feedback.is_completed == "1"
                                                }
                                                onChange={(e) => {
                                                  completeComment(
                                                    feedback.id,
                                                    feedback.is_completed
                                                  );
                                                }}
                                              />
                                              <span className="slider round"></span>
                                            </label>
                                          </div> */}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {feedback.replies.map((reply, key) => (
                                <div
                                  className="post-comments post-comments-reply pt-3"
                                  key={key}
                                >
                                  <div className="row">
                                    <div className="col-md-2">
                                      <span className="d-block user-img text-center m-auto">
                                        {reply.user &&
                                          reply.user.profile_pic ? (
                                          <img
                                            src={`${imageBaseUrl}/${reply.user.profile_pic}`}
                                            alt=""
                                          />
                                        ) : (
                                          ""
                                        )}
                                        <div className="font-lg-14">
                                          <p className="pt-2 mb-0">
                                            {reply.user && reply.user.name
                                              ? reply.user.name
                                              : ""}
                                          </p>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-md-8">
                                      <span className="d-block">
                                        <div className="selected-reply">
                                          <h5>
                                            {feedback.user && feedback.user.name
                                              ? feedback.user.name
                                              : ""}
                                          </h5>
                                          <p className="mb-0">
                                            {feedback.comment}
                                          </p>
                                        </div>
                                        <div className="reply-to-selected">
                                          <h5>
                                            {reply.user && reply.user.name
                                              ? reply.user.name
                                              : ""}
                                          </h5>
                                          <p className="mb-0">
                                            {reply.comment}
                                          </p>
                                          <div className="post-date position-relative py-2">
                                            <strong className="text-secondary">
                                              <i
                                                className="fa fa-clock-o"
                                                aria-hidden="true"
                                              ></i>
                                              {moment(
                                                reply.created_at
                                              ).fromNow()}
                                            </strong>
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="no-of-vote"></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </>
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
                            <div className="post-comment-area">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Add a comment"
                                id="comment-feedback"
                                value={postFeedback}
                                required
                                autoComplete="off"
                                onChange={(e) =>
                                  setPostFeedback(e.target.value)
                                }
                              />
                              {userRole == 3 ? (
                                <div className="switch-btn-wrapper">
                                  <span className="mt-2 company-label">
                                    Private
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      name="private_comment"
                                      value={privateComment}
                                      checked={privateComment == "on"}
                                      onChange={(e) =>
                                        setPrivateComment(
                                          privateComment == "on" ? "off" : "on"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                              ) : (
                                ""
                              )}
                              <label htmlFor="upload-button">
                                <span className="fa-stack fa-2x mt-3 mb-2">
                                  <i
                                    className="fa fa-upload image-icon-upload"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </label>
                              <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                              />

                              <div className="input-group-append">
                                <button
                                  type="submit"
                                  className="input-group-text"
                                >
                                  Add Feedback
                                </button>
                              </div>
                            </div>
                            <div className="preview-image">
                              {commentFile.preview ? (
                                <img
                                  src={commentFile.preview}
                                  alt="dummy"
                                  width="100"
                                  height="100"
                                />
                              ) : (
                                ""
                              )}
                              <img src="" />
                            </div>
                          </form>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Add Vote</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            addVotehandler(e);
          }}
        >
          <Modal.Body>
            <>
              <div className="voting row">
                <div className="col-md-4">
                  <div className="voting-option mb-2">
                    <label className="custom-radio">
                      <i className="fa fa-thumbs-up"
                        style={{ color: toggleVal == "yes" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                        aria-hidden="true"></i>
                      <input
                        type="radio"
                        checked="checked"
                        name="vote_type"
                        checked={toggleVal == "yes"}
                        value={toggleVal}
                        onChange={(e) => {
                          setValRadio("yes");
                        }}
                      />
                      {/* <span className="checkmark bg-white">
                      </span> */}
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="voting-option mb-2">
                    <label className="custom-radio">
                      <i className="fa fa-thumbs-down"
                        style={{ color: toggleVal == "no" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                        aria-hidden="true"></i>
                      <input
                        type="radio"
                        name="vote_type"
                        value={toggleVal}
                        checked={toggleVal == "no"}
                        onChange={(e) => {
                          setValRadio("no");
                        }}
                      />
                      {/* <span className="checkmark bg-white"></span> */}
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="voting-option mb-2">
                    <label className="custom-radio">
                      <i className="fa fa-question"
                        style={{ color: toggleVal == "optional" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                        aria-hidden="true"></i>
                      <input
                        type="radio"
                        name="vote_type"
                        value={toggleVal}
                        checked={toggleVal == "optional"}
                        onChange={(e) => {
                          setValRadio("optional");
                        }}
                      />
                      {/* <span className="checkmark bg-white"></span> */}
                    </label>
                  </div>
                </div>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-lg-primary">
              Submit
            </button>
            <Button
              variant="secondary"
              className="btn btn-lg-primary"
              onClick={(e) => {
                setShow(false);
              }}
            >
              Close Modal
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <CountVoteModel
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        viewVoteCount={viewVoteCount}
        modalVotableId={modalVotableId}
        modelVoteType={modelVoteType}
        voteFilterVal={voteFilterVal}
        yesVoteCount={yesVoteCount}
        noVoteCount={noVoteCount}
        optionalVoteCount={optionalVoteCount}
        setVoteFilterVal={setVoteFilterVal}
      />

      <Modal show={showReleaseModal} onHide={closeReleaseModal}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Release Vote</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            updateReleaseVoteHandler(e);
          }}
        >
          <Modal.Body>
            <>
              <div className="voting row">
                <div className="col-md-4">
                  <div className="voting-option mb-2">
                    <label className="custom-radio">
                      Yes
                      <input
                        type="radio"
                        checked="checked"
                        name="vote_type"
                        checked={releaseToggleVal == "yes"}
                        value={releaseToggleVal}
                        onChange={(e) => {
                          setReleaseValRadio("yes");
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="voting-option mb-2">
                    <label className="custom-radio">
                      No
                      <input
                        type="radio"
                        name="vote_type"
                        value={releaseToggleVal}
                        checked={releaseToggleVal == "no"}
                        onChange={(e) => {
                          setReleaseValRadio("no");
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="voting-option mb-2">
                    <label className="custom-radio">
                      Partial
                      <input
                        type="radio"
                        name="vote_type"
                        value={releaseToggleVal}
                        checked={releaseToggleVal == "partial"}
                        onChange={(e) => {
                          setReleaseValRadio("partial");
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-lg-primary">
              Submit
            </button>
            <Button
              variant="secondary"
              className="btn btn-lg-primary"
              onClick={(e) => {
                setShowReleaseModal(false);
              }}
            >
              Close Modal
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={showReleaseCountModal}
        onHide={closeReleaseCountModal}
        size="lg"
        className="vote-count-modal"
      >
        <Modal.Header className="d-block">
          <Modal.Title className="vote-modal-title">
            <div className="row">
              <div className="col-md-4">
                <h5 className="modal-title mr-3">Release Vote Count</h5>
              </div>

              <div className="col-md-2">
                <div className="voting-option mb-2">
                  <label className="custom-radio">
                    All
                    <input
                      type="radio"
                      name="vote_count_type"
                      checked={releaseVoteFilterVal == "all"}
                      onChange={(e) => {
                        setReleaseVoteCountFilter("all");
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="voting-option mb-2">
                  <label className="custom-radio">
                    Company User
                    <input
                      type="radio"
                      name="vote_count_type"
                      checked={releaseVoteFilterVal == "company_user"}
                      onChange={(e) => {
                        setReleaseVoteCountFilter("company_user");
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
                      checked={releaseVoteFilterVal == "end_user"}
                      onChange={(e) => {
                        setReleaseVoteCountFilter("end_user");
                      }}
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
                <span className="d-block py-3 no-of-vote-card ">
                  <h4 className="mb-0">{yesReleaseVoteCount}</h4>
                  <span className="no-of-vote-text text-white">
                    Total Number of Vote For Yes
                  </span>
                </span>
              </div>
              <div className="col-md-6">
                <span className="d-block py-3 no-of-vote-card ">
                  <h4 className="mb-0">{noReleaseVoteCount}</h4>
                  <span className="no-of-vote-text text-white">
                    Total Number of Vote For No
                  </span>
                </span>
              </div>
              <div className="col-md-6">
                <span className="d-block py-3 no-of-vote-card ">
                  <h4 className="mb-0">{partialReleaseVoteCount}</h4>
                  <span className="no-of-vote-text text-white">
                    Total Number of Vote For Partial
                  </span>
                </span>
              </div>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default SingleFeature;
