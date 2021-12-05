import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function About() {
    return (
        <Container>
            <Row>
                <Col><h1 className={'display-2'}>About</h1></Col>
            </Row>
            <Row className={'text-responsive'}>
                <Col>
                    <div className={'my-2'}>
                        CalSPEED, released by the California Public Utilities Commission (CPUC), empowers end-users with a professional-level, industry-standard testing tool to measure the quality and
                        speed of their residential fixed internet connection.
                        CalSPEED conducts a two-step test with a California server and a Virginia server in order to ensure statistically significant measurements.
                    </div>
                    <div className={'my-2'}>
                        The test captures upload speed, download speed, message delay (latency), and message delay variation (jitter). The first two metrics measure broadband throughput, while the second two measure the streaming quality of your mobile broadband connection.
                        Test your upload speed, download speed, message delay (latency), and message delay variation (jitter) using CalSPEED.
                    </div>

                    <div className={'my-2'}>
                        Results are uploaded to a public repository at CPUC to provide you with the ability to compare broadband coverage at your location with other areas in California.
                        The test results may vary based on factors such as location, end-user hardware, network congestion, and time of day.
                    </div>
                    <div className={'my-4'}>
                        The MOS (Mean Opinion Score) classification for a test result is as follows:
                        <ul>
                            <li>Satisfactory: Higher than or equal to 4.0</li>
                            <li>Unsatisfactory: Lower than 4.0</li>
                            <li>N/A: We can't determine the MOS value.</li>
                        </ul>
                    </div>
                    <div className={'my-4'}>
                        Video streaming quality is based on the test result to the California server:
                        <ul>
                            <li>HD (High Definition): Smooth streaming of 720p or above</li>
                            <li>SD (Standard Definition): Smooth streaming between 380p and 720p</li>
                            <li>LD (Lower Definition): Streaming less than 380p</li>
                            <li>N/A: We can't determine the quality.</li>
                        </ul>
                    </div>
                    <div>
                        CalSPEED is developed by California State University, Monterey Bay's Computer Science Program.
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default About;