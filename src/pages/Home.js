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

const Home = () => {
  const [loader, setloader] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [featuresWishes, setFeaturesWishes] = useState([]);
  const [filterWishList, setFilterWishList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const [searchParams] = useSearchParams();
  let companyName = searchParams.get("company");

  useEffect(() => {
    getHomePageData();
  }, []);

  const getHomePageData = async () => {
    let response = await getRequestApi(`/front/dashboard`);
    if (response) {
      if (response.data.data) {
        setFeatureList(response.data.data.posts);
        setCompanyList(response.data.data.companies);
        setFeaturesWishes(response.data.data.featureWishList);
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
    let response = await getRequestApi(
      `/front/feature_wishes?keyword=${keyword}`
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
          <FrontPageBanner />
          <HomeCompanies companyList={companyList} />
          <HomeFeatures featureList={featureList} />
          <HomeBottom />
          <FeatureSearch
            featureWishes={featuresWishes}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchHandler={searchHandler}
            filterWishList={filterWishList}
            isSearch={isSearch}
          />
          <FrontFooter />
        </div>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Home;
