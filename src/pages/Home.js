import React, { useState, useEffect } from "react";
import FrontHeader from "../Component/front/front-header";
import FrontFooter from "./frontFooter";
import FrontPageBanner from "../Component/front/FrontPageBanner";
import HomeCompanies from "../Component/front/HomeCompanies";
import HomeFeatures from "../Component/front/HomeFeatures";
import HomeBottom from "../Component/front/HomeBottom";
import FeatureSearch from "../Component/front/FeatureSearch";
import { getRequestApi } from "../helper/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Component/Loader";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [loader, setloader] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [featuresWishes, setFeaturesWishes] = useState([]);
  const [filterWishList, setFilterWishList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isCompanyFilter, setIsCompanyFilter] = useState(false);
  const [showcaseSection, setShowCaseSection] = useState(false)
  const [ipAddress, setIpAddress] = useState("");
  const [searchParams] = useSearchParams();
  let companyName = searchParams.get("company");
  let postStatus = searchParams.get("status");

  const [searchedCompanyName, setSearchedCompanyName] = useState("");

  useEffect(() => {
    getHomePageData(companyName);
  }, [companyName]);

  const getHomePageData = async (companyName) => {
    let webApiUrl;
    if (companyName !== null) {
      setIsCompanyFilter(true);
      webApiUrl = `/front/dashboard?company_name=${companyName}&status=${postStatus}`;
    } else {
      setIsCompanyFilter(false);
      const res = await axios.get("https://geolocation-db.com/json/");
      webApiUrl = `/front/dashboard?ipAddress=${res?.data?.IPv4}`;
    }
    let response = await getRequestApi(webApiUrl);
    if (response) {
      if (response?.data?.data) {
        setFeatureList(response.data.data.posts);
        setCompanyList(response.data.data.companies);
        setFeaturesWishes(response.data.data.featureWishList);
        if (response?.data?.data?.companyName) {
          setSearchedCompanyName(response.data.data.companyName);
          setShowCaseSection(response.data.data.showCaseData)
        } else {
          setSearchedCompanyName("");
        }
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      setloader(false);
    }
  };

  const getFeaturesWishes = async (keyword) => {
    const res = await axios.get("https://geolocation-db.com/json/");
    let response = await getRequestApi(
      `/front/feature_wishes?keyword=${keyword}&company_slug=${companyName}&ipAddress=${res?.data?.IPv4}`
    );

    if (response) {
      if (response.data.data) {
        setIsSearch(true);
        setFilterWishList(response.data.data);
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      setloader(false);
    }
  };

  const searchHandler = async (val) => {
    if (val.length >= 3) {
      getFeaturesWishes(val);
    } else if (val.length === 0) {
      setIsSearch(false);
    } else {
    }
  };

  return (
    <>
      <div className="main-body">
        <FrontHeader />
        <div className="home_wrapper">
          {/* <FrontPageBanner /> */}
          {/* {!isCompanyFilter ? <HomeCompanies companyList={companyList} /> : ""} */}

          {/* <HomeFeatures featureList={featureList} /> */}
          <FeatureSearch
            featureWishes={featuresWishes}
            searchValue={searchValue}
            showcaseSection={showcaseSection}
            setSearchValue={setSearchValue}
            searchHandler={searchHandler}
            filterWishList={filterWishList}
            isSearch={isSearch}
            searchedCompanyName={searchedCompanyName}
          />
          {/* <HomeBottom /> */}
        </div>
        <FrontFooter />
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Home;
