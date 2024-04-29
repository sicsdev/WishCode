import React, { useState, useEffect } from "react";
import { Range } from "react-range";

const RangeCom = ({ rangevalue, setRangevalue ,maxRangeLimit=10}) => {
  return (
    <>
      <Range
        step={1}
        min={1}
        max={maxRangeLimit}
        values={rangevalue.values}
        onChange={(values) => setRangevalue({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "1px",
              width: "100%",
              // backgroundColor: "#aa504f",
            }}
            className="p-1 rangeSlide"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "30px",
              width: "15px",
              // backgroundColor: "#aa504f",
            }}
            className="p-1 rangeSlide"
          />
        )}
      />
      <output
        style={{ marginTop: "30px", display: "block", textAlign: "center" }}
        id="output"
      >
        {rangevalue?.values[0]}
      </output>
    </>
  );
};

export default RangeCom;
