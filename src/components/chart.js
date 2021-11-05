import React, { useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";

const Chart = (props) => {
  const label = useRef([]);
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
    label.current.push(count.current);
  }, [props]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "You Speed ",
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    },
  };

  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };

  const data = {
    labels: label.current,
    datasets: [
      {
        label: "download Speed",
        lineTension: 0.5,
        data: props.data,
        fill: true,
        backgroundColor: "rgba(255,192,192,0.2)",
        borderColor: "rgba(255,192,192,1)",
      },
      {
        label: "Upload Speed",
        data: [props.data],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} legend={legend} width={700} />
    </div>
  );
};

export default Chart;
