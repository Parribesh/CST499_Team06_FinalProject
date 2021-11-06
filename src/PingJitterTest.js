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
  const changeValue = () => {
    const test = network.getPing(0.1, 0.8);
    data.current = [...data.current, test];
    // console.log(test);
  };
  const startTest = () => {
    //data.current.length = 0;
    var pullRate = 30;
    var space = 200;
    for (var i = 0; i < 30; i++) {
      //setTimeout(() => { changeValue(); }, 200 * i);
      setTimeout(() => {
        changeValue();
      }, 1000 * i);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      startTest();
    }, 1500);
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
        </FadeIn>
      </center>
    </div>
  );
}
export default PingJitterTest;
