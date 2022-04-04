import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosConfig from "../../base_url/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RangeCom from "../rangeSlider/RangeCom";

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
}) => {
  const [rangevalue, setRangevalue] = useState({ values: [0] });
  const [developmentURL, setDevelopmentURL] = useState("");
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

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
                <label className="mb-3">Internal Priority</label>
                <RangeCom
                  rangevalue={rangevalue}
                  setRangevalue={setRangevalue}
                />
              </div>
              <div className="input-form">
                <label>Development URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Development URL"
                  value={developmentURL}
                  onChange={(e) => setDevelopmentURL(e.target.value)}
                />
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
