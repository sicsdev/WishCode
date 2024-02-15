import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Component/Loader";
import PieChartCom from "../Component/charts/PieChartCom";
import { useParams } from "react-router";
import { getRequestApi } from "../helper/Helper";

const FeatureChartReport = () => {
  const { id } = useParams();
  const [loader, setloader] = useState(false);
  const [publicVotes, setPublicVotes] = useState([]);
  const [privateVotes, setPrivateVotes] = useState([]);
  const [totalprivateVotes, setTotalprivateVotes] = useState("");
  const [totalPublicVotes, setTotalPublicVotes] = useState("");
  const [publicVoteLables, setPublicVoteLables] = useState([
    "YES",
    "NO",
    "OPTIONAL",
  ]);
  const [totalComments,setTotalComments]=useState('');
  const [ProductName,setProductName]=useState('');
  const [description,setDescription]=useState('');
  const [developmentUrl,setDevelopmentUrl]=useState('');
  useEffect(() => {
    getFeatureReportData();
  }, []);

  const getFeatureReportData = async () => {
    setloader(true);
    let response = await getRequestApi(`/feature/report-data/${id}`);

    if (response) {
      setloader(false);
      setTotalComments(response?.data?.data?.commentCount);
      setProductName(response?.data?.data?.ProductName);
      setDescription(response?.data?.data?.content?.content);
      setDevelopmentUrl(response?.data?.data?.content?.development_url)
      if (response.data.data && response.data.data.publicVotes) {
        setTotalPublicVotes(response.data.data.publicVotes.length);
        constPieChartDataHandler(response.data.data.publicVotes, "public");
      }
      if (response.data.data && response.data.data.privateVotes) {
        setTotalprivateVotes(response.data.data.privateVotes.length);
        constPieChartDataHandler(response.data.data.privateVotes, "private");
      }
    } else {
      setloader(false);
      toast.error("Unable to fetch feature Data!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const constPieChartDataHandler = (data, type) => {
    let filterYes = data.filter((x) => x.type.toLowerCase() == "yes");
    let filterNo = data.filter((x) => x.type.toLowerCase() == "no");
    let filterOptional = data.filter((x) => x.type.toLowerCase() == "optional");
    if (type === "public") {
      setPublicVotes([
        filterYes.length,
        filterNo.length,
        filterOptional.length,
      ]);
    }
    if (type === "private") {
      setPrivateVotes([
        filterYes.length,
        filterNo.length,
        filterOptional.length,
      ]);
    }
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
                  <h5 className="text-white text-uppercase">
                    View Feature Report
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      {publicVotes.length !== 0 ? (
                        <PieChartCom
                          votesData={publicVotes}
                          label={publicVoteLables}
                          title="Public Vote Chart"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
                      {privateVotes.length !== 0 ? (
                        <PieChartCom
                          votesData={privateVotes}
                          label={publicVoteLables}
                          title="Private Vote Chart"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12 mt-5">
                      <div className="card-counter primary" style={{height:"auto"}}>
                      <p className="bd-highlight text-uppercase">Description</p>
                        <p className="">
                        {description}
                        </p>
                        <p className="mt-2 mb-1">
                           Development Url : <a href={developmentUrl??"#"} target={developmentUrl?"_blank":"_self"}>{developmentUrl??"Not Available"}</a> 
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 mt-5">
                      <div className="card-counter primary">
                        <i className="fa fa-commenting"></i>
                        <span className="count-numbers">
                          {totalComments}
                        </span>
                        <span className="count-name">Total Comments</span>
                      </div>
                    </div>
                    <div className="col-md-6 mt-5">
                      <div className="card-counter primary">
                        <i className="fa fa-product-hunt"></i>
                        <span className="count-numbers">
                          {ProductName??0}
                        </span>
                        <span className="count-name">Product Name</span>
                      </div>
                    </div>
                    <div className="col-md-6 mt-5">
                      <div className="card-counter primary">
                        <i className="fa fa-building"></i>
                        <span className="count-numbers">
                          {totalPublicVotes}
                        </span>
                        <span className="count-name">Total Public Votes</span>
                      </div>
                    </div>
                    <div className="col-md-6 mt-5">
                      <div className="card-counter primary">
                        <i className="fa fa-building"></i>
                        <span className="count-numbers">
                          {totalprivateVotes}
                        </span>
                        <span className="count-name">Total Private Votes</span>
                      </div>
                    </div>
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

export default FeatureChartReport;
