import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import React from "react";


const mobileConnectionTypes = ['HSPA+', 'Asymmetric xDSL', 'WCDMA/UTMS/HSPA', 'EVDO/EVDO Rev A', 'LTE', 'GSM', 'LTE', 'WCDMA/UTMS/HSPA', 'CDMA', 'EVDO/EVDO Rev A', 'LTE'];
const mobileISPList = ['AT&T Mobility', 'AT&T Mobility', 'AT&T Mobility', 'Sprint', 'Sprint', 'T-Mobile', "T-Mobile", "T-Mobile", 'Verizon Wireless', 'Verizon Wireless', 'Verizon Wireless'];
const ispList = ['AT&T California', 'AT&T California', 'AT&T California', 'Comcast'];
const connectionTypes = ['ADSL2,ADSL2+', 'Asymmetric xDSL', 'VDSL', 'Cable Modem DOCSIS 3.1'];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function generateFixedBroadbandValues(isp, index) {
    return (
        <tr key={index}>
            <td>{isp}</td>
            <td>{connectionTypes[index]}</td>
            <td>{getRandomInt(10,20).toFixed(1)} - {getRandomInt(50,100).toFixed(1)}</td>
            <td>{getRandomInt(0,10).toFixed(1)} - {getRandomInt(10,15).toFixed(1)}</td>
        </tr>
    );
}

function generateMobileBroadbandValues(isp, index) {
    return (
        <tr key={index}>
            <td>{isp}</td>
            <td>{mobileConnectionTypes[index]}</td>
            <td>{getRandomInt(5,20).toFixed(1)} - {getRandomInt(30,50).toFixed(1)}</td>
            <td>{getRandomInt(0,5).toFixed(1)} - {getRandomInt(7,13).toFixed(1)}</td>
        </tr>
    );
}

function MapModalView(props) {

    if (props.type === 'comparisons') {

        window.onload = function () {
            generateMobileBroadbandValues();
            generateFixedBroadbandValues();
        };

        return (
            <>
                <Modal
                    show={props.show}
                    onHide={props.hide}
                    size={'xl'}
                    animation={true}
                    centered={true}
                    className={'resultsmodal'}
                >
                    <Modal.Header className={'text-center d-block'}>
                        <Modal.Title className={'d-inline-block'}><h1>ISP Comparisons</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={'modalBody'}>
                        <Container>
                            <Row>
                                <Col>
                                    <Tabs defaultActiveKey="mobileBroadbrand" className="bg-light">
                                        <Tab eventKey="mobileBroadbrand" title="Mobile Broadband" >
                                            <Table striped bordered hover>
                                                <thead>
                                                <tr>
                                                    <th>ISP</th>
                                                    <th>Connection Type</th>
                                                    <th>Download (mbps)</th>
                                                    <th>Upload (mbps)</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {mobileISPList.map(generateMobileBroadbandValues)}
                                                </tbody>
                                            </Table>
                                        </Tab>
                                        <Tab eventKey="fixedBroadbrand" title="Fixed Broadband">
                                            <Table striped bordered hover variant={"light"}>
                                                <thead>
                                                <tr>
                                                    <th>ISP</th>
                                                    <th>Connection Type</th>
                                                    <th>Download (mbps)</th>
                                                    <th>Upload (mbps)</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {ispList.map(generateFixedBroadbandValues)}
                                                </tbody>
                                            </Table>
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.hide}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else {
        return (
            <>
                <Modal
                    show={props.show}
                    onHide={props.hide}
                    size={'lg'}
                    animation={true}
                    centered={true}
                    className={'resultsmodal'}
                >
                    <Modal.Header className={'text-center d-block'} >
                        <Modal.Title className={'d-inline-block'}><h1>Map View</h1></Modal.Title>

                    </Modal.Header>
                    <Modal.Body className={'modalBody'}>
                        <Container>
                            <Row className={'my-4'}>
                                <Col>
                                    <h5 className={'py-2'}>1. Click on a location on the map or type an address into the search bar</h5>
                                    <h5 className={'py-2'}>2. Click on the address marker that appears on the map</h5>
                                    <h5 className={'py-2'}>3. View Download and Upload speeds of different ISPs</h5>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.hide}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

export default MapModalView;