import React from 'react'
import Sidebar from '../Component/Sidebar'
import Header from '../Component/Header'

const AssignFeatureComp = () => {
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
                                                <table className="table table-hover">
                                                    <tbody>
                                                        <div className='text-center'>No Assigned Feature found</div>
                                                    </tbody>
                                                </table>
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