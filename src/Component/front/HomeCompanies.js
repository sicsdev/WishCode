import React from "react";
import { imageBaseUrl } from "../../base_url/config";
import { Link } from "react-router-dom";

const HomeCompanies = (props) => {
  return (
    <section className="companies_wrapper section-gap">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h3>COMPANIES</h3>
            </div>

            <div className="company_list_wrapper ">
              <div className="row">
                {props.companyList?.map((company, key) => (
                  <div className="col-md-3" key={key}>
                    <Link to={`/?company=${company.company_slug}`}>
                      <div className="card-wrapper">
                        <img
                          className="card-img-top pt-2"
                          src={`${imageBaseUrl}/${company.company_logo}`}
                          alt="Card cap"
                        />
                        <div className="card-body-content">
                          <h5>{company.company_name}</h5>
                          {/* <p>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCompanies;
