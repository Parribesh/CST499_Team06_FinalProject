import React, { useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";

const HistoryChart = (props) => {
  const label = useRef([]);
  const second = useRef(0);
  const count = useRef(0);
  const chartData = useRef([]);

  useEffect(() => {
    let count = 1;
    if (props.data1.legth != null) {
      for (let i = 0; i < props.data1.length; i++) {
        label.current[i] = count;
        count = count + 1;
      }
    }
  }, []);

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
          font: {
            size: 20
          },
        },
      },
      title: {
        display: true,
        text: "Your Speed ",
        font: {
          size: 25
        },
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
          font: {
            size: 15
          },
        },
        min: 0,
        max: 150,

      },
      x: {
        title: {
          display: true,
          text: "Time In Sec",
          font: {
            size: 20
          },
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
        label: "Download Speed",
        lineTension: 0.5,
        data: props.data1,
        fill: true,
        backgroundColor: "rgba(72,108,208,0.3)",
        borderColor: "rgba(0, 0, 0, 0.3)",
      },
      {
        label: "Upload Speed",
        lineTension: 0.5,
        data: props.data2,
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
