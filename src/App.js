import logo from './logo.svg';
import './App.css';

function App() {

  for(let i = 0; i < 10; i++){
    console.log("Download " + i + " " + getDownloadSpeed())
  }
  for(let i = 0; i < 10; i++){
    console.log("Upload " + i + " " + getUploadSpeed())
  }
  for(let i = 0; i < 10; i++){
    console.log("Ping " + i + " " + getPing())
  }
  for(let i = 0; i < 10; i++){
    console.log("Upload " + i + " " + getJitter())
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// add stability and variable speeds
// first variable is stability and second variable is speed
// stability: 0 low variability - 1 high variability
// speed: 0 being no connection - 1 being very fast
function getDownloadSpeed(stability, speed){
  if (stability === undefined){
    stability = .1
  }
  if(speed === undefined){
    speed = .1
  }

  var startSpeed = 1000

  var min = startSpeed * speed;
  min -= min * stability
  console.log("min: " + min);
  if(min <= 0){
    min = 1;
  }

  var max = startSpeed * speed;
  max += max * stability;
  console.log("max: " + max);

  return Math.floor(Math.random() * (max - min) + min);
}

function getUploadSpeed(stability, speed){
  if (stability === undefined){
    stability = .1
  }
  if(speed === undefined){
    speed = .1
  }

  var startSpeed = 1000

  var min = startSpeed * speed;
  min -= min * stability
  console.log("min: " + min);
  if(min <= 0){
    min = 1;
  }

  var max = startSpeed * speed;
  max += max * stability;
  console.log("max: " + max);

  return Math.floor(Math.random() * (max - min) + min);
}

function getPing(stability, speed){
  if (stability === undefined){
    stability = .3
  }
  if(speed === undefined){
    speed = .2
  }

  var startSpeed = 300

  var min = startSpeed * speed;
  min -= min * stability
  console.log("min: " + min);
  if(min <= 0){
    min = 1;
  }

  var max = startSpeed * speed;
  max += max * stability;
  console.log("max: " + max);

  return Math.floor(Math.random() * (max - min) + min);
}

function getJitter(stability, speed){
  if (stability === undefined){
    stability = .1
  }
  if(speed === undefined){
    speed = .5
  }

  var startSpeed = 60

  var min = startSpeed * speed;
  min -= min * stability
  console.log("min: " + min);
  if(min <= 0){
    min = 1;
  }

  var max = startSpeed * speed;
  max += max * stability;
  console.log("max: " + max);

  return Math.floor(Math.random() * (max - min) + min);
}

export default App;
