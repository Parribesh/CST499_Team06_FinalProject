import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Navigation, Footer, Home, About, History, Map } from "./components";
import FadeIn from "react-fade-in";
import PingJitterChart from "./components/PingJitterChart";
import ReactSpeedometer from "react-d3-speedometer";
var network = require("./networkSim");

function PingJitterTest() {
  const pingData = useRef([]);
  const jitterData = useRef([]);
  const data = useRef([]);
  const isDone = useRef(false);
  const [update, forceUpdate] = useState();
  const [currentAvg, updateAvg] = useState(0);
  const [currentStatus, updateStatus] = useState("Current Avg. ")
  const [testType, updateTest] = useState("Ping ");
  const [region, setRegion] = useState("California");
  //const region = sessionStorage.getItem("testingRegion");
  let runningTotal = 0;
  const changeValue = () => {
    const test = network.getPing(0.1, 0.8);
    //data.current = [...data.current, test];
    //jitterData.current = [...jitterData.current, test];
    //data.current = [...jitterData.current];
    pingData.current = [...pingData.current, test];
    data.current = [...pingData.current];
    runningTotal += test;
    updateAvg(Math.floor(runningTotal/pingData.current.length));
    console.log(currentAvg);
    //test changes each time changeValue is run
    //this will force a re-render every time data is updated
    forceUpdate(test);
    // console.log(test);
  };

  const jitterChangeValue = () =>{
    const test = network.getJitter(0.1, 0.8);
    jitterData.current = [...jitterData.current, test];
    data.current = [...jitterData.current];
    runningTotal += test;
    updateAvg(Math.floor(runningTotal/jitterData.current.length));
    forceUpdate(test);
  }
  const startTest = () => {
    //data.current.length = 0;
    var pullRate = 30;
    var space = 200;
    for (var i = 0; i < 15; i++) {
      //setTimeout(() => { changeValue(); }, 200 * i);
      setTimeout(() => {
        changeValue();
      }, 1000 * i);
    }
    setTimeout(()=>{
      if(sessionStorage.getItem('avgPing') != null){
        //JSON.parse lets us pull the values out as whatever type
        //We store it as an array so it'll always be an array
        let currentValues = JSON.parse(sessionStorage.getItem('avgPing'));
        currentValues.push(Math.floor(runningTotal/pingData.current.length));
        //JSON.stringify spits it back out as a string for sessionStorage
        sessionStorage.avgPing = JSON.stringify(currentValues);
        //Throw a dummy value into avgUp to make it easier to display results
        let old_values = JSON.parse(sessionStorage.getItem('avgJitter'));
        old_values.push('');
        sessionStorage.avgJitter = JSON.stringify(old_values);

      }else{
        //Make it an array before you add it to sessionStorage
        let currentValues = [];
        currentValues.push(Math.floor(runningTotal/pingData.current.length));
        sessionStorage.avgPing = JSON.stringify(currentValues);
        //We're gonna just throw a dummy value into avgUp as well to make it easier to display results
        let dummyValues = [''];
        sessionStorage.avgJitter = JSON.stringify(dummyValues);
      }
    }, 15500);
  };

  const startJitterTest = () => {
    updateTest("Jitter ");
    for (var i = 0; i< 10; i++){
      setTimeout(() => {
        jitterChangeValue();
      }, 1000 * i);
    }
    setTimeout(()=>{
      if(JSON.parse(sessionStorage.getItem('avgJitter')).length > 0){
        let currentValues =  JSON.parse(sessionStorage.getItem('avgJitter'));
        //if(currentValues.get(currentValues.length) === null){
        currentValues[currentValues.length - 1] = Math.floor(runningTotal/jitterData.current.length);
        //}
        //currentValues.push(Math.floor(avgUp/data.current.length));
        sessionStorage.avgJitter = JSON.stringify(currentValues);

      }else{
        let currentValues = [];
        currentValues.push(Math.floor(runningTotal/jitterData.current.length));
        sessionStorage.avgJitter = JSON.stringify(currentValues);
      }
    }, 10500);
  }

  window.onload = function(){
    setTimeout(() => {
      startTest();
    }, 1500);
    data.current = [];
    setTimeout( () => {
      isDone.current = true;
      runningTotal = 0;
      updateAvg(0);
      startJitterTest();
    }, 17500)
    setTimeout(() => {
      //Temporary
      window.location.href = "/History";
    }, 30500)
  }
  useEffect(() => {

  });

  return (
    <div className="App" className={"center"}>
      <center>
        <FadeIn>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">{testType} Test</h1>
              <p className="lead">Current Testing Region: {region}</p>
              <hr className="my-4"></hr>
            </div>
          </div>
          <PingJitterChart data={data.current} isDone={isDone.current}></PingJitterChart>
          <p className="lead">Average Speed: {currentAvg} ms</p>
        </FadeIn>
        {/*<ReactSpeedometer*/}
        {/*  value={update}*/}
        {/*    minValue={0}*/}
        {/*    maxValue={70}*/}
        {/*    currentValueText={"${value} Mbps"}*/}
        {/*    segments={1000}*/}
        {/*    maxSegmentLabels={10}*/}
        {/*    needleTransition={"easeBounceIn"}*/}
        {/*  />*/}
      </center>
    </div>
  );
}
export default PingJitterTest;
