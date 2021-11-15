import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SiSpeedtest} from "react-icons/all";



function Testing() {
    return (
        <Container>
            <Row className={"center"}>
                <Col>
                    <h1>Testing</h1>
                    <h1><SiSpeedtest/></h1>
                </Col>
            </Row>
        </Container>
    );
}

export default Testing;