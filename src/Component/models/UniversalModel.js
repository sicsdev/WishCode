import React from "react";
import InputText from "../Inputs/InputText";
import { Modal, Button } from "react-bootstrap";
import RangeCom from "../rangeSlider/RangeCom";

const UniversalModel = (props) => {
  return (
    <>
      <Modal show={props.showPriorityModel} onHide={props.handlePriorityClose}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">{props.modalHeading}</h5>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            props.formSubmit(e);
          }}
        >
          <Modal.Body>
            {props.RangeSlider && (
              <div className="input-form">
                <label className="mb-3">{props.RangeSliderLabel}</label>
                <RangeCom
                  rangevalue={props.RangeSliderValue}
                  setRangevalue={props.setRangeSliderValue}
                />
              </div>
            )}
            {props.inputText && (
              <InputText
                label={props.inputTextLable}
                value={props.inputTextValue}
                setValue={props.setInputTextValue}
                className={"form-control"}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-lg-primary">
              Submit
            </button>
            <Button
              variant="secondary"
              className="btn btn-lg-primary"
              onClick={(e) => {
                props.setShowPriorityModel(false);
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

export default UniversalModel;
