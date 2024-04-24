import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { Link } from "react-router-dom";
import SearchBar from "../Component/Search/SearchBar";
import SearchCompany from "../Component/Search/SearchCompany";
import SearchFeature from "../Component/Search/SearchFeature";
import Loader from "../Component/Loader";
import { getRequestApi } from "../helper/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useColor } from "../commanapi/ColorProvider";

const SearchArea = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loader, setloader] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [loadPageData, setLoadPageData] = useState(false);
  const { isToggleOpen, toggleMenu } = useColor();
  useEffect(() => {
    getSearchResults("all");
  }, []);

  const getSearchResults = async (keyword) => {
    setloader(true);
    let response = await getRequestApi(`/search/${keyword}`);
    if (response) {
      setloader(false);
      if (response.data.data) {
        setCompanyList(response.data.data.company_list.data);
        setFeatureList(response.data.data.feature_list.data);
        setLoadPageData(true);
      } else {
        setloader(false);
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  const searchHandler = (val) => {
    if (val.length >= 3) {
      getSearchResults(val);
    } else if (val.length === 0) {
      getSearchResults("all");
    } else {
    }
  };

  return (
    <div className="main-body">
       <Sidebar isToggleOpen={isToggleOpen} toggleMenu={toggleMenu}>
          <Header isToggleOpen={isToggleOpen} toggleMenu={toggleMenu} />
        <section className="body-content-inner">
          <div className="container">
            <div className="dashboard card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="text-white text-uppercase">Search</h5>
              </div>
              <div className="card-body">
                <SearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  searchHandler={searchHandler}
                />
                {loadPageData && (
                  <div className="row">{
                    companyList == "" && featureList == "" ? <div className="col-md-12 text-center font-bold font-weight-bold">
                     No Data Found 
                    </div> :
                      <>
                        <div className="col-md-12">
                          {companyList != "" ? <SearchCompany companyList={companyList} /> : ""}
                        </div>
                        <div className="col-md-12">
                          {featureList != "" ? <SearchFeature featureList={featureList} /> : ""}
                        </div>
                      </>
                  }
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
      </Sidebar>
    </div>
  );
};

export default SearchArea;
