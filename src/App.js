import React, { useState, useEffect } from "react";
import Chart from "./components/chart.js";
import "./App.css";

function App() {
  const [valX, setX] = useState(0);
  const [valY, setY] = useState(0);

  function handleSubmit(e) {
    setX((value) => {
      value = e.target.value;
    });
  }

  // function handleChange(e) {
  //   setX((value) => {
  //     value = e.target.value;
  //   });
  // }

  useEffect(() => {
    console.log(valX);
    return () => {
      <p>value changed</p>;
    };
  }, [valX]);

  return (
    <div className="App">
      <h1>Plotter</h1>
      <div className="plotter">
        <Chart />
        <div className="">
          <h1>Please enter x and y</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="X"
              placeholder="EnterX"
              onChange={(e) => {
                setX(e.target.value);
              }}
            />
            <input type="text" name="Y" placeholder="EnterY" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
