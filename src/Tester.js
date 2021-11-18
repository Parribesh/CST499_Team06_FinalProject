import "./App.css";
import React, { useState, useRef } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import FadeIn from "react-fade-in";

import Chart from "./components/chart";
import { Button, FormLabel } from "react-bootstrap";
var network = require("./networkSim");

function Tester() {
  //TODO: clean up code
  //we need to pass something in to tell if it should use low values or high values
  //in the case of low values, it simply needs to be 100
  var speed = 0.5;
  var stab = 0.3;

  const [testName, setName] = useState("Download Test");
  const [value, setValue] = useState([0]);
  const dataDown = useRef([]); //Paribesh
  const dataUp = useRef([]);
  const data = useRef([]);
  const isDone = useRef(false);
  const [startColor, setStartColor] = useState("#000000");
  const [endColor, setEndColor] = useState("#59b1e3");
  //temporary set max value that can be generated
  //const [maxValue, setMax] = useState([Math.ceil((1000 * speed + 1000 * speed * stab) / 10) * 10]);
  const [maxValue, setMax] = useState(150);
  const [forceRender, changeForce] = useState([false]);
  const [regionName, setRegion] = useState("California");
  let avgDown = 0;
  let avgUp = 0;

  const changeValue = () => {
    const test = network.getDownloadSpeed(speed, stab);
    //console.log("Test value..." + test);
    //console.log("maxValue" + maxValue);
    if (test > maxValue) {
      changeForce(true);
      setMax(Math.ceil(test / 10) * 10);
    }
    changeForce(false);
    setValue(test);
    dataDown.current = [...dataDown.current, test];
    data.current = [...dataDown.current];
    avgDown += test;
  };

  const changeUploadValue = () => {
    const test = network.getUploadSpeed(speed, stab);
    //console.log("Test value..." + test);
    //console.log("maxValue" + maxValue);
    if (test > maxValue) {
      changeForce(true);
      setMax(Math.ceil(test / 10) * 10);
    }
    changeForce(false);
    setValue(test);
    dataUp.current = [...dataUp.current, test];
    data.current = [...dataUp.current];
    avgUp += test;
    console.log(data.current);
  };

  const startTest = () => {
    for (var i = 0; i < 50; i++) {
      //setTimeout(() => { changeValue(); }, 200 * i);
      setTimeout(() => {
        changeValue();
      }, 500 * i);
    }
    //reset to 0
    setTimeout(() => {
      setValue(0);
      //Check if the session item is empty
      if(sessionStorage.getItem('avgDown') != null){
        //JSON.parse lets us pull the values out as whatever type
        //We store it as an array so it'll always be an array
        let currentValues = JSON.parse(sessionStorage.getItem('avgDown'));
        currentValues.push(Math.floor(avgDown/dataDown.current.length));
        //JSON.stringify spits it back out as a string for sessionStorage
        sessionStorage.avgDown = JSON.stringify(currentValues);
        //Throw a dummy value into avgUp to make it easier to display results
        let old_values = JSON.parse(sessionStorage.getItem('avgUp'));
        old_values.push('');
        sessionStorage.avgUp = JSON.stringify(old_values);

      }else{
        //Make it an array before you add it to sessionStorage
        let currentValues = [];
        currentValues.push(Math.floor(avgDown/dataDown.current.length));
        sessionStorage.avgDown = JSON.stringify(currentValues);
        //We're gonna just throw a dummy value into avgUp as well to make it easier to display results
        let dummyValues = [''];
        sessionStorage.avgUp = JSON.stringify(dummyValues);
      }
    }, 25500);
  };

  const startUploadTest = () => {
    setValue(0);
    setName("Upload Test");
    changeForce(true);
    //TODO: Decide on color schemes, this is temp
    setStartColor("#103319");
    setEndColor("#15d445");
    let space = 500;
    for (var i = 0; i < 50; i++) {
      setTimeout(() => {
        changeUploadValue();
      }, space * i);
    }
    //reset to 0
    setTimeout(() => {
      setValue(0);
      if(JSON.parse(sessionStorage.getItem('avgUp')).length > 0){
        let currentValues =  JSON.parse(sessionStorage.getItem('avgUp'));
        //if(currentValues.get(currentValues.length) === null){
        currentValues[currentValues.length - 1] = Math.floor(avgUp/dataUp.current.length);
        //}
        //currentValues.push(Math.floor(avgUp/data.current.length));
        sessionStorage.avgUp = JSON.stringify(currentValues);

      }else{
        let currentValues = [];
        currentValues.push(Math.floor(avgUp/dataUp.current.length));
        sessionStorage.avgUp = JSON.stringify(currentValues);
      }
    }, 25500);
  };

  window.onload = function () {
    // Not the cleanest way of handling this but because our test are running on a timer anyway
    // we can just specify the delay amount so that tests happen one after another
    // otherwise they overlap -- Chris
    setTimeout(() => {
      startTest();
    }, 1500);
    // TODO: better transition to upload test
    data.current = [];

    setTimeout(() => {
      isDone.current = true;
      startUploadTest();
    }, 31000);
    // TODO: Local vs Distance speed, Jitter, ping tests
  };

  return (
    <div className="App" className={"center"}>
      <center>
        <FadeIn>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">{testName}</h1>
              <p className="lead">Current Testing Region: {regionName}</p>
              <hr className="my-4"></hr>
            </div>
          </div>
          <ReactSpeedometer
            value={value}
            minValue={0}
            maxValue={maxValue}
            forceRender={forceRender}
            currentValueText={"${value} Mbps"}
            segments={1000}
            maxSegmentLabels={10}
            startColor={startColor}
            endColor={endColor}
            textColor={"#ffffff"}
            needleColor={"#ff3814"}
            //needleTransitionDuration={100}
            needleTransition={"easeBounceIn"}
          />
          <Chart
            data={data.current}
            isDone={isDone.current}
            isHistory={false}
          />
        </FadeIn>
      </center>
    </div>
  );
}

export default Tester;
