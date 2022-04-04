import React from 'react';
import Sidebar from '../../Component/Sidebar';
import Header from '../../Component/Header';

const Role = () => {
    return (
        <>
            <div className="main-body">
                <Sidebar />
                <div className="body-wrapper" id="body-content">
                    <Header />
                    <section className="body-content-inner">
				<div className="container">
					<div className="dashboard card">
						<div className="card-header">
							<h5 className="text-white text-uppercase">Role</h5>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-12">
									<div className="input-form">
										<label>Role</label>
										<select name="role" id="role" className="form-control">
											<option value="1" selected>Select Role</option>
											<option value="1">Developer</option>
											<option value="2">Designer</option>
											<option value="3">Human Resource</option>
											<option value="4">Bussiness Developer</option>
										</select>
									</div>
								</div>
								<div className="col-md-12">
									<div className="input-form">
										<label>Which role Can access</label>
										<div className="acess-role-main">
											<div className="row">
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 1</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 2</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 3</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 4</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 5</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 6</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 7</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="role-btn">
														<div className="button-checkbox input-group-btn">
															<button type="button"
																className="btn btn-lg-primary-outline w-100"
																data-color="lg-primary">Access 8</button>
															<input type="checkbox" className="hidden" />
														</div>
													</div>
												</div>
											</div>
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
        </>
    )
}

export default Role;