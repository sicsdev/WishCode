import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SuggestFeatureModel from "./models/SuggestFeatureModel";
import Loader from "../Loader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import axiosConfig from "../../base_url/config";

const FeatureSearch = (props) => {
  const [showModel, setShowModel] = useState(false);
  const handleClose = () => setShowModel(false);
  const [loader, setLoader] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [featureWishes, setFeatureWishes] = useState([]);
  const userRole = localStorage.getItem("role");
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  useEffect(() => {
    getIpAddrees();
    setFeatureWishes(props.featureWishes); // Initialize featureWishes state
  }, [props.featureWishes]);

  const getIpAddrees = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIpAddress(res.data.IPv4);
  };

  const handleAnonymousVote = async (e, type, featureId) => {
    e.preventDefault();
    if (type == "anonymous") {
      type = "anonymous";
    } else {
      type = "";
    }
    try {
      const { data } = await axiosConfig.post(
        "/anonymous/vote/store",
        {
          voteable_id: featureId,
          type: type,
          ipAddress: ipAddress,
        },
        config
      );
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
      // Update featureWishes state with the new vote type
      setFeatureWishes(prevState =>
        prevState.map(feature =>
          feature.id === featureId ? { ...feature, type: type } : feature
        )
      );

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
    <div className="featured-search section-gap">
      <div className="container">
        <div className="input-group input-group-sm mb-3">
          <input
            type="search"
            className="form-control py-3"
            placeholder="Search.."
            value={props.searchValue}
            onChange={(e) => {
              props.setSearchValue(e.target.value);
              props.searchHandler(e.target.value);
            }}
          />
        </div>
        {props.isSearch ? (
          <div className="latest-wishes-table">
            <div className="dashboard card mt-5">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="text-uppercase">
                  Search Result For Feature Wishes
                </h5>
              </div>
              <div className="table-responsive custom-table approve-table">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Feature Wishes</th>
                      <th scope="col">Company</th>
                      <th scope="col">Category</th>
                      <th scope="col">Submitted By</th>
                      {userRole ? "" :
                        <> <th scope="col">Vote</th></>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {props.filterWishList.length > 0 ? (
                      props.filterWishList?.map((feature, key) => (
                        <tr key={key}>
                          <td>{feature.title}</td>
                          <td className="asd">
                            <Link to={`/?company=${feature.company_slug}`}>
                              {feature.company_name}
                            </Link>
                          </td>
                          <td>{feature.product_name}</td>
                          <td>{feature.user_name}</td>
                          {userRole ? "" :
                            <>
                              <td>
                                <label className="custom-radio">
                                  <i className="fa fa-thumbs-up"
                                    style={{ color: feature.type == "anonymous" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                                    aria-hidden="true">
                                  </i>
                                  <input
                                    type="radio"
                                    name={`vote_type_${feature?.id}`}
                                    checked={feature?.type === "anonymous"}
                                    value="anonymous"
                                    onChange={(e) => handleAnonymousVote(e, "anonymous", feature?.id)}
                                  />
                                </label>
                              </td>
                            </>
                          }
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>No Result Found...</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {props.showcaseSection ?
          <div className="latest-wishes-table show-case">
            <div className="dashboard card mt-5">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="text-white text-uppercase">
                  Showcase of Completed Items
                </h5>

              </div>
              <div className="table-responsive custom-table approve-table">
                <table className="table table-hover mb-2">
                  <thead>
                    <tr>
                      <th scope="col">Feature Wishes</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props?.showcaseSection?.length > 0 ? (
                      props.showcaseSection?.map((ShowCase, key) => (
                        <tr key={key}>
                          <td>{ShowCase.title}</td>
                          <td>{ShowCase.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        No Result Found...
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div> : ""}
        <div className="latest-wishes-table">
          <div className="dashboard card mt-5">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="text-uppercase">
                latest Feature Wishes
              </h5>
              <button
                type="button"
                className="btn btn-lg-primary"
                onClick={(e) => setShowModel(true)}
              >
                New Feature
              </button>
            </div>
            <div className="table-responsive custom-table approve-table">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">Feature Wishes</th>
                    <th scope="col">Company</th>
                    <th scope="col">Category</th>
                    <th scope="col">Submitted By</th>
                    {userRole ? "" :
                      <> <th scope="col">Vote</th></>
                    }
                  </tr>
                </thead>
                <tbody>
                  {featureWishes?.map((feature, key) => (
                    <tr key={key}>
                      <td>{feature.title}</td>
                      <td>
                        <Link to={`/${feature.company_slug}/showcase`}>
                          {feature.company_name}
                        </Link>
                      </td>
                      <td>{feature.product_name}</td>
                      <td>{feature.user_name}</td>
                      {userRole ? "" :
                        <>
                          <td>
                            <label className="custom-radio">
                              <i className="fa fa-thumbs-up"
                                style={{ color: feature.type == "anonymous" ? '#aa504f' : 'rgb(155, 155, 155)', fontSize: "36px" }}
                                aria-hidden="true">
                              </i>
                              <input
                                type="radio"
                                name={`vote_type_${feature?.id}`}
                                checked={feature?.type === "anonymous"}
                                value="anonymous"
                                onClick={(e) => handleAnonymousVote(e, feature?.type === "anonymous" ? "" : "anonymous", feature?.id)}
                              />
                            </label>
                          </td>
                        </>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SuggestFeatureModel
        show={showModel}
        setShow={setShowModel}
        close={handleClose}
        loader={loader}
        setLoader={setLoader}
        searchedCompanyName={props?.searchedCompanyName}
      />
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </div>
  );
};

export default FeatureSearch;
