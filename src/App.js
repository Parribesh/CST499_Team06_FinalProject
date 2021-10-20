import logo from './logo.svg';
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



export default App;
