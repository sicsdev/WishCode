import React from "react";
import moment from "moment";

const SearchFeature = (props) => {
  return (
    <>
      <div className="dashboard card mt-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">Search Features</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive custom-table approve-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Feedbacks</th>
                      <th>Votes</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.featureList.length !== 0 ? (
                      props.featureList.map((feature, key) => (
                        <tr key={key}>
                          <td>{feature.title}</td>
                          <td>{feature.comments_count}</td>
                          <td>{feature.post_votes_count}</td>
                          <td>{moment(feature.created_at).format("LL")}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>No Data Found!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFeature;
