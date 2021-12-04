import React, { useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";

const HistoryChart = (props) => {
  const label = useRef([]);
  const second = useRef(0);
  const count = useRef(0);
  const chartData = useRef([]);

  useEffect(() => {
    let count = 1;
    for (let i = 0; i < props.data1.length; i++) {
      label.current[i] = count;
      count = count + 1;
    }
  }, [props.data1.length]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "#212A49",
          fontSize: 20,
        },
      },
      title: {
        display: true,
        text: "Your Speed ",
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          fontColor: "green",
          display: true,
          stepSize: 0,
        },
        min: 10,
        max: 200,
      },
      x: {
        title: {
          display: true,
          text: "Time In Sec",
        },
        grid: {
          display: false,
        },
        ticks: {
          fontColor: "green",
          display: false,
          stepSize: 5,
        },
        beginAtZero: false,
      },
    },
  };

  const data1 = {
    labels: props.label,
    display: false,
    datasets: [
      {
        label: "download Speed",
        lineTension: 0.5,
        data: props.data1,
        fill: true,
        backgroundColor: "rgba(255,192,192,0.2)",
        borderColor: "rgba(255, 192, 192, 0.7)",
      },
      {
        label: "Upload Speed",
        lineTension: 0.5,
        data: JSON.parse(sessionStorage.getItem("dataUp")),
        fill: true,
        backgroundColor: "rgba(00,122,22,0.5)",
        borderColor: "rgba(100,52,100,0.7)",
      },
    ],
  };

  //   const data2 = {
  //     labels: label.current,
  //     display: false,
  //     datasets: [],
  //   };

  return (
    <div>
      <Line data={data1} options={options} width={700} height={220} />
    </div>
  );
};

export default HistoryChart;
