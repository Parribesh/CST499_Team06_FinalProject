import './App.css';
import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map, Testing } from "./components";
import ReactSpeedometer from "react-d3-speedometer";
import Chart from './components/chart.js'
import Tester from './Tester'
import PingJitterTest from "./PingJitterTest";
var network = require('./networkSim');
function App() {

  //examples on how to use it
  //call function whenever you want a value
  for(let i = 0; i < 10; i++){
    console.log("Download " + i + " " + network.getDownloadSpeed())
  }
  for(let i = 0; i < 10; i++){
    console.log("Upload " + i + " " + network.getUploadSpeed())
  }
  for(let i = 0; i < 10; i++){
    console.log("Ping " + i + " " + network.getPing())
  }
  for(let i = 0; i < 10; i++){
    console.log("Upload " + i + " " + network.getJitter())
  }

  const [data, setData] = useState([32]);
  const [value, setValue] = useState([200]);
  const [label, setLabel] = useState([1]);
  const count = useRef(0);
  
  useEffect(() =>{
    count.current = count.current+1;
  })
  const changeData = () => {
    const rand = Math.ceil(Math.random() * 35);
    console.log(rand);
    setData([...data, rand]);
    setLabel([...label, count.current])
  }

  const changeValue = () => {
      const test = Math.ceil(Math.random() * 45);
      console.log("Test value..." + test);
      setValue(Number(test))
  }

  return (

    <div className="App">
        <Router>
            <Navigation />
            <Switch>
                <Route path="/" exact component={() => <Home />} />
                <Route path="/about" exact component={() => <About />} />
                <Route path="/history" exact component={() => <History />} />
                <Route path="/map" exact component={() => <Map />} />
                {/* <Route path={"/testing"} exact component={() => <Testing/>} /> */}
                <Route path="/Tester" component={Tester}/>
                <Route path="/PingJitterTest" component={PingJitterTest}/>
            </Switch>
            <Footer />
        </Router>
    </div>

  );
}

export default App;
