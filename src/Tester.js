import "./App.css";
import React, { useState, useRef } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Container from "react-bootstrap/Container";
import FadeIn from "react-fade-in";
import { Redirect } from "react-router-dom";

import Chart from "./components/chart";
import Geocode from "react-geocode";
var network = require("./networkSim");

function Tester() {
  //TODO: clean up code
  //we need to pass something in to tell if it should use low values or high values
  //in the case of low values, it simply needs to be 100
  var speed = 0.5;
  var stab = 0.3;

  const [testName, setName] = useState("Download Test"); //Text variable to display test type
  const [value, setValue] = useState([0]); //Value being displayed on speedometer
  const calDataDown = useRef([]); //Array for California Download Values
  const calDataUp = useRef([]); //Array for California Upload Values
  const virgDataDown = useRef([]); //Array for Virginia Download Values
  const virgDataUp = useRef([]); //Array for Virginia Upload Values
  const data = useRef([]); //Data array the is displayed in the graph
  const testNum = useRef(0); //Counter variable to keep track of current test number in progress
  const isDone = useRef(false); //No longer used. Was originally setup to tell the graph that the download test was completed and Upload test needs to start
  const [startColor, setStartColor] = useState("#000000"); //Set initial colors of the speedometer
  const [endColor, setEndColor] = useState("#59b1e3"); //Set initial color of speedometer
  //temporary set max value that can be generated
  //const [maxValue, setMax] = useState([Math.ceil((1000 * speed + 1000 * speed * stab) / 10) * 10]);
  const [maxValue, setMax] = useState(150); //Max value of speedometer
  const [forceRender, changeForce] = useState([false]); //Force speedometer rerender
  const [regionName, setRegion] = useState("California"); //Testing Server Region displayed at top of page
  const region = useRef("California"); //Using this variable to know when region has changed since it updates faster than a state change.
  const [clearGraph, setClearGraph] = useState(false); //Clear the graph data
  const [testType, setTestType] = useState("download"); //Current test type (Download, Upload, Ping, Jitter)
  var avgDownCal = 0; //Var to store sum of all California Download Values for one complete test
  var avgUpCal = 0; //Var to store sum of all Upload Download Values for one complete test

  var avgDownVirg = 0; //Var to store sum of all Virginia Download Values for one complete test
  var avgUpVirg = 0; //Var to store sum of all Virgina Upload Values for one complete test

  const [location, setLocation] = useState({
    // Stores a location object which contains users coordinates and current address.
    loaded: false,
    coordinates: { lat: "", lng: "" },
    address: "N/A",
  });

  const [show, setShow] = useState(false); //Show or hide Modal view

  const handleClose = () => setShow(false); //Hides modal view when called
  const handleShow = () => setShow(true); //Shows modal view when called

  //Get a new download value and rerender speedometer
  const changeValue = () => {
    const test = network.getDownloadSpeed(speed, stab); //Single Download speed value

    // If the value generated is larger than the maxValue in the speedometer, then increase the maxValue displayed in speedometer
    if (test > maxValue) {
      changeForce(true); //Force the rerender of speedometer
      setMax(Math.ceil(test / 10) * 10);
    }
    changeForce(false);
    setValue(test); //Display Download value in speedometer

    //If current testing region is California, then save the generated download value to the California array
    if (region.current === "California") {
      calDataDown.current = [...calDataDown.current, test];
      data.current = [...calDataDown.current];
      avgDownCal += test;
    }
    //If current testing region is Virginia, then save the generated download value to the Virginia array
    if (region.current === "Virginia") {
      virgDataDown.current = [...virgDataDown.current, test];
      data.current = [...virgDataDown.current];
      avgDownVirg += test;
    }
  };

  //Get a new upload value and rerender speedometer
  const changeUploadValue = () => {
    const test = network.getUploadSpeed(speed, stab); //Single Upload speed value

    // If the value generated is larger than the maxValue in the speedometer, then increase the maxValue displayed in speedometer
    if (test > maxValue) {
      changeForce(true); //Force the rerender of speedometer
      setMax(Math.ceil(test / 10) * 10);
    }
    changeForce(false);
    setValue(test); //Display Upload value in speedometer

    //If current testing region is California, then save the generated upload value to the California array
    if (region.current === "California") {
      calDataUp.current = [...calDataUp.current, test];
      data.current = [...calDataUp.current];
      console.log("updatingCalUpload");
      avgUpCal += test;
    }
    //If current testing region is Virginia, then save the generated upload value to the Virginia array
    if (region.current === "Virginia") {
      virgDataUp.current = [...virgDataUp.current, test];
      data.current = [...virgDataUp.current];
      console.log("updatingVirgUpload");
      avgUpVirg += test;
      console.log(avgUpVirg);
    }
  };

  // Function to start the download test
  const startDownloadTest = () => {
    setClearGraph(true); //Clear the graph
    setTestType("download"); //Set test type to download
    setName("Download Test"); //Update test text on top of page
    setStartColor("#000000"); //Set Speedometer start color for Download test
    setEndColor("#59b1e3"); //Set Speedometer end color for Download test
    changeForce(true); //Force a rerender to speedometer after color change
    setClearGraph(false); //stop the clear graph

    //Loop 50 times to generate 50 download speed values. Each value is generated every 250 milliseconds(quarter of a second)
    for (var i = 0; i < 50; i++) {
      setTimeout(() => {
        changeValue();
      }, 250 * i);
    }
  };

  //Function to start the upload test
  const startUploadTest = () => {
    setClearGraph(true); //Clear the graph
    setValue(0); //Set speedometer value back to 0
    setTestType("upload"); //Set test type to upload
    setName("Upload Test"); //Update test text on top of page
    setStartColor("#103319"); //Set Speedometer start color for Upload test
    setEndColor("#15d445"); //Set Speedometer end color for Upload test
    changeForce(true); //Force a rerender to speedometer after color change
    setClearGraph(false); //Stop the clear graph

    //Loop 50 times to generate 50 upload speed values. Each value is generated every 250 milliseconds(quarter of a second)
    for (var i = 0; i < 50; i++) {
      setTimeout(() => {
        changeUploadValue();
      }, 250 * i);
    }

    setTimeout(() => {
      // If current test number = 4 , then we are done testing and we save our test results to sessionStorage. Also show the results modal view. Else We start the Virginia Tests
      if (testNum.current > 3) {
        setValue(0);
        //Check if the session item is empty
        if (sessionStorage.getItem("avgDown") != null) {
          //JSON.parse lets us pull the values out as whatever type
          //We store it as an array so it'll always be an array
          let currentValues = JSON.parse(sessionStorage.getItem("avgDown"));
          currentValues.push(
            Math.floor(
              avgDownCal / calDataDown.current.length +
                avgDownVirg / virgDataDown.current.length
            ) / 2
          );
          //JSON.stringify spits it back out as a string for sessionStorage
          sessionStorage.avgDown = JSON.stringify(currentValues);
          //Throw a dummy value into avgUp to make it easier to display results
          let old_values = JSON.parse(sessionStorage.getItem("avgUp"));
          old_values.push("");
          sessionStorage.avgUp = JSON.stringify(old_values);
        } else {
          //Make it an array before you add it to sessionStorage
          let currentValues = [];
          currentValues.push(
            Math.floor(
              (avgDownCal / calDataDown.current.length +
                avgDownVirg / virgDataDown.current.length) /
                2
            )
          );
          sessionStorage.avgDown = JSON.stringify(currentValues);
          //We're gonna just throw a dummy value into avgUp as well to make it easier to display results
          let dummyValues = [""];
          sessionStorage.avgUp = JSON.stringify(dummyValues);
        }
        //Check if the key 'avgUp' already exists in sessionStorage. If so retrieve current data and append to it.
        if (JSON.parse(sessionStorage.getItem("avgUp")).length > 0) {
          let currentValues = JSON.parse(sessionStorage.getItem("avgUp"));
          //Taking avg of both California and Virginia Upload Test Values
          currentValues[currentValues.length - 1] = Math.floor(
            (avgUpCal / calDataUp.current.length +
              avgUpVirg / virgDataUp.current.length) /
              2
          );
          sessionStorage.avgUp = JSON.stringify(currentValues); //Store value in sessionStorage
        } else {
          // Else key does not exist yet. So make a new array append value and save to sessionStorage
          let currentValues = [];
          //Taking avg of both California and Virginia Upload Test Values
          currentValues.push(
            Math.floor(
              (avgUpCal / calDataUp.current.length +
                avgUpVirg / virgDataUp.current.length) /
                2
            )
          );
          sessionStorage.avgUp = JSON.stringify(currentValues); //Store value in sessionStorage
        }
        // Show results Modal View
        handleShow();
      } else {
        // Test num is less than or equal to 3 so continue to Virgina tests
        setRegion("Virginia"); //Set displayed region to virginia
        region.current = "Virginia"; //update this variable as well since it updates faster than the set state above
        console.log("Region set to: " + region.current); //Verify our current region
        setClearGraph(true); //clear the graph before starting virginia tests
        setClearGraph(false); //End clear graph
        startTesting(); //Start tests again, but this time for Virginia servers
      }
    }, 13000); // 13 seconds timer
  };

  //Function to start both Dowload and Upload Tests
  const startTesting = () => {
    // Not the cleanest way of handling this but because our test are running on a timer anyway
    // we can just specify the delay amount so that tests happen one after another
    // otherwise they overlap -- Chris

    setTimeout(() => {
      testNum.current++; //Increase testNum counter
      data.current = []; //Clear data array being sent to graph
      startDownloadTest(); //Start download test
    }, 1500); //1.5 second timer
    // TODO: better transition to upload test

    setTimeout(() => {
      //isDone.current = true; //No longer used.
      testNum.current++; //Increase testNum counter
      setClearGraph(true); //Clear the graph
      setClearGraph(false); //end graph clear
      sessionStorage.dataDown = JSON.stringify(data.current); //set download data array to the session
      data.current = []; //clear data array being sent to graph
      startUploadTest(); //Start upload test
    }, 14000); //14 second timer
    // TODO: Local vs Distance speed, Jitter, ping tests
    setTimeout(() => {
      sessionStorage.dataUp = JSON.stringify(data.current);
    }, 57100);

    setTimeout(() => {
      window.location.href = "/PingJitterTest";
    }, 60000);
  };

  // Function called when window initially loads
  window.onload = function () {
    // called on success of retrieving coordinates.
    var geoSuccess = (location) => {
      //location object returned holds latitude and longitude. Use those values to call getAddress which will use the coordinates with google API to get the actual address.
      getAddress(location.coords.latitude, location.coords.longitude);
      startTesting(); //Start testing.
    };

    // Function called when there is an error retrieving coordinates from geolocation.
    var geoError = function (error) {
      console.log("Error occurred. Error code: " + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out

      //Store N/A location to sessionStorage since coordinates failed to be retrieved
      if (JSON.parse(sessionStorage.getItem("location")) != null) {
        let currentValues = JSON.parse(sessionStorage.getItem("location"));
        currentValues.push("N/A");
        sessionStorage.setItem("location", JSON.stringify(currentValues));
      } else {
        let currentValues = [];
        currentValues.push("N/A");
        sessionStorage.setItem("location", JSON.stringify(currentValues));
      }
      startTesting(); //Start test anyways, but we don't have actual coordinates or address. Address will stay default value of 'N/A' and coordinates will be blank ("", "").
    };

    // Try to get geolocation (latitude and longitude) if location services are enabled. Browser will prompt user
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  };

  //Function to get address from google api. We need to latitude and longitude as input parameters. This function does not return immediately since it call the API.
  //Need to wait for a response or an error
  function getAddress(lat, lng) {
    // Get address from latitude & longitude.
    Geocode.fromLatLng(
      lat,
      lng,
      "AIzaSyCL3OMy-DFgOqpdR5DljN-JDzx_O7PCz2k"
    ).then(
      (response) => {
        const address = response.results[0].formatted_address; // full address return in the response

        let city, state, zip, country; // variables to hold the individual address data

        //loop though address components and save city, state, zip, country
        for (
          var i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
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
        let shortAddress = city + ", " + state + ", " + zip; // store only city, state, zip in new variable called shortAdrress
        console.log(address);

        //We successfully got a location from function response to set the new location.
        setLocation({
          loaded: true,
          coordinates: {
            lat: lat,
            lng: lng,
          },
          address: shortAddress, // address we received in response
        });

        //Store this location to sessionStorage
        if (JSON.parse(sessionStorage.getItem("location")) != null) {
          let currentValues = JSON.parse(sessionStorage.getItem("location"));
          currentValues.push(shortAddress);
          sessionStorage.setItem("location", JSON.stringify(currentValues));
        } else {
          let currentValues = [];
          currentValues.push(shortAddress);
          sessionStorage.setItem("location", JSON.stringify(currentValues));
        }
      },

      (error) => {
        console.error(error);
        //Set only latitude and longitude to location if we get error trying to get address
        setLocation({
          loaded: true,
          coordinates: {
            lat: lat,
            lng: lng,
          },
          address: "N/A",
        });

        //Save location to sessionStorage
        if (sessionStorage.getItem("location") != null) {
          var currentValues = [];
          currentValues.push(sessionStorage.getItem("location"));
          currentValues.push(location.address);
          sessionStorage.setItem("location", currentValues);
        } else {
          // Save location
          let currentValues = [];
          currentValues.push(location.address);
          sessionStorage.setItem("location", currentValues);
        }
      }
    );
  }

  return (
    <Container className={"bg-body bg-opacity-25 my-5"} style={{}}>
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
            // isDone={isDone.current}
            isHistory={false}
            clear={clearGraph}
            testType={testType}
          />
        </FadeIn>
      </center>
    </Container>
  );
}

export default Tester;
