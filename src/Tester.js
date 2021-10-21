import './App.css';
import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map } from "./components";
import ReactSpeedometer from "react-d3-speedometer";

function Tester() {

    //we need to pass something in to tell if it should use low values or high values
    //in the case of low values, it simply needs to be 100
    const [value, setValue] = useState([0]);
    const [maxValue, setNewMax] = useState([1000]);
    const changeValue = () => {
        const test = Math.ceil(Math.random() * 1000);
        console.log("Test value..." + test);
        setValue(Number(test))
    }
    const setSlowValues = () => {
        console.log("Testing...");
        if(Number(maxValue) === 1000){
            setNewMax(100);
        }
        else{
            setNewMax(1000);
        }
    }
  return (
      <div className="App">
          <center>
      <ReactSpeedometer value={value}
                        minValue={0}
                        maxValue={maxValue}
                        segments={10}
                        forceRender={true}
      />
          <input type='submit' onClick={changeValue} value='Change Value'/>
              <input type='submit' onClick={setSlowValues} value='Change Ranges'/>
              <label></label>
              </center>
          </div>
  );
}
export default Tester