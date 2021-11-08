import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Navigation, Footer, Home, About, History, Map } from "./components";
import FadeIn from "react-fade-in";
import PingJitterChart from "./components/PingJitterChart";
var network = require("./networkSim");

function PingJitterTest() {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#using_arrow_functions_and_array.from
  //const labels = Array.from({length: 31}, (v, i) => i);
  const data = useRef([]);
  const [update, forceUpdate] = useState();
  const [currentAvg, updateAvg] = useState(0);
  const [currentStatus, updateStatus] = useState("Current Avg. ")
  let runningTotal = 0;
  const changeValue = () => {
    const test = network.getPing(0.1, 0.8);
    data.current = [...data.current, test];
    runningTotal += test;
    updateAvg(Math.floor(runningTotal/data.current.length));
    console.log(currentAvg);
    //test changes each time changeValue is run
    //this will force a re-render every time data is updated
    forceUpdate(test);
    // console.log(test);
  };
  const startTest = () => {
    //data.current.length = 0;
    var pullRate = 30;
    var space = 200;
    for (var i = 0; i <= 30; i++) {
      //setTimeout(() => { changeValue(); }, 200 * i);
      setTimeout(() => {
        changeValue();
      }, 1000 * i);
    }
  };

  window.onload = function(){
    setTimeout(() => {
      startTest();
    }, 1500);
    setTimeout( () => {
      updateStatus('Final Avg. ');
    }, 32000)
  }
  useEffect(() => {

  });

  return (
    <div className="App" className={"center"}>
      <center>
        <FadeIn>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Ping Test</h1>
              <p className="lead">Current Testing Region: California</p>
              <hr className="my-4"></hr>
            </div>
          </div>
          <PingJitterChart data={data.current}></PingJitterChart>
          <p className="lead">{currentStatus} Ping: {currentAvg} ms</p>
        </FadeIn>
      </center>
    </div>
  );
}
export default PingJitterTest;
