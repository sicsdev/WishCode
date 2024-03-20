import React from 'react';
import Sidebar from '../../Component/Sidebar';
import Header from '../../Component/Header';
import { getRequestApi } from "../../helper/Helper";
import { useEffect } from 'react';
import { useState } from 'react';
import FeatureComp from '../../Component/FeatureComp';

const ShowCase = () => {
    const [showCase, setShowCase] = useState();

    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const getShowCaseCompany = async () => {
        let companySlug = "smartinfo-care-solution";
        let response = await getRequestApi(`${companySlug}/showcase`);
        setShowCase(response?.data?.data?.data);

    };

    useEffect(async () => {
        getShowCaseCompany();

    }, []);

    return (
        <>
            <div className="main-body">
                <Sidebar isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen}/>
                <div className="body-wrapper" id="body-content">
                    <Header />
                    {/* <section className="body-content-inner">
                        <div className="container">
                            <div className="row justify-content-end">
                            </div>
                            <div className="dashboard card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="text-white text-uppercase">Showcase of Completed Items</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive  show-case custom-table feedback-table">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Title</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {showCase?.map((features, index) => (
                                                            <tr>
                                                                <td scope="col">{features.title}</td>
                                                                <td scope="col">{features.status}</td>

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                    <section className="body-content-inner">
                        <div className="container">
                            <div className="dashboard card">
                                <div className='card-header d-flex justify-content-between align-items-center'>
                                <h5 className=" text-uppercase">Showcase of Completed Items</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {showCase !== undefined ? (
                                                showCase?.map((feature, key) => (
                                                    <div className="company-post-wrapper" key={key}>

                                                        <div className="comp-post">
                                                            <span className="text-lg-primary">
                                                            </span>
                                                            <div className="options">
                                                                <h2>{feature.title}</h2>
                                                            </div>
                                                            <p>{feature.content}</p>

                                                            <div className="actions-links position-relative py-2 pt-4 d-flex">
                                                                {feature?.company_id && feature?.company_name ? (
                                                                    <div
                                                                        className="text-secondary mr-3"

                                                                    >
                                                                        <span className="font-weight-bold custom-span">
                                                                            Company Name:
                                                                        </span>{" "}
                                                                        {feature?.company_name}{" "}
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {feature?.product_id ? (
                                                                    <div
                                                                        className="text-secondary"

                                                                    >
                                                                        <span className="font-weight-bold custom-span">
                                                                            Product Name:
                                                                        </span>{" "}
                                                                        {feature?.product_name}
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}


                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            ) : (
                                                <div className="company-post-wrapper">
                                                    <h3>No data Found</h3>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ShowCase