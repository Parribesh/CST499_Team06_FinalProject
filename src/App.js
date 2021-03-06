import './App.css';
import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, History, Map, Testing } from "./components";
import './App.css';
import Tester from './Tester'
import PingJitterTest from "./PingJitterTest";
function App() {


  const [data, setData] = useState([32]);
  const [value, setValue] = useState([200]);
  const [label, setLabel] = useState([1]);
  const count = useRef(0);

  useEffect(() =>{
    count.current = count.current+1;
  })
  const changeData = () => {
    const rand = Math.ceil(Math.random() * 35);
    setData([...data, rand]);
    setLabel([...label, count.current])
  }

  const changeValue = () => {
      const test = Math.ceil(Math.random() * 45);
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
                <Route path="/Tester" exact component={() => <Tester />}/>
                <Route path="/PingJitterTest" component={PingJitterTest}/>
            </Switch>
        </Router>
    </div>

  );
}

export default App;
