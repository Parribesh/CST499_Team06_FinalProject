import React, { useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";

const PingJitterChart = (props) => {
  //const label = useRef([]);
  const label = Array.from({length: 31}, (v, i) => i);
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
    //label.current.push(count.current);
    //console.log(label.current);
    // label2.current.push(props.data.at(-1) - 25);
  }, [props]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Ping",
      },
      legend:{
        display: false,
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Time in ms"
        },
        grid: {
          display: false,
        },
        ticks: {
          fontColor: "green",
          stepSize: 25,
        },
        min: 0,
        max: 150,
      },
      x: {
        title: {
          display: true,
          text: "Time In Sec",
        },
        grid: {
          display: true,
        },
        ticks: {
          fontColor: "green",
          display: true,
          stepSize: 5,
        },
        min: 0,
        max: 30,
      },
    },
  };

  const data = {
    labels: label,
    display: false,
    datasets: [
      {
        label: "Ping",
        lineTension: 0.2,
        data: props.data,
        fill: true,
        backgroundColor: "rgba(28,72,255,0.2)",
        borderColor: "rgb(255,0,0)",
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} width={700} height={400} />
    </div>
  );
};

export default PingJitterChart;
