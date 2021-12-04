import {FaDownload, FaUpload, FaYoutube, FaChartBar, FaClock, RiArrowUpDownFill} from "react-icons/all";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ResultsModalView(props) {

    const displayLocation = () => {
        if (props.location.address === "") {
            return "Location Not Available. Please Make Sure Location is Enabled."
        } else {
            return props.location.address
        }
    }

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
                    <Button onClick={props.hide}>Close</Button>
                </Modal.Header>
                <Modal.Body className={'modalBody'}>
                    <Container>
                        <Row className={'my-4'}>
                            <Col>
                                <h5>Download</h5>
                                <h1><FaDownload/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                200 mbps
                            </Col>
                            <Col>
                                <h5>Upload</h5>
                                <h1><FaUpload/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                100 mbps
                            </Col>
                        </Row>

                        <Row className={'my-4'}>
                            <Col>
                                <h5>Latency</h5>
                                <h1><FaClock/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                20 ms
                            </Col>
                            <Col>
                                <h5>Jitter</h5>
                                <h1><RiArrowUpDownFill/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                2 ms
                            </Col>
                        </Row>

                        <Row className={'my-4'}>
                            <Col>
                                <h5>Streaming Quality</h5>
                                <h1><FaYoutube/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                HD
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
                            <Col>
                                <div style={{textAlign: 'left'}}><h5>Location: {displayLocation()}</h5></div>
                            </Col>
                        </Row>
                    </Container>


                </Modal.Footer>
            </Modal>
        </>
    );

}

export default ResultsModalView;