import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function About() {
    return (
        <Container>
            <Row className={"my-4"}>
                <h1>About</h1>
            </Row>
            <Row>
                <p className={"text-responsive"}>
                    CalSPEED, released by the California Public Utilities Commission (CPUC), empowers end-users with a professional-level, industry-standard testing tool to measure the quality and
                    speed of their residential fixed internet connection.
                <br/>
                    CalSPEED conducts a two-phase test including initial testing and results validation in order to ensure statistically significant measurements.
                <br/>
                    Test your upload speed, download speed, message delay (latency), and message delay variation (jitter) using CalSPEED.
                <br/>
                    The first two metrics measure your Internet usage experience, while the second two measure the voice quality of voice over IP technologies.
                <br/>
                    Results are uploaded to a public repository at CPUC to provide you with the ability to compare broadband coverage at your location with other areas in California.
                </p>
            </Row>
        </Container>
    );
}

export default About;