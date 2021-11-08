import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

const Chart = (props) => {
  const [charData, setCharData] = useState({});

  const setData = () => {

    setCharData({
      labels: props.label,
      datasets: [
        {
          label: "Your Download Speed",
          data: props.data,
          backgroundColor: ['rgba(200, 10, 200, 0.7)'],
          borderWidhth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    setData()
  }, [props.data])

  return (
    <div>
      <Line data={charData} options={{maintainAspectRatio:false}}/>
    </div>
  );
};

export default Chart;
