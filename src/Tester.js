import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map } from "./components";
import ReactSpeedometer from "react-d3-speedometer";
import async from "async";
var network = require('./networkSim');

function Tester() {

    //we need to pass something in to tell if it should use low values or high values
    //in the case of low values, it simply needs to be 100
    var speed = .5;
    var stab = .3;

    const [testName, setName] = useState("Download Test");
    const [value, setValue] = useState([0]);
    const [startColor, setStartColor] = useState('#000000');
    const [endColor, setEndColor] = useState('#59b1e3');
    //temporary set max value that can be generated
    //const [maxValue, setMax] = useState([Math.ceil((1000 * speed + 1000 * speed * stab) / 10) * 10]);
    const [maxValue, setMax] = useState(150);
    const [forceRender, changeForce] = useState([false]);

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
    }
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
    }

    const startTest = () => {
        var pullRate = 30;
        var space = 200;
        for (var i = 0; i < 50; i++) {
            //setTimeout(() => { changeValue(); }, 200 * i);
            setTimeout(() => { changeValue(); }, 500 * i);
        }
    }

    const startUploadTest = () => {
        setValue(0);
        setName("Upload Test");
        changeForce(true);
        //TODO: Decide on color schemes, this is temp
        setStartColor('#103319');
        setEndColor('#15d445');
        let space = 1000;
        for(var i = 0; i< 50; i++){
            setTimeout(() => {changeUploadValue();}, space * i);
        }
    }

    window.onload = function () {
        // Not the cleanest way of handling this but because our test are running on a timer anyway
        // we can just specify the delay amount so that tests happen one after another
        // otherwise they overlap -- Chris
        // TODO: value should reset to 0 after test completes
        setTimeout(() => { startTest(); }, 2000);
        setTimeout(() => { startUploadTest(); }, 28000);
        // TODO: Local vs Distance speed, Jitter, ping tests
    }
    return (
        <div className="App" className={"center"}>
            <center>
                <h1> {testName} </h1>
                <ReactSpeedometer value={value}
                    minValue={0}
                    maxValue={maxValue}
                    forceRender={forceRender}
                    currentValueText={'${value} Mbps'}
                    segments={1000}
                    maxSegmentLabels={10}
                    startColor={startColor}
                    endColor={endColor}
                    textColor={'#ffffff'}
                    //needleTransitionDuration={100}
                    needleTransition={"easeBounceIn"}
                />
            </center>
        </div>
    );
}

export default Tester