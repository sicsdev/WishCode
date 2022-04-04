import React from "react";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../base_url/config";
import Loader from "../../Component/Loader";

const AddCompany = () => {
  const [company_name, setCompanyName] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const [user_name, setUserName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [trial_period, setTrialPeriod] = useState("off");
  const [loader, setloader] = useState(false);

  const addcompanyhandler = async (e) => {
    e.preventDefault();
    setloader(true);
    const tokens = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens}`,
      },
    };

    try {
      const { data } = await axiosConfig.post(
        "/admin/company/create",
        {
          company_name,
          company_slug: companySlug,
          name: user_name,
          email: user_email,
          trial_period,
        },
        config
      );
      //console.log('data', data.token);
      setloader(false);
      setCompanyName("");
      setUserEmail("");
      setUserName("");
      setCompanySlug("");
      setTrialPeriod("off");
      toast.success("Company Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${
          error.response.data.message && error.response.data.message.email
            ? error.response.data.message.email[0]
            : error.response.data.message.company_slug
            ? error.response.data.message.company_slug[0]
            : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  const createCompanySlug = (val) => {
    // let Text = company_name;
    let slug = val.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setCompanySlug(slug);
  };
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
                  <h5 className="text-white text-uppercase">Company Account</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form onSubmit={addcompanyhandler}>
                        <div className="input-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Name"
                            name="company_name"
                            value={company_name}
                            required
                            onChange={(e) => setCompanyName(e.target.value)}
                            onBlur={(e) => createCompanySlug(e.target.value)}
                          />
                        </div>
                        <div className="input-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Slug"
                            name="company_name"
                            value={companySlug}
                            required
                            onChange={(e) => setCompanySlug(e.target.value)}
                            onBlur={(e) => createCompanySlug(e.target.value)}
                          />
                        </div>
                        <div className="input-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="User Name"
                            name="user_name"
                            value={user_name}
                            required
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                        <div className="input-form">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="User Email"
                            name="user_email"
                            value={user_email}
                            required
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                        </div>
                        <div className="switch-btn-wrapper">
                          <span className="mt-2 company-label">
                            Trial Period
                          </span>
                          <label className="switch">
                            <input
                              type="checkbox"
                              name="trial_period"
                              checked={trial_period == "on"}
                              value={trial_period}
                              onChange={(e) =>
                                setTrialPeriod(
                                  trial_period == "on" ? "off" : "on"
                                )
                              }
                            />
                            <span className="slider round"></span>
                          </label>

                          <div className="py-2 text-right">
                            <button
                              type="submit"
                              className="btn btn-lg-primary "
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {loader === true ? <Loader /> : <></>}

        <ToastContainer />
      </div>
    </>
  );
};

export default AddCompany;
