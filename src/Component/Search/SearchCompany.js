import React from "react";
import moment from "moment";
import { imageBaseUrl } from "../../base_url/config";
import { useNavigate } from "react-router-dom";
const SearchCompany = (props) => {
  const navigate = new useNavigate();
  const onClickCompany = (companyId) => {
    navigate(``);
  }
  return (
    <>
      <div className="dashboard card mt-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="text-white text-uppercase">Company List</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive custom-table approve-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Company Logo</th>
                      <th>Company Slug</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.companyList.length !== 0 ? (
                      props.companyList.map((company, key) => (
                        <tr key={key} style={{ cursor: "pointer" }} onClick={(e) => onClickCompany(company?.id)}>
                          <td>{company.company_name}</td>
                          <td>
                            <img
                              className="img-fluid rounded"
                              width={50}
                              height={50}
                              src={`${imageBaseUrl}/${company.company_logo}`}
                            />
                          </td>
                          <td>{company.company_slug}</td>
                          <td>{moment(company.created_at).format("LL")}</td>
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

export default SearchCompany;
