import React, { useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";

const PingJitterChart = (props) => {
  const label = useRef([]);
  //const label = Array.from({length: 31}, (v, i) => i);
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
    label.current.push(count.current);
    // label2.current.push(props.data.at(-1) - 25);
  }, [props]);

  const options = {
    maintainAspectRatio: false,

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
        },
        min: 100,
        max: 500,
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
          stepSize: 10,
        },
      },
    },
  };

  const legend = {};

  const data = {
    labels: label.current,
    display: false,
    datasets: [
      {
        label: "Ping",
        lineTension: 0.5,
        data: props.data,
        fill: true,
        backgroundColor: "rgba(255,192,192,0.2)",
        borderColor: "rgb(87,184,0)",
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} legend={legend} width={700} />
    </div>
  );
};

export default PingJitterChart;