import {FaDownload, FaUpload, FaYoutube, FaChartBar, FaClock, RiArrowUpDownFill, RiHistoryFill} from "react-icons/all";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, {useRef} from "react";

function ResultsModalView(props) {
    const avgDown = useRef(0);
    // const avgDown = props.avgDown;
    const avgUp = useRef(0);
    // const avgUp = props.avgUp;
    const avgPing = useRef(0);
    // const avgPing = props.avgPing;
    const avgJitter = useRef(0);
    // const avgJitter = props.avgJitter;
    const location = useRef([]);
    // const displayLocation = () => {
    //     // if (props.location.length === 0) {
    //     //     return "Location Not Available. Please Make Sure Location is Enabled."
    //     // } else {
    //     //     return props.location[0]
    //     // }
    //     console.log(props.location);
    // }
    avgDown.current = props.avgDown;
    avgUp.current = props.avgUp;
    avgPing.current = props.avgPing;
    avgJitter.current = props.avgJitter;
    location.current = [...props.location]
    // let avgDown = 150;
    // let avgUp = 55;
    // let avgPing = 24;
    // let avgJitter = 3;
    // let currentEntrySize = JSON.parse(sessionStorage.getItem('avgDown')).length;
    // let avgDown = JSON.parse(sessionStorage.getItem('avgDown'))[currentEntrySize];
    // let avgUp = JSON.parse(sessionStorage.getItem('avgUp'))[currentEntrySize];
    //   if (avgUp === undefined || avgUp === ''){
    //       avgUp = "N/A"
    //   }
    // let avgJitter = JSON.parse(sessionStorage.getItem('avgJitter'))[currentEntrySize];
    //   if (avgJitter === undefined || avgJitter === ''){
    //       avgJitter = "N/A"
    //   }
    // let avgPing = JSON.parse(sessionStorage.getItem('avgPing'))[currentEntrySize];
    //   if (avgPing === undefined || avgPing === ''){
    //       avgPing = "N/A"
    //   }

    return (
        <>
            <Modal
                show={props.show}
                backdrop={'static'}
                size={'lg'}
                animation={true}
                centered={true}
                className={'resultsmodal'}
            >
                <Modal.Header>
                    <Modal.Title><h1>Results</h1></Modal.Title>
                    <Button onClick={props.hide} variant={'secondary'}>Close</Button>
                </Modal.Header>
                <Modal.Body className={'modalBody'}>
                    <Container>
                        <Row className={'my-4'}>
                            <Col>
                                <h5>Download</h5>
                                <h1><FaDownload/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {avgDown.current + ' Mbps'}
                            </Col>
                            <Col>
                                <h5>Upload</h5>
                                <h1><FaUpload/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgUp.current !== "N/A") ? avgUp.current + ' Mbps' : 'N/A'}
                            </Col>
                        </Row>

                        <Row className={'my-4'}>
                            <Col>
                                <h5>Latency</h5>
                                <h1><FaClock/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgPing.current !== "N/A") ? avgPing.current + ' ms' : 'N/A'}
                            </Col>
                            <Col>
                                <h5>Jitter</h5>
                                <h1><RiArrowUpDownFill/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgJitter.current !== "N/A") ? avgJitter.current + ' ms' : 'N/A'}
                            </Col>
                        </Row>

                        <Row className={'my-4'}>
                            <Col>
                                <h5>Streaming Quality</h5>
                                <h1><FaYoutube/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgDown.current > 5) ? 'HD' : 'SD'}
                            </Col>
                            <Col>
                                <h5>MOS</h5>
                                <h1><FaChartBar/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                Satisfactory
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col className={'my-auto'}>
                                <div style={{textAlign: 'left'}}><h5>Location: {location.current}</h5></div>
                            </Col>
                            <Col className={'my-auto'}>
                                <div style={{textAlign: 'right'} }><Button href={"/history"} style={{fontSize: "20px", verticalAlign:"middle"}}><RiHistoryFill/>View History</Button></div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default ResultsModalView;