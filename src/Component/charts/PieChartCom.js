import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const PieChartCom = (props) => {
  const [options, setOptions] = useState({
    labels: props.label,
    title: {
      text: props.title,
      align: "center",
    },
    theme: {
      monochrome: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // console.log(config.w.config.labels[config.dataPointIndex]);
        },
      },
    },
    noData: {
      text: "There's no data",
      align: "center",
      verticalAlign: "middle",
    },
  });
  return (
    <>
      <ReactApexChart
        options={options}
        series={props?.votesData}
        type="pie"
        width="380"
      />
    </>
  );
};

export default PieChartCom;
