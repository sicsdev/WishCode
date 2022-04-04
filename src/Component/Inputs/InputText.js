import React from "react";

const InputText = (props) => {
  return (
    <>
      <div className="input-form">
        {props.label !== "" ? <label>{props.label}</label> : null}

        <input
          type={props.type}
          value={props.value}
          onChange={
            props.type === "file"
              ? (e) => props.setValue(e.target.files[0])
              : (e) => props.setValue(e.target.value)
          }
          className={props.className}
          placeholder={props.placeholder}
          accept={props.accept}
          required={props.required}
          onBlur={props.isOnBlur ? (e) => props.onblur(e.target.value) : null}
          disabled={props.disabled}
        />
      </div>
    </>
  );
};

export default InputText;
