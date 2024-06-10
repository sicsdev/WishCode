import React from 'react'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { getRequestApi } from '../../helper/Helper';
import { useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import SearchFeature from './SearchFeature';
import Loader from 'react-spinners/SyncLoader';
import { ToastContainer } from 'react-toastify';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { useColor } from '../../commanapi/ColorProvider';
const SearchCompanyFeatureComp = () => {
  const { id } = useParams();
  const [totalCompanyFeatures, settotalCompanyFeatures] = useState([]);
  const [loader, setloader] = useState(false);
  const [loadPageData, setLoadPageData] = useState(false);
  const { isToggleOpen, toggleMenu } = useColor();

  useEffect(() => {
    getAllCompanyFeatures();
  }, []);

  const getAllCompanyFeatures = async () => {
    setloader(true);
    let response = await getRequestApi(`/dashboard/feature/company/${id}`);
    if (response) {
      settotalCompanyFeatures(response.data.data);
    }
    setloader(false);
  };

  const navigate = useNavigate();
  const onClickItem = (itemId) => {
    navigate(`/wish/${itemId}`);
  }

  return (
    <>
      <div className="main-body">
        <Sidebar isToggleOpen={isToggleOpen} toggleMenu={toggleMenu} />

        <div className="body-wrapper" id="body-content">
          <Header isToggleOpen={isToggleOpen} toggleMenu={toggleMenu} />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">Features of {totalCompanyFeatures[1]?.company_name}</h5>
                </div>
                <div className="card-body">

                  <div className="row">{
                    totalCompanyFeatures == "" ? <div className="col-md-12 text-center font-bold font-weight-bold">
                      {loader === true ? <Loader /> : "No Feature Found Company"}
                    </div> :
                      <>
                        <div className="dashboard card container">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="table-responsive custom-table approve-table">
                                  <table className="table table-hover">
                                    <thead>
                                      <tr>
                                        <th>Title</th>
                                        <th>Feedbacks</th>
                                        <th>Category Name</th>
                                        <th>Votes</th>
                                        <th>Created On</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {totalCompanyFeatures.length !== 0 ? (
                                        totalCompanyFeatures.map((feature, key) => (
                                          <tr key={key} style={{ cursor: "pointer" }} onClick={(e) => onClickItem(feature?.id)}>
                                            <td>{feature.title}</td>
                                            <td>{feature.product_name}</td>
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
                  }
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default SearchCompanyFeatureComp