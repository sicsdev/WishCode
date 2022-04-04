import React from "react";

const InputRadioCom = (props) => {
  return (
    <>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          className={props.className}
          name={props.name}
          checked={props.checked === props.value ? true : false}
        />
        {props.label !== "" ? (
          <label className="form-check-label">{props.label}</label>
        ) : null}
      </div>
    </>
  );
};

export default InputRadioCom;
