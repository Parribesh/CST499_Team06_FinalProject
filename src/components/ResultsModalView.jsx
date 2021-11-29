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
    let avgDown = 150;
    let avgUp = 55;
    let avgPing = 24;
    let avgJitter = 3;
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
                                {avgDown + ' Mbps'}
                            </Col>
                            <Col>
                                <h5>Upload</h5>
                                <h1><FaUpload/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgUp !== "N/A") ? avgUp + ' Mbps' : 'N/A'}
                            </Col>
                        </Row>

                        <Row className={'my-4'}>
                            <Col>
                                <h5>Latency</h5>
                                <h1><FaClock/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgPing !== "N/A") ? avgPing + ' ms' : 'N/A'}
                            </Col>
                            <Col>
                                <h5>Jitter</h5>
                                <h1><RiArrowUpDownFill/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgJitter !== "N/A") ? avgJitter + ' ms' : 'N/A'}
                            </Col>
                        </Row>

                        <Row className={'my-4'}>
                            <Col>
                                <h5>Streaming Quality</h5>
                                <h1><FaYoutube/></h1>
                            </Col>
                            <Col className={'my-auto'}>
                                {(avgDown > 5) ? 'HD' : 'SD'}
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