import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map, Testing } from "./components";
import './App.css';
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
  return (

    <div className="App">
        <Router>
            <Navigation />
            <Switch>
                <Route path="/" exact component={() => <Home />} />
                <Route path="/about" exact component={() => <About />} />
                <Route path="/history" exact component={() => <History />} />
                <Route path="/map" exact component={() => <Map />} />
                <Route path={"/testing"} exact component={() => <Testing/>} />
            </Switch>
            <Footer />
        </Router>
    </div>

  );
}

export default App;
