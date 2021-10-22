import React from "react";
import { withRouter } from "react-router-dom";
import logo from '../logo-big-temp.png';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function Navigation(props) {
    return (
        <Navbar bg="dark" variant={"dark"}>
            <Container>
                <Navbar.Brand href={"/"} style={{fontSize: "45px"}}>
                    <img
                        alt={logo}
                        src={logo}
                        width={100}
                        height={100}
                        className={"d-inline-block align-center rounded"}
                        />{' '}
                        CalSpeed
                </Navbar.Brand>
                <Nav className={"ml-auto"}>
                    <Nav.Item>
                        <Nav.Link href={"/"} style={{fontSize: "25px"}}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={"/map"} style={{fontSize: "25px"}}>Map</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={"/history"} style={{fontSize: "25px"}}>History</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={"/about"} style={{fontSize: "25px"}}>About</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default withRouter(Navigation);