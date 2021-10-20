import './App.css';
import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map } from "./components";
import Chart from './components/chart.js'

function App() {

  const [data, setData] = useState([32]);
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
            <Chart data = {data} label = {label}/>
            <input type='submit' onClick = {changeData}/>
            <Footer />
        </Router>
    </div>

  );
}

export default App;
