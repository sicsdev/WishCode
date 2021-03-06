import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuggestFeatureModel from "./models/SuggestFeatureModel";
import Loader from "../Loader";
import { ToastContainer } from "react-toastify";

const FeatureSearch = (props) => {
  const [showModel, setShowModel] = useState(false);
  const handleClose = () => setShowModel(false);
  const [loader, setLoader] = useState(false);

  return (
    <div className="featured-search section-gap">
      <div className="container">
        <div className="input-group input-group-sm mb-3">
          <input
            type="search"
            className="form-control py-3"
            placeholder="Seach.."
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
                <h5 className="text-white text-uppercase">
                  Search Result For Feature Wishes
                </h5>
              </div>
              <div className="table-responsive custom-table approve-table">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Feature Wishes</th>
                      <th scope="col">Company</th>
                      <th scope="col">Product</th>
                      <th scope="col">Submitted By</th>
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

        <div className="latest-wishes-table">
          <div className="dashboard card mt-5">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="text-white text-uppercase">
                latest Feature Wishes
              </h5>
              <button
                type="button"
                className="btn btn-lg-primary text-white"
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
                    <th scope="col">Product</th>
                    <th scope="col">Submitted By</th>
                  </tr>
                </thead>
                <tbody>
                  {props.featureWishes?.map((feature, key) => (
                    <tr key={key}>
                      <td>{feature.title}</td>
                      <td>
                        <Link to={`/?company=${feature.company_slug}`}>
                          {feature.company_name}
                        </Link>
                      </td>
                      <td>{feature.product_name}</td>
                      <td>{feature.user_name}</td>
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
