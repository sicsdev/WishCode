import React from "react";

const ButtonCom = (props) => {
  return (
    <>
      <div className="py-2 text-right">
        <button type={props.type} className={props.class} disabled={props.disable}>
          {props.name}
        </button>
      </div>
    </>
  );
};

export default ButtonCom;
