import React from 'react'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const DonutChart = (props:any) => {
    const {chartData} = props 
    const options = {
        chart: {
          type: "pie",
          backgroundColor: '#5b5e6c'
        },
        title: {
          text: "We invest in following sectors",
          style: {
            color: "#fff",
          },
        },
        subtitle: {
          text: "",
        },
        plotOptions: {
          pie: {
            shadow: false,
          },
        },
        tooltip: {
          valueSuffix: "",
        },
        series: [
          {
            name: "Number of Stocks",
            data: chartData,
            size: "100%",
            innerSize: "50%",
            dataLabels: {
              color: "#ffffff",
              distance: -30,
            },
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 400,
              },
              chartOptions: {
                series: [
                  {},
                  {
                    id: "versions",
                    dataLabels: {
                      enabled: false,
                    },
                  },
                ],
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
      }
  return (
    <HighchartsReact highcharts={Highcharts} options={options}/>
  )
}

export default DonutChart