import React, { useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";

const Chart = (props) => {
  const label = useRef([]);
  const data = useRef([]);
  data.current = [];
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
    label.current.push(count.current);
    let temp = props.data;
    data.current.push(temp);
    console.log(props.data);
  }, [props, data]);

  return (
    <div>
      <Line
        data={{
          labels: label.current,
          datasets: [
            {
              label: "Your Download Speed",
              lineTension: 0.5,
              data: props.data,
              backgroundColor: ["rgba(255, 0, 0, .7)"],
              fill: 1,
              borderColor: [
                "rgba(255, 90, 132, 0.7)",
                "rgba(54, 162, 235, 0.3)",
                "rgba(255, 206, 86, 0.3)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidhth: 0.5,
            },
          ],
          options: {
            plugins: {
              filler: {
                propagate: true,
              },
            },
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
                gridLines: {
                  drawOnChartArea: false,
                },
              },
              x: [
                {
                  type: "time",
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    autoSkip: false,
                    maxTicksLimit: 50,
                  },
                },
              ],
            },
          },
        }}
        height={200}
        width={400}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Chart;
