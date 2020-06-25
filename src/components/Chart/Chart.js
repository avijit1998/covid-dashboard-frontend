import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ timelyData }) => {
  timelyData.reverse();

  const lineChart = timelyData.length ? (
    <Line
      data={{
        labels: timelyData.map(({ lastUpdate }) => lastUpdate),
        datasets: [
          {
            data: timelyData.map(({ totalCases }) => totalCases),
            label: "Total Cases",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: timelyData.map(({ totalDeaths }) => totalDeaths),
            label: "Total Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: timelyData.map(({ totalRecovered }) => totalRecovered),
            label: "Total Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
