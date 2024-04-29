import React from "react";
import { useState, useEffect } from "react";
import UniversalModel from "../models/UniversalModel";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExtraFeatureButtonCom = ({
  featureData,
  loader,
  setloader,
  getFeatureData,
}) => {
  const [showPriorityModel, setShowPriorityModel] = useState(false);
  // const [showEstimateModel, setShowEstimateModel] = useState(false);
  const [rangeSliderValue, setRangeSliderValue] = useState({ values: [0] });
  const [rangeEstimateSliderValue, setRangeEstimateSliderValue] = useState({ values: [0] });
  const [modelType, setModelType] = useState("");
  const [developmentUrl, setDevelopmentUrl] = useState("");
  const userRole = localStorage.getItem("role");

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };


  useEffect(() => {
    if (
      featureData.internal_priority !== null &&
      featureData.internal_priority !== undefined
    ) {
      setRangeSliderValue({ values: [featureData.internal_priority] });
    } else {
      setRangeSliderValue({ values: [0] });
    }
    if (
      featureData?.estimate_level !== null &&
      featureData?.estimate_level !== undefined
    ) {

      setRangeEstimateSliderValue({ values: [featureData?.estimate_level] });
    } else {
      setRangeEstimateSliderValue({ values: [0] });
    }
    setDevelopmentUrl(featureData.development_url);
  }, [featureData]);

  const handlePriorityClose = () => {
    setShowPriorityModel(false)
  };
  const openPriorityModel = (e) => {
    setModelType("Priority");
    setShowPriorityModel(true);
  };
  //for estimate model
  const openEstimateModel = (e) => {
    setModelType("Estimate");
    setShowPriorityModel(true);
  };
  const SubmitPriorityModelHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = await axiosConfig.post(
        "/feature/update/internal_priority",
        {
          id: featureData.id,
          internal_priority: rangeSliderValue.values[0],
        },
        config
      );
      setShowPriorityModel(false);
      setloader(false);
      getFeatureData();
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${error.response.data.message &&
          error.response.data.message.internal_priority
          ? error.response.data.message.internal_priority[0]
          : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  const openDevURLModel = async (e) => {
    setModelType("devURL");
    setShowPriorityModel(true);
  };

  const SubmitDevelopmentModelHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = await axiosConfig.post(
        "/feature/update/development_url",
        {
          id: featureData.id,
          development_url: developmentUrl,
        },
        config
      );
      setShowPriorityModel(false);
      setloader(false);
      getFeatureData();
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${error.response.data.message &&
          error.response.data.message.development_url
          ? error.response.data.message.development_url[0]
          : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };
  const SubmitEstimateModelHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = await axiosConfig.post(
        "/feature/update/estimate_level",
        {
          id: featureData.id,
          estimate_level: rangeEstimateSliderValue.values[0],
        },
        config
      );
      setShowPriorityModel(false);
      setloader(false);

      getFeatureData();
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${error.response.data.message &&
          error.response.data.message.estimate_level
          ? error.response.data.message.estimate_level[0]
          : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  }
  const handleEstimateClose = () => {
    setShowPriorityModel(false)
  }
  return (
    <>
      <p>
        <b>Development URL: </b>
        <a
          className="text-dark"
          href={featureData.development_url}
          target="_blank"
        >
          {featureData.development_url}
        </a>
        <span className="btn pl-2" onClick={(e) => openDevURLModel()}>
          <i className="fa fa-edit"></i>
        </span>
      </p>
      <div className="feature-extra-btns">
        <button
          className="btn input-group-text vote"
          onClick={(e) => {
            openPriorityModel(e);
          }}
        >
          Internal Priority
        </button>
        {userRole == 3 ? <button
          className="btn input-group-text vote ml-2"
          onClick={(e) => {
            openEstimateModel(e);
          }}
        >
          Set Estimate
        </button> : ""}
      </div>
      {modelType === "Priority" ? (
        <UniversalModel
          showPriorityModel={showPriorityModel}
          setShowPriorityModel={setShowPriorityModel}
          handlePriorityClose={handleEstimateClose}
          modalHeading={"Update Internal Priority"}
          RangeSlider={true}
          RangeSliderLabel={"Internal Priority"}
          RangeSliderValue={rangeSliderValue}
          setRangeSliderValue={setRangeSliderValue}
          formSubmit={SubmitPriorityModelHandler}
        />
      ) : modelType === "Estimate" ? (
        <><UniversalModel
          showPriorityModel={showPriorityModel}
          setShowPriorityModel={setShowPriorityModel}
          modalHeading={"Update Estimate Level"}
          handlePriorityClose={handleEstimateClose}
          RangeSliderLabel={"Estimate Level"}
          RangeSlider={true}
          RangeSliderValue={rangeEstimateSliderValue}
          setRangeSliderValue={setRangeEstimateSliderValue}
          formSubmit={SubmitEstimateModelHandler}
          maxRangeLimit={5}
        /></>
      ) : (
        <UniversalModel
          showPriorityModel={showPriorityModel}
          setShowPriorityModel={setShowPriorityModel}
          handlePriorityClose={handlePriorityClose}
          modalHeading={"Update Development URL"}
          inputText={true}
          inputTextLable={"Development URL"}
          inputTextValue={developmentUrl}
          setInputTextValue={setDevelopmentUrl}
          formSubmit={SubmitDevelopmentModelHandler}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default ExtraFeatureButtonCom;
