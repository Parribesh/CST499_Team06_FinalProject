import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from '../logo-big-temp.png';
import '../App.css';

function Navigation(props) {
    return (
        <div className="navigation">
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div class="container">

                    <div>
                    <img className="App-logo" alt={logo} src = {logo}/>
                    <Link class="navbar-brand" to="/" style={{fontSize: "45px"}}> CalSpeed </Link>
                    </div>

                    <div>
                        <ul class="navbar-nav ml-auto">
                            <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`} >
                                <Link class="nav-link" to="/" style={{fontSize: "25px"}}> Home </Link>
                            </li>

                            <li className={`nav-item  ${props.location.pathname === "/map" ? "active" : ""}`}>
                                <Link class="nav-link" to="/map" style={{fontSize: "25px"}}> Map </Link>
                            </li>

                            <li class={`nav-item  ${props.location.pathname === "/history" ? "active" : ""}`} >
                                <Link class="nav-link" to="/history" style={{fontSize: "25px"}}> History </Link>
                            </li>

                            <li class={`nav-item  ${props.location.pathname === "/about" ? "active" : ""}`} >
                                <Link class="nav-link" to="/about" style={{fontSize: "25px"}}> About </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );
}

export default withRouter(Navigation);