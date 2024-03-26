import React from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { useState, useEffect } from "react";
import axiosConfig from "../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Component/Loader";

const Products = () => {
  const navigate = useNavigate();
  const [totalCompanyList, settotalCompanyList] = useState([]);
  const [alphaData, setAlphaData] = useState([]);
  const [loader, setloader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [companySiteUrl, setCompanySiteUrl] = useState("");
  const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  const filterCompanies = (val) => {
    setAlphaData([]);
    getAllCompanyList(val);
    setIsSearch(false);
  };

  useEffect(() => {
    getAllCompanyList("all");
  }, []);

  const getAllCompanyList = (keyword) => {
    setloader(true);
    axiosConfig
      .get(`/products/${keyword}`, config)
      .then((response) => {
        setloader(false);
        if (response?.data && response?.data?.data) {
          let cData = [];
          let pData = [];
          alphabets.forEach((element) => {
            const filterData = response?.data?.data?.companies.filter(
              (x) => x.company_name.charAt(0).toLowerCase() == element
            );
            console.log(response?.data?.data?.products)
            const productFilterData = response?.data?.data?.products.filter(
              (x) => x.product_name.charAt(0).toLowerCase() === element
              
            );
            console.log(productFilterData);
            if (
              (filterData && filterData.length > 0) ||
              (productFilterData && productFilterData.length > 0)
            ) {
              let payload = {
                alpha: element,
                companies: filterData,
                products: productFilterData,
              };
              cData.push(payload);
            }
          });
          setAlphaData(cData);
        }
      })
      .catch((data) => {
        setloader(false);
        toast.error(data.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };
  const sendToProduct = (id) => {
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(id),
      "secret key 123"
    ).toString();
    let dataString = ciphertext
      .replace(/\+/g, "p1L2u3S")
      .replace(/\//g, "s1L2a3S4h")
      .replace(/=/g, "e1Q2u3A4l");
    navigate("/products/" + dataString);
  };

  const searchCompanyHandler = (val) => {
    if (val.length >= 3) {
      setAlphaData([]);
      getAllCompanyList(val);
      setIsSearch(true);
    } else if (val.length === 0) {
      setAlphaData([]);
      getAllCompanyList("all");
      setIsSearch(false);
    } else {
    }
  };

  const submitCompanyHandler = (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const { data } = axiosConfig.post(
        `/company/apply`,
        {
          company_name: searchValue,
          company_url: companySiteUrl,
        },
        config
      );
      getAllCompanyList("all");
      setSearchValue("");
      setCompanySiteUrl("");
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
            : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <>
      <div className="main-body">
        <Sidebar>
          <Header />
          <section className="body-content-inner">
            <div className="container">
              <div className="dashboard card">
                <div className="card-header">
                  <h5 className="text-white text-uppercase">Products</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-form">
                        <label>Search {localStorage.getItem('role') == 3 || localStorage.getItem('role') ==2 ? "Products" : "Companies"}</label>
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            searchCompanyHandler(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="company-names">
                        {alphabets.map((ele, key) => (
                          <span
                            key={key}
                            className="text-uppercase custom-product-span"
                            onClick={(e) => {
                              filterCompanies(ele);
                            }}
                          >
                            {ele}
                          </span>
                        ))}
                      </div>
                    </div>
                    {alphaData.length !== 0 ? (
                      alphaData.map((element, key) => (
                        <div
                          className="col-md-12 mt-3 company-order-main"
                          key={key}
                        >
                          <div className="company-names">
                            <span className="text-capitalize custom-product-span">
                              {element.alpha} alphabets
                            </span>
                          </div>
                          {localStorage.getItem('role') == 4 ?  <div className="company-list">
                            <div className="row">
                              <p className="search_heading">Companies</p>
                              {element.companies.map((company, index) => (
                                <div className="col-md-3" key={index}>
                                  <span className="d-block py-3 text-uppercase company-nameing custom-product-span">
                                    <Link
                                      className="link-secondary single-product-link"
                                      to={`/dashboard/company/${company.id}`}
                                    >
                                      {company.company_name}
                                    </Link>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>:""}
                         
                          <div className="product-list">
                            <div className="row">
                              <p className="search_heading">Products</p>
                              {element.products.map((product, index) => (
                                <div className="col-md-3" key={index}>
                                  <span className="d-block py-3 text-uppercase company-nameing custom-product-span">
                                    <Link
                                      className="link-secondary single-product-link"
                                      to={`/dashboard/product/${product.id}`}
                                    >
                                      {product.product_name}
                                    </Link>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : isSearch === true ? (
                      <div className="col-md-12">
                        <div className="company-not-found mt-5 text-center">
                          <label>Company was not found.</label>
                          <br />
                          <form onSubmit={(e) => submitCompanyHandler(e)}>
                            <label>Do you want to add it?</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Company Site URL"
                              value={companySiteUrl}
                              onChange={(e) =>
                                setCompanySiteUrl(e.target.value)
                              }
                              required
                            />
                            <div className="py-2">
                              <button
                                type="submit"
                                className="btn btn-lg-primary"
                              >
                                ADD
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="col-md-12">
                          <p className="text-center">No Company Found</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        
        </Sidebar>
      </div>
      {loader === true ? <Loader /> : <></>}
      <ToastContainer />
    </>
  );
};

export default Products;
