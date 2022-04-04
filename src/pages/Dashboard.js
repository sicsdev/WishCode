import React from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import ChartCom from "../Component/charts/ChartCom";
import Loader from "../Component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { getRequestApi } from "../helper/Helper";
import CountDashboardCom from "../Component/admin/CountDashboardCom";
import moment from "moment";

const Dashboard = () => {
  const [loader, setloader] = useState(false);
  const [dashBoardData, setDashboardData] = useState([]);
  const [dashChartData, setDashChartData] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    setloader(true);
    let response = await getRequestApi("/dashboard-data");

    if (response) {
      setDashboardData(response.data.data);
      setloader(false);
      if (response.data.data && response.data.data.MonthlyVoteData) {
        VoteChartDataHandler(response.data.data.MonthlyVoteData);
      }
    } else {
      setloader(false);
    }
  };

  const VoteChartDataHandler = (data) => {
    let chartData = [];
    data.forEach((element) => {
      let payload = {
        x: moment(element.date).format("MM-DD-YYYY") + " GMT",
        y: element.total,
      };
      chartData.push(payload);
    });
    setDashChartData(chartData);
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
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-white text-uppercase">Dashboard</h5>
                </div>
                <div className="card-body">
                  <CountDashboardCom dashBoardData={dashBoardData} />

                  <div className="row mt-5">
                    <div className="col-lg-6">
                      {dashChartData.length !== 0 ? (
                        <ChartCom
                          data={dashChartData.length !== 0 && dashChartData}
                          type={`area`}
                          dataType={"datetime"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <div className="col-lg-6">
                      <ChartCom type={`line`} />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Dashboard;
