import React from "react";
import Chart from "react-apexcharts";

export default () => {
  const state = {
    options: {
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      labels: ["Time Left"]
    },
    series: [44]
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="radialBar"
      width={500}
      height={500}
    />
  );
};
