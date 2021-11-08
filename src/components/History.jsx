
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function History() {
    return (
        <Container>
            <Row className={"justify-content-center"}>
                <h1 className={"text-center"}>GRAPH</h1>
            </Row>
            <Row>
                <Table striped bordered hover variant={"dark"}>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Download (mbps)</th>
                        <th>Upload (mbps)</th>
                        <th>Jitter (ms)</th>
                        <th>Latency (ms)</th>
                        <th>Video Streaming Quality</th>
                        <th>MOS (Mean Opinion Score)</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Sep 29, 2021</td>
                        <td>Salinas, 93906</td>
                        <td>31.43</td>
                        <td>5.76</td>
                        <td>7.14</td>
                        <td>67.54</td>
                        <td>HD</td>
                        <td>Satisfactory</td>

                    </tr>
                    <tr>
                        <td>Sep 29, 2021</td>
                        <td>Salinas, 93906</td>
                        <td>31.49</td>
                        <td>6.62</td>
                        <td>4.29</td>
                        <td>52.69</td>
                        <td>HD</td>
                        <td>Satisfactory</td>
                    </tr>
                    <tr>
                        <td>Sep 29, 2021</td>
                        <td>Salinas, 93906</td>
                        <td>28.47</td>
                        <td>4.51</td>
                        <td>3.24</td>
                        <td>50.80</td>
                        <td>HD</td>
                        <td>Satisfactory</td>
                    </tr>
                    <tr>
                        <td>Sep 29, 2021</td>
                        <td>Salinas, 93906</td>
                        <td>28.72</td>
                        <td>5.14</td>
                        <td>4.19</td>
                        <td>49.87</td>
                        <td>HD</td>
                        <td>Satisfactory</td>
                    </tr>

                    </tbody>
                </Table>
            </Row>

        </Container>
    );
}

export default History;