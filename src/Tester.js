import "./App.css";
import React, { useState, useRef } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FadeIn from "react-fade-in";
import {Redirect} from "react-router-dom";

import Chart from "./components/chart";
import ResultsModalView from "./components/ResultsModalView"
import { Button, FormLabel } from "react-bootstrap";
import Geocode from "react-geocode";
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

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    address: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeValue = () => {
    console.log(regionName);
    let test = network.getDownloadSpeed(speed, stab);
    // else{
    //   console.log("Virginia")
    //   test = network.getDownloadSpeed(0.1, stab);
    // }
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
    //console.log(data.current);
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
      if (sessionStorage.getItem("avgDown") != null) {
        //JSON.parse lets us pull the values out as whatever type
        //We store it as an array so it'll always be an array
        let currentValues = JSON.parse(sessionStorage.getItem("avgDown"));
        currentValues.push(Math.floor(avgDown / data.current.length));
        //JSON.stringify spits it back out as a string for sessionStorage
        sessionStorage.avgDown = JSON.stringify(currentValues);
        //Throw a dummy value into avgUp to make it easier to display results
        let old_values = JSON.parse(sessionStorage.getItem("avgUp"));
        old_values.push("");
        sessionStorage.avgUp = JSON.stringify(old_values);
      } else {
        //Make it an array before you add it to sessionStorage
        let currentValues = [];
        currentValues.push(Math.floor(avgDown / data.current.length));
        sessionStorage.avgDown = JSON.stringify(currentValues);
        //We're gonna just throw a dummy value into avgUp as well to make it easier to display results
        let dummyValues = [""];
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
    //re-initialized data.current to empty array.
    sessionStorage.dataDown = JSON.stringify(data.current);
    data.current = [];
    setEndColor("#15d445");
    let space = 500;
    for (var i = 0; i < 50; i++) {
      setTimeout(() => {
        changeUploadValue();
      }, space * i);
    }
    sessionStorage.dataUp = JSON.stringify(data.current);
    //reset to 0
    setTimeout(() => {
      setValue(0);
      if (JSON.parse(sessionStorage.getItem("avgUp")).length > 0) {
        let currentValues = JSON.parse(sessionStorage.getItem("avgUp"));
        //if(currentValues.get(currentValues.length) === null){
        currentValues[currentValues.length - 1] = Math.floor(avgUp / data.current.length);
        //}
        //currentValues.push(Math.floor(avgUp/data.current.length));
        sessionStorage.avgUp = JSON.stringify(currentValues);
      } else {
        let currentValues = [];
        currentValues.push(Math.floor(avgUp / data.current.length));
        sessionStorage.avgUp = JSON.stringify(currentValues);
      }

      // // show results modal view
      // setTimeout( () => {
      //   handleShow()
      // }, 2000);

    }, 25500);
  };

  const startTesting = () => {
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

    setTimeout(() => {
      window.location.href = "/PingJitterTest"
    }, 65000)
  };

  window.onload = function () {

    var geoSuccess = (location) => {
      getAddress(location.coords.latitude, location.coords.longitude);
      startTesting()
    };

    var geoError = function(error) {
      console.log('Error occurred. Error code: ' + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
      startTesting()
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  };

  function getAddress(lat, lng)  {
    // Get address from latitude & longitude.
    Geocode.fromLatLng(lat, lng, 'AIzaSyCL3OMy-DFgOqpdR5DljN-JDzx_O7PCz2k').then(
        (response) => {
          const address = response.results[0].formatted_address;

          let city, state, zip, country;

          for(var i=0; i < response.results[0].address_components.length; i++) {
            var component = response.results[0].address_components[i];
            switch (component.types[0]) {

              case "locality":
                city = component.long_name;
                break;
              case "administrative_area_level_1":
                state = component.long_name;
                break;
              case "postal_code":
                zip = component.long_name;
                break;
              case "country":
                country = component.long_name;
                break;

            }
          }

          console.log(city + ", " + state + ", " + zip);
          let shortAddress = city + ", " + state + ", " + zip;
          console.log(address);

          setLocation({
            loaded: true,
            coordinates: {
              lat: lat,
              lng: lng,
            },
            address: shortAddress,
          });

          if(JSON.parse(sessionStorage.getItem('location')) != null){
            let currentValues =  JSON.parse(sessionStorage.getItem('location'));
            currentValues.push(shortAddress);
            sessionStorage.setItem('location', JSON.stringify(currentValues));

          }else{
            let currentValues = [];
            currentValues.push(shortAddress);
            sessionStorage.setItem('location', JSON.stringify(currentValues));
          }

          // if (sessionStorage.getItem('location') != null) {
          //   var currentValues = [];
          //   currentValues.push(sessionStorage.getItem('location'));
          //   currentValues.push(shortAddress);
          //   sessionStorage.setItem('location', currentValues);
          //
          // } else {
          //   // Save location
          //   let currentValues = [];
          //   currentValues.push(shortAddress);
          //   sessionStorage.setItem('location', currentValues);
          // }
        },
        (error) => {
          console.error(error);
          setLocation({
            loaded: true,
            coordinates: {
              lat: lat,
              lng: lng,
            },
            address: "N/A",
          });

          if (sessionStorage.getItem('location') != null) {
            var currentValues = [];
            currentValues.push(sessionStorage.getItem('location'));
            currentValues.push(location.address);
            sessionStorage.setItem('location', currentValues);

          } else {
            // Save location
            let currentValues = [];
            currentValues.push(location.address);
            sessionStorage.setItem('location', currentValues);
          }
        }
    );
  }

  return (
      <Container className={'bg-body bg-opacity-25 my-5'} style={{}}>
          <center>
            <FadeIn>
              <div className="jumbotron jumbotron-fluid">
                <div className="container">
                  <h1 className="display-1">{testName}</h1>
                  <p className="display-6">Current Testing Region: {regionName}</p>
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
      </Container>


  );
}

export default Tester;
