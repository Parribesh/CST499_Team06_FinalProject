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
function getDownloadSpeed(){
  // type of network | 0 being no speed , 3 being fastest speed
  // var networkType = Math.floor(Math.random() * 4)

  var min = 95;
  var max = 120;

  //add change parameters depending on networkType


  return Math.floor(Math.random() * (max - min) + min);
}

function getUploadSpeed(){
  // type of network | 0 being no speed , 3 being fastest speed
  // var networkType = Math.floor(Math.random() * 4)

  var min = 5;
  var max = 20;

  //add change parameters depending on networkType


  return Math.floor(Math.random() * (max - min) + min);
}

function getPing(){
  // type of network | 0 being no speed , 3 being fastest speed
  // var networkType = Math.floor(Math.random() * 4)

  var min = 10;
  var max = 15;

  //add change parameters depending on networkType


  return Math.floor(Math.random() * (max - min) + min);
}

function getJitter(){
  // type of network | 0 being no speed , 3 being fastest speed
  // var networkType = Math.floor(Math.random() * 4)

  var min = 0;
  var max = 5;

  //add change parameters depending on networkType


  return Math.floor(Math.random() * (max - min) + min);
}

export default App;
