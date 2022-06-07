import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequestApi } from "../../helper/Helper";

const EditFeatureModel = ({
  showModal,
  handleCloseModal,
  setshowModal,
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
  setProductName,
  productName,
}) => {
  // const [productName, setProductName] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  const updateCompanyFeaturehandler = async (e) => {
    e.preventDefault();
    setloader(true);
    const formData = new FormData();
    formData.append("id", featureId);
    formData.append("title", featureTitle);
    formData.append("content", featureDescription);
    formData.append("image", selectedFile);
    formData.append("companyID", companyId);
    formData.append("product_name", productName);
    try {
      const { data } = await axiosConfig.post(
        `/company-admin/post/update`,
        formData,
        config
      );
      setloader(false);
      setshowModal(false);
      getPageData();

      // console.log('data', data.message);
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setloader(false);
      return toast.error(
        `${
          error.response.data.message && error.response.data.message.title
            ? error.response.data.message.title[0]
            : error.response.data.message
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
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

  const updateFieldValue = (val) => {
    setProductName(val);
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Edit Company Feature</h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={updateCompanyFeaturehandler}>
          <Modal.Body>
            <>
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
                    searchHandler(e.target.value);
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
              Update
            </button>
            <Button
              variant="secondary"
              className="btn btn-lg-primary"
              onClick={(e) => {
                setshowModal(false);
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

export default EditFeatureModel;
