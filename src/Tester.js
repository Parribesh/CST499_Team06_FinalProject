import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map } from "./components";
import ReactSpeedometer from "react-d3-speedometer";
var network = require('./networkSim');

function Tester() {

    //we need to pass something in to tell if it should use low values or high values
    //in the case of low values, it simply needs to be 100
    var speed = .5;
    var stab = .3;

    const [value, setValue] = useState([0]);

    //temporary set max value that can be generated
    const [maxValue, setMax] = useState([Math.ceil((1000 * speed + 1000 * speed * stab) / 10) * 10]);
    const [forceRender, changeForce] = useState([false]);
    const changeValue = () => {
        const test = network.getDownloadSpeed(speed, stab);
        console.log("Test value..." + test);
        console.log("maxValue" + maxValue);
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
            setTimeout(() => { changeValue(); }, 200 * i);
        }
    }

    window.onload = function () {
        setTimeout(() => { startTest(); }, 2000);
    }
    return (
        <div className="App" className={"center"}>
            <center>
                <h1> Download Test </h1>
                <ReactSpeedometer value={value}
                    minValue={0}
                    maxValue={maxValue}
                    forceRender={forceRender}
                    currentValueText={'${value}Mbps'}
                    segments={1000}
                    maxSegmentLabels={10}
                    startColor={'#000000'}
                    endColor={'#59b1e3'}
                    needleTransitionDuration={100}
                    textColor={'#ffffff'}
                />
            </center>
        </div>
    );
}

export default Tester