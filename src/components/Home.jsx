import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {

    return (
        <Container>
            <a href={"./Testing"} className={"center"}>
                <button className={"button"}>
                    Start Test
                </button>
            </a>
        </Container>
    );
}

export default Home;