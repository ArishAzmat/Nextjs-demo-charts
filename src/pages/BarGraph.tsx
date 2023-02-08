import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const BarChart = (props: any) => {
  const { categories,data } = props;
  const options = {
    chart: {
      type: "column",
      backgroundColor: "#5b5e6c",
    },
    title: {
      text: "Price of each stocks",
      style: {
        color: "#fff",
      },
    },
    xAxis: {
      tickWidth: 0,
      labels: {
        style: {
          color: "#fff",
        },
      },
      categories: categories,
    },
    yAxis: {
      gridLineWidth: 0.5,
      gridLineDashStyle: "dash",
      gridLineColor: "black",
      title: {
        text: "",
        style: {
          color: "#fff",
        },
      },
      labels: {
        // formatter: function() {
        //   return Highcharts.numberFormat(this.value, 0, '', ',');
        // },
        style: {
          color: "#fff",
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      valuePrefix: "",
    },
    plotOptions: {
      column: {
        borderRadius: 0,
        pointPadding: 0,
        groupPadding: 0.05,
      },
    },
    series: [
      {
        name: "Prices",
        data: data,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
