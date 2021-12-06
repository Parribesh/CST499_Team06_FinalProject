import "./App.css";
import React, {useEffect, useRef, useState} from "react";
import FadeIn from "react-fade-in";
import Container from "react-bootstrap/Container";
import PingJitterChart from "./components/PingJitterChart";
import ResultsModalView from "./components/ResultsModalView";

var network = require("./networkSim");

function PingJitterTest() {
  const pingData = useRef([]);
  const jitterData = useRef([]);
  const virginiaPingData = useRef([]);
  const virginiaJitterData = useRef([]);
  const data = useRef([]);
  const virginiaData = useRef([]);
  const isDone = useRef(false);
  const avgDown = useRef(0);
  const avgUp = useRef();
  const avgPing = useRef();
  const avgJitter = useRef();
  const location = useRef([]);
  const [update, forceUpdate] = useState();
  const [currentAvg, updateAvg] = useState(0);
  const [currentStatus, updateStatus] = useState("Current Avg. ")
  const [testType, updateTest] = useState("Ping ");
  const [region, setRegion] = useState("California");
  const [show, setShow] = useState(false);
  //const [location, setLocation] = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let runningTotal = 0;
  let californiaPing = 0;
  let californiaJitter = 0;
  let virginiaPing = 0;
  let virginiaJitter = 0;

  const changeValue = () => {
    const test = network.getPing(0.1, 0.2);
    //use network.getPing(0.1, 0.4) for Virginia
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

  const virginiaChangeValue = () => {
    const test = network.getPing(0.1, 0.2);
    //use network.getPing(0.1, 0.4) for Virginia
    virginiaPingData.current = [...virginiaPingData.current, test];
    data.current = [...virginiaPingData.current];
    runningTotal += test;
    updateAvg(Math.floor(runningTotal/virginiaPingData.current.length));
    console.log(currentAvg);
    //test changes each time changeValue is run
    //this will force a re-render every time data is updated
    forceUpdate(test);
    // console.log(test);
  };

  const jitterChangeValue = () =>{
    const test = network.getJitter(0.1, 0.3);
    //use network.getPing(0.1, 0.6) for Virginia
    jitterData.current = [...jitterData.current, test];
    data.current = [...jitterData.current];
    runningTotal += test;
    updateAvg(Math.floor(runningTotal/jitterData.current.length));
    forceUpdate(test);
  }

  const virginiaJitterChangeValue = () =>{
    const test = network.getJitter(0.1, 0.3);
    //use network.getPing(0.1, 0.6) for Virginia
    virginiaJitterData.current = [...virginiaJitterData.current, test];
    data.current = [...virginiaJitterData.current];
    runningTotal += test;
    updateAvg(Math.floor(runningTotal/virginiaJitterData.current.length));
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
      }, 250 * i);
    }
    setTimeout(()=>{
      californiaPing = Math.floor(runningTotal/pingData.current.length);
      console.log("Cali Ping: " + californiaPing);
    //   if(sessionStorage.getItem('avgPing') != null){
    //     //JSON.parse lets us pull the values out as whatever type
    //     //We store it as an array so it'll always be an array
    //     let currentValues = JSON.parse(sessionStorage.getItem('avgPing'));
    //     currentValues.push(Math.floor(runningTotal/pingData.current.length));
    //     //JSON.stringify spits it back out as a string for sessionStorage
    //     sessionStorage.avgPing = JSON.stringify(currentValues);
    //     //Throw a dummy value into avgUp to make it easier to display results
    //     let old_values = JSON.parse(sessionStorage.getItem('avgJitter'));
    //     old_values.push('');
    //     sessionStorage.avgJitter = JSON.stringify(old_values);
    //
    //   }else{
    //     //Make it an array before you add it to sessionStorage
    //     let currentValues = [];
    //     currentValues.push(Math.floor(runningTotal/pingData.current.length));
    //     sessionStorage.avgPing = JSON.stringify(currentValues);
    //     //We're gonna just throw a dummy value into avgUp as well to make it easier to display results
    //     let dummyValues = [''];
    //     sessionStorage.avgJitter = JSON.stringify(dummyValues);
    //   }
    }, 4200);
  };

  const startJitterTest = () => {
    updateTest("Jitter ");
    for (var i = 0; i< 10; i++){
      setTimeout(() => {
        jitterChangeValue();
      }, 250 * i);
    }
    setTimeout(()=>{
          californiaJitter = Math.floor(runningTotal/jitterData.current.length);
    //   if(JSON.parse(sessionStorage.getItem('avgJitter')).length > 0){
    //     let currentValues =  JSON.parse(sessionStorage.getItem('avgJitter'));
    //     //if(currentValues.get(currentValues.length) === null){
    //     currentValues[currentValues.length - 1] = Math.floor(runningTotal/jitterData.current.length);
    //     //}
    //     //currentValues.push(Math.floor(avgUp/data.current.length));
    //     sessionStorage.avgJitter = JSON.stringify(currentValues);
    //
    //   }else{
    //     let currentValues = [];
    //     currentValues.push(Math.floor(runningTotal/jitterData.current.length));
    //     sessionStorage.avgJitter = JSON.stringify(currentValues);
    //   }
    //   //Get Current Time At End of Test
    //   // if(JSON.parse(sessionStorage.getItem('testCompletionTime')) != null){
    //   //   let currentValues = JSON.parse(sessionStorage.getItem('testCompletionTime'));
    //   //   let currentDate = new Date().toLocaleDateString();
    //   //   let currentTime = new Date().toLocaleTimeString();
    //   //   let completionTime = currentDate + " | " + currentTime;
    //   //   currentValues.push(completionTime);
    //   //   sessionStorage.testCompletionTime = JSON.stringify(currentValues);
    //   // }
    //   // else{
    //   //   let currentValues = [];
    //   //   let currentDate = new Date().toLocaleDateString();
    //   //   let currentTime = new Date().toLocaleTimeString();
    //   //   let completionTime = currentDate + " | " + currentTime;
    //   //   currentValues.push(completionTime);
    //   //   sessionStorage.testCompletionTime = JSON.stringify(currentValues);
    //   // }
    }, 2600);
  }

  const startVirginiaPingTest = () => {
    //data.current.length = 0;
    var pullRate = 30;
    var space = 200;
    setRegion("Virginia");
    updateTest("Ping ");
    for (var i = 0; i < 15; i++) {
      //setTimeout(() => { changeValue(); }, 200 * i);
      setTimeout(() => {
        virginiaChangeValue();
      }, 250 * i);
    }

    setTimeout(()=>{
      virginiaPing = Math.floor(runningTotal/virginiaPingData.current.length);
      console.log("Virg Ping: " + virginiaPing);
      if(sessionStorage.getItem('avgPing') != null){
        //JSON.parse lets us pull the values out as whatever type
        //We store it as an array so it'll always be an array
        let currentValues = JSON.parse(sessionStorage.getItem('avgPing'));
        //average both values
        currentValues.push(Math.floor((californiaPing + virginiaPing)/2));
        //JSON.stringify spits it back out as a string for sessionStorage
        sessionStorage.avgPing = JSON.stringify(currentValues);
        //Throw a dummy value into avgUp to make it easier to display results
        let old_values = JSON.parse(sessionStorage.getItem('avgJitter'));
        old_values.push('');
        sessionStorage.avgJitter = JSON.stringify(old_values);

      }else{
        //Make it an array before you add it to sessionStorage
        let currentValues = [];
        currentValues.push(Math.floor((californiaPing + virginiaPing)/2));
        sessionStorage.avgPing = JSON.stringify(currentValues);
        //We're gonna just throw a dummy value into avgUp as well to make it easier to display results
        let dummyValues = [''];
        sessionStorage.avgJitter = JSON.stringify(dummyValues);
      }
    }, 4200);
  };

  const startVirginiaJitterTest = () => {
    updateTest("Jitter ");
    for (var i = 0; i< 10; i++){
      setTimeout(() => {
        virginiaJitterChangeValue();
      }, 250 * i);
    }

    setTimeout(()=>{
      virginiaJitter = runningTotal/virginiaJitterData.current.length;
      if(JSON.parse(sessionStorage.getItem('avgJitter')).length > 0){
        let currentValues =  JSON.parse(sessionStorage.getItem('avgJitter'));
        //if(currentValues.get(currentValues.length) === null){
        //average the two values
        currentValues[currentValues.length - 1] = Math.floor((californiaJitter+virginiaJitter)/2);
        //}
        //currentValues.push(Math.floor(avgUp/data.current.length));
        sessionStorage.avgJitter = JSON.stringify(currentValues);

      }else{
        let currentValues = [];
        //average the two values
        currentValues.push(Math.floor((californiaJitter+virginiaJitter)/2));
        sessionStorage.avgJitter = JSON.stringify(currentValues);
      }
      //Get Current Time At End of Test
      if(JSON.parse(sessionStorage.getItem('testCompletionTime')) != null){
        let currentValues = JSON.parse(sessionStorage.getItem('testCompletionTime'));
        let currentDate = new Date().toLocaleDateString();
        let currentTime = new Date().toLocaleTimeString();
        let completionTime = currentDate + " | " + currentTime;
        currentValues.push(completionTime);
        sessionStorage.testCompletionTime = JSON.stringify(currentValues);
      }
      else{
        let currentValues = [];
        let currentDate = new Date().toLocaleDateString();
        let currentTime = new Date().toLocaleTimeString();
        let completionTime = currentDate + " | " + currentTime;
        currentValues.push(completionTime);
        sessionStorage.testCompletionTime = JSON.stringify(currentValues);
      }
      // show results modal view
      setTimeout( () => {
        let length = JSON.parse(sessionStorage.getItem('avgDown')).length - 1;
        avgDown.current = JSON.parse(sessionStorage.getItem('avgDown'))[length];
        avgUp.current = JSON.parse(sessionStorage.getItem('avgUp'))[length];
        avgPing.current = JSON.parse(sessionStorage.getItem('avgPing'))[length];
        avgJitter.current = JSON.parse(sessionStorage.getItem('avgJitter'))[length];
        location.current = JSON.parse(sessionStorage.getItem('location'))[length];
        handleShow()
      }, 2000)
    }, 2600);
  }

  window.onload = function(){
    setTimeout(() => {
      startTest();
    }, 1500);
    setTimeout( () => {
      data.current = [];
      isDone.current = true;
      runningTotal = 0;
      updateAvg(0);
      startJitterTest();
    }, 7000)
    setTimeout(() => {
      
      isDone.current = false;
      data.current = [];
      console.log("virginia ping");
      startVirginiaPingTest();
    }, 12000);
    setTimeout( () => {
      data.current = [];
      console.log("virginia jitter");
      isDone.current = true;
      runningTotal = 0;
      updateAvg(0);
      startVirginiaJitterTest();
    }, 18000)
  }

  return (
      <Container className={"center bg-body bg-opacity-25 my-5"} style={{}}>
          <center>
            <FadeIn>
              <div className="jumbotron jumbotron-fluid">
                <div className="container">
                  <h1 className="display-2">{testType} Test</h1>
                  <p className="lead display-6">Current Testing Region: {region}</p>
                  <hr className="my-4"></hr>
                </div>
              </div>
              <PingJitterChart data={data.current} isDone={isDone.current}></PingJitterChart>
              <p className="lead"><h3>Average Speed: {currentAvg} ms</h3></p>
            </FadeIn>
            <ResultsModalView location={location.current} hide={handleClose} show={show} avgDown={avgDown.current} avgUp={avgUp.current} avgPing={avgPing.current} avgJitter={avgJitter.current}/>
          </center>
      </Container>
  );
}
export default PingJitterTest;
