import React, { useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";

const PingJitterChart = (props) => {
  //const label = useRef([]);
  //const label = Array.from({length: 31}, (v, i) => i);
  //const count = useRef(0);
  const label = useRef([]);
  const second = useRef(0);
  const count = useRef(0);
  const chartData = useRef([]);

  useEffect(() => {
    //count.current = count.current + 1;
    //label.current.push(count.current);
    //console.log(label.current);
    // label2.current.push(props.data.at(-1) - 25);
    //}, [props]);
    if (props.isDone === true) {
      if (second.current === 0) {
        label.current = [];
        count.current = 0;
        chartData.current = [];
        second.current = second.current + 1;
      }
    }
    count.current = count.current + 1;
    chartData.current = [...props.data];
    label.current.push(count.current);
  }, [props]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: true,
    plugins: {
      legend:{
        display: false,
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Time in ms",
          font: {
            size: 20
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          fontColor: "green",
          display: true,
          // stepSize: 0,
          font: {
            size: 20
          },
        },
        min: 0,
        max: 30,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          fontColor: "green",
          display: false,
          // stepSize: 5,
        },
        beginAtZero: false,
      },
    },
  };

  const data1 = {
    labels: label.current,
    display: false,
    datasets: [
      {
        label: "Ping",
        lineTension: 0.5,
        data: chartData.current,
        fill: true,
        backgroundColor: "rgba(28,72,255,0.2)",
        borderColor: "rgb(255,0,0)",
      },
    ],
  };

  const data2 = {
    labels: label.current,
    display: false,
    datasets: [
      {
        label: "Jitter",
        lineTension: 0.5,
        data: chartData.current,
        fill: true,
        backgroundColor: "rgba(0,122,22,0.5)",
        borderColor: "rgb(0,0,0)",
      },
    ],
  };

  return (
      <div>
      <Line
        data={props.isDone ? data2 : data1}
        options={options}
        width={500}
        height={400}
      />
    </div>
  );
};

export default PingJitterChart;
