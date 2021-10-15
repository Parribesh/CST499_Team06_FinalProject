import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map } from "./components";
function App() {
  return (

    <div className="App">
        <Router>
            <Navigation />
            <Switch>
                <Route path="/" exact component={() => <Home />} />
                <Route path="/about" exact component={() => <About />} />
                <Route path="/history" exact component={() => <History />} />
                <Route path="/map" exact component={() => <Map />} />
            </Switch>
            <Footer />
        </Router>
    </div>

  );
}

export default App;
