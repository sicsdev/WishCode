import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ChartCom = (props) => {
  let first;
  first = {
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: true,
      },
    },
    stroke: { width: 1 },
    colors: ["#aa504f"],
    dataLabels: {
      enabled: true,
    },
    yaxis: {
      show: true,
    },

    xaxis: {
      type: props.dataType,
    },

    grid: {
      show: true,
      borderColor: "#aa504f",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };
  const [options, setOptions] = useState({
    ...first,
  });

  const [series, setSeries] = useState([
    {
      name: "",
      data: [],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: "Total Votes",
        data: props.data,
      },
    ]);
  }, [props.data]);

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type={props.type}
        height={400}
      />
    </>
  );
};
export default ChartCom;
