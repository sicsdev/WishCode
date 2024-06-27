import React, { useEffect, useState } from 'react'
import Sidebar from '../Component/Sidebar'
import Header from '../Component/Header'
import axiosConfig from '../base_url/config';

const AssignFeatureComp = () => {
    const [assignFeature, setAssignFeature] = useState("");
    const tokens = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
        },
    };
    useEffect(() => {
        getAllAssignFeature();
    }, "")
    const getAllAssignFeature = async () => {
        axiosConfig.get("/get/assign/company_user/features", config)
            .then((response) => {
                // console.log(response?.data?.data, "response");
                setAssignFeature(response?.data?.data);
            })
    }
    const stripHtmlTags = (html) => {
        if (!html) return "";
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    };
    return (
        <div>
            <div className="main-body">
                <Sidebar >
                    <Header />
                    <section className="body-content-inner">
                        <div className="container">
                            <div className="dashboard card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="text-white text-uppercase">All Assigned Features</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive custom-table">
                                                {assignFeature && assignFeature.length > 0 ? (
                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="text-center">
                                                                    Feature Title
                                                                </th>
                                                                <th scope="col" className="text-center">
                                                                    Description
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {assignFeature.map((feature) => (

                                                                <tr key={feature?.id}>
                                                                    <td className="text-center">{feature?.post?.title}</td>
                                                                    <td className="text-center">{stripHtmlTags(feature?.post?.content)}</td>
                                                                </tr>

                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <div className='text-center'>No Assigned Feature found</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Sidebar>
            </div>
        </div>
    )
}

export default AssignFeatureComp