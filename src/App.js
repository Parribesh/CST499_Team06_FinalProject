import logo from './logo-big-temp.png';
import './App.css';
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import tester from './tester';
import history from './history';
import map from './map';
import about from './about';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        <div className="App-header-text">
          <b>CalSPEED</b>
          <br></br>
          <b>Network Testing</b>
        </div>
        <div className="App-nav-links">
          <ul>
            <li className="App-nav-links-text"><Link to="/history">History</Link></li>
              <li className="App-nav-links-text"><Link to="/map">Map</Link></li>
                <li className="App-nav-links-text"><Link to ="/about">About</Link></li>
          </ul>
        </div>
      </div>
        <Route path="/history" component={history}></Route>
        <Route path="/map" component={map}></Route>
        <Route path="/about" component={about}></Route>
    </div>
  );
}

export default App;
