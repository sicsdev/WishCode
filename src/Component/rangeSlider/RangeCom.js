import React, { useState, useEffect } from "react";
import { Range } from "react-range";

const RangeCom = ({ rangevalue, setRangevalue }) => {
  return (
    <>
      <Range
        step={1}
        min={1}
        max={10}
        values={rangevalue.values}
        onChange={(values) => setRangevalue({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "1px",
              width: "100%",
              backgroundColor: "#aa504f",
            }}
            className="p-1"
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
              backgroundColor: "#aa504f",
            }}
          />
        )}
      />
      <output
        style={{ marginTop: "30px", display: "block", textAlign: "center" }}
        id="output"
      >
        {rangevalue.values[0].toFixed()}
      </output>
    </>
  );
};

export default RangeCom;
