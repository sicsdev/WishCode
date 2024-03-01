import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RangeCom from "../rangeSlider/RangeCom";
import { getRequestApi } from "../../helper/Helper";

const AddFeatureModel = ({
  show,
  handleClose,
  setShow,
  setloader,
  companyId,
  getPageData,
  featureTitle,
  featureDescription,
  selectedFile,
  setselectedFile,
  setfeatureTitle,
  setfeatureDescription,
  featureId,
  setfeatureId,
  productData,
  companyData,
}) => {
  const [rangevalue, setRangevalue] = useState({ values: [1] });
  const [developmentURL, setDevelopmentURL] = useState("");
  const [productName, setProductName] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [suggestCompany, setSuggestCompany] = useState('');
  const [suggestCompanyProduct, setSuggestCompanyProducts] = useState("");
  const [productId, setProductId] = useState("");

  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  useEffect(() => {
    setProductName(productData);
  }, [productData]);

  useEffect(() => {
    getSuggestedCompany();
  }, "")

  const addCompanyFeature = async (e) => {
    e.preventDefault();
    setloader(true);
    const formData = new FormData();
    formData.append("title", featureTitle);
    formData.append("content", featureDescription);
    formData.append("internal_priority", rangevalue.values);
    formData.append("development_url", developmentURL);
    formData.append("image", selectedFile);
    formData.append("companyID", companyId);
    formData.append("product_name", productName);
    formData.append("product_id", productId)

    try {
      const { data } = await axiosConfig.post(
        "/company-admin/post/store",
        formData,
        config
      );
      setloader(false);
      setShow(false);
      getPageData();
      setfeatureTitle("");
      setfeatureDescription("");
      setProductName("");
      toast.success("Feature Added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setselectedFile(null);
    } catch (error) {
      console.log("error", error);
      setloader(false);
    }
  };

  const searchHandler = async (val) => {
    if (val.length >= 3) {
      let res = await getSuggestedItems(val);
      if (res) {
        setSuggestedProducts(res);
      }
    } else if (val.length == 0) {
      setSuggestedProducts([]);
    } else {
    }
  };

  const getSuggestedItems = async (keyword) => {
    let response = await getRequestApi(
      `/feature/filter/company_product?keyword=${keyword}&filterType=product`
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
  const getSuggestedCompany = async () => {
    let response = await getRequestApi(
      "/company/all/end_user"
    );
    if (response) {
      if (response?.data?.success) {
        setSuggestCompany(response?.data?.data);
      } else {
        return toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
    }
  }

  const handleCompanyChange = async (companyId) => {
    let response = await getRequestApi(
      `/get/product/?company_id=${companyId}`
    );
    if (response) {
      if (response?.data?.success) {
        console.log(response?.data?.data)
        setSuggestCompanyProducts(response?.data?.data);
      } else {
        return toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
    }
  }
  const handleProductChange = (productId) => {
    setProductId(productId);
  }
  const updateFieldValue = (val) => {
    setProductName(val);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Add Feature</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            addCompanyFeature(e);
          }}
        >
          <Modal.Body>
            <>
              {companyData && companyData !== "" ? (
                <div className="input-form">
                  <label> Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={companyData}
                    disabled={true}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="input-form">
                <label> Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  value={featureTitle}
                  required
                  onChange={(e) => setfeatureTitle(e.target.value)}
                />
              </div>
              {localStorage.getItem('role') == 4 ?
                <div className="input-form">
                  <label> Select Company</label>
                  <select
                    className="form-control"
                    onChange={(event) => handleCompanyChange(event.target.value)}
                    required
                  >
                    <option value="">Select a company</option>
                    {suggestCompany ? suggestCompany?.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    )) : ""}
                  </select>
                </div> : ""}
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

              {localStorage.getItem('role') == 4 ? "" : <div className="input-form">
                <label className="mb-3">Priority</label>
                <RangeCom
                  rangevalue={rangevalue}
                  setRangevalue={setRangevalue}
                />
              </div>}
              {localStorage.getItem('role') == 4 ? "" : <div className="input-form">
                <label>Development URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Development URL"
                  value={developmentURL}
                  onChange={(e) => setDevelopmentURL(e.target.value)}
                />
              </div>}
              { }
              <div className="input-form">
                <label> {localStorage.getItem('role') == 4 ? "Select Product" : "Product Name"}</label>
                {localStorage.getItem('role') == 4 ?
                  <select
                    className="form-control"
                    onChange={(event) => handleProductChange(event.target.value)}
                    required
                  >
                    <option value="">Select a Product</option>
                    {suggestCompanyProduct ? suggestCompanyProduct?.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.product_name}
                      </option>
                    )) : ""}
                  </select> : <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Title"
                    value={productName}
                    required
                    onChange={(e) => {
                      setProductName(e.target.value);
                      searchHandler(e.target.value);
                    }}
                  />}


                { }
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
                        onClick={(e) => updateFieldValue(value.product_name)}
                      >
                        {value.product_name}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="input-form">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setselectedFile(e.target.files[0])}
                />
              </div>
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
                setShow(false);
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

export default AddFeatureModel;
