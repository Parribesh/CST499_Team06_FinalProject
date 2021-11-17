import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from './Footer'

function Home() {

    return (
        <Container>
            <a href={"./Tester"} className={"center"}>
                <button className={"button"}>
                    Start Test
                </button>
            </a>
            <Footer/>
        </Container>
    );
}

export default Home;