import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../base_url/config";
import { getRequestApi } from "../../../helper/Helper";

const SuggestFeatureModel = (props) => {
  const [companyName, setCompanyName] = useState("");
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDescription, setfeatureDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [modelLoginText, setModelLoginText] = useState(false);
  const [suggestedComapnies, setSuggestedComapnies] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    setCompanyName(props.searchedCompanyName);
  }, [props.searchedCompanyName]);

  const submitFormData = async (e) => {
    e.preventDefault();
    if (tokens === null) {
      setModelLoginText(true);
      return false;
    }
    props.setLoader(true);

    // return false;
    try {
      const { data } = await axiosConfig.post(
        "/suggest_feature/create",
        {
          company_name: companyName,
          feature_title: featureTitle,
          feature_content: featureDescription,
          product_name: productName,
        },
        config
      );
      props.setLoader(false);
      props.setShow(false);
      setFeatureTitle("");
      setfeatureDescription("");
      setProductName("");
      setCompanyName("");
      setSuggestedComapnies([]);
      setSuggestedProducts([]);
      toast.success("Feature Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log("error", error);
      props.setLoader(false);
    }
  };

  const searchHandler = async (val, type) => {
    if (type === "company") {
      if (val.length >= 3) {
        let res = await getSuggestedItems(val, type);
        if (res) {
          setSuggestedComapnies(res);
        }
      } else if (val.length == 0) {
        setSuggestedComapnies([]);
      } else {
      }
    } else {
      if (val.length >= 3) {
        let res = await getSuggestedItems(val, type);
        if (res) {
          setSuggestedProducts(res);
        }
      } else if (val.length == 0) {
        setSuggestedProducts([]);
      } else {
      }
    }
  };

  const getSuggestedItems = async (keyword, type) => {
    let response = await getRequestApi(
      `/feature/filter/company_product?keyword=${keyword}&filterType=${type}`
    );

    if (response) {
      if (response?.data?.success) {
        return response.data.data;
      } else {
        return toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
    }
  };

  const updateFieldValue = (val, type) => {
    if (type === "company") {
      setCompanyName(val);
    } else {
      setProductName(val);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.close} size="lg">
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Add Feature</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            submitFormData(e);
          }}
        >
          <Modal.Body>
            <>
              {modelLoginText ? (
                <div>
                  <p>
                    You must be logged in to add a new feature.{" "}
                    <span>
                      Please{" "}
                      <a className="text-info" href="/login">
                        Login
                      </a>
                    </span>
                  </p>
                </div>
              ) : (
                <>
                  <div className="input-form">
                    <label> Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                      value={companyName}
                      disabled={props.searchedCompanyName !== "" ? true : false}
                      required
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        searchHandler(e.target.value, "company");
                      }}
                    />
                    <div className="mb-3">
                      {suggestedComapnies.length > 0 &&
                        suggestedComapnies?.map((value, key) => (
                          <span
                            key={key}
                            role={"button"}
                            className={
                              value.company_name === companyName
                                ? "badge badge-primary mr-2 p-2"
                                : "badge badge-dark mr-2 p-2"
                            }
                            // className="badge badge-dark mr-2 p-2"
                            onClick={(e) =>
                              updateFieldValue(value.company_name, "company")
                            }
                          >
                            {value.company_name}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="input-form">
                    <label> Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                      value={featureTitle}
                      required
                      onChange={(e) => setFeatureTitle(e.target.value)}
                    />
                  </div>
                  <div className="input-form">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Description"
                      rows="5"
                      cols="20"
                      required
                      value={featureDescription}
                      onChange={(e) => setfeatureDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="input-form">
                    <label> Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                      value={productName}
                      required
                      onChange={(e) => {
                        setProductName(e.target.value);
                        searchHandler(e.target.value, "product");
                      }}
                    />
                    {suggestedProducts.length > 0 &&
                      suggestedProducts?.map((value, key) => (
                        <div className="mb-3" key={key}>
                          <span
                            role={"button"}
                            className={
                              value.product_name === productName
                                ? "badge badge-primary mr-2 p-2"
                                : "badge badge-dark mr-2 p-2"
                            }
                            onClick={(e) =>
                              updateFieldValue(value.product_name, "product")
                            }
                          >
                            {value.product_name}
                          </span>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-lg-primary">
              Submit
            </button>
            <Button
              variant="secondary"
              className="btn btn-lg-primary"
              onClick={(e) => {
                props.setShow(false);
              }}
            >
              Close Modal
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default SuggestFeatureModel;
