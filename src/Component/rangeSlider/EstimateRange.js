import React from 'react'
import { Range } from "react-range";

const EstimateRange = ({ rangevalue, setRangevalue }) => {
    return (
        <>
            <Range
                step={1}
                min={1}
                max={5}
                values={rangevalue?.values}
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
                            ...props?.style,
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
                {rangevalue?.values[0]?.toFixed()}
            </output>
        </>
    )
}

export default EstimateRange