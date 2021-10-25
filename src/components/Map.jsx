import React from "react";
import { GoogleMap, LoadScript} from '@react-google-maps/api';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


const containerStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%'
};

const center = {
    lat: 36.6517,
    lng: -121.7978
};

function Map() {
    return (
        <Container fluid>
            <Row >
                <h1 className={"text-center"}>Map View</h1>
            </Row>
            <Row>
                <Col>
                    <LoadScript googleMapsApiKey="AIzaSyCL3OMy-DFgOqpdR5DljN-JDzx_O7PCz2k">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={7}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                            <></>
                        </GoogleMap>
                    </LoadScript>
                </Col>
                <Col>
                    <Tabs defaultActiveKey="fixedBroadbrand" id="uncontrolled-tab-example" className="mb-0 bg-dark">
                        <Tab eventKey="fixedBroadbrand" title="Fixed Broadband" tabClassName={"text-black bg-light"}>
                            <Table striped bordered hover variant={"dark"}>
                                <thead>
                                <tr>
                                    <th>ISP</th>
                                    <th>Connection Type</th>
                                    <th>Download (mbps)</th>
                                    <th>Upload (mbps)</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>AT&T California</td>
                                    <td>ADSL2, ADSL2+</td>
                                    <td>10-25</td>
                                    <td>.75-1.5</td>

                                </tr>
                                <tr>
                                    <td>AT&T California</td>
                                    <td>Asymmetric xDSL</td>
                                    <td>6-10</td>
                                    <td>.2-.75</td>
                                </tr>
                                <tr>
                                    <td>AT&T California</td>
                                    <td>VDSL</td>
                                    <td>50-100</td>
                                    <td>10-25</td>
                                </tr>
                                <tr>
                                    <td>Comcast</td>
                                    <td>Cable Modem DOCSIS 3.1</td>
                                    <td>100-1000</td>
                                    <td>25-50</td>
                                </tr>

                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="mobileBroadbrand" title="Mobile Broadband" tabClassName={"text-black bg-light"}>
                            <Table striped bordered hover variant={"dark"}>
                                <thead>
                                <tr>
                                    <th>ISP</th>
                                    <th>Connection Type</th>
                                    <th>Download (mbps)</th>
                                    <th>Upload (mbps)</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>AT&T Mobility</td>
                                    <td>HSPA+</td>
                                    <td>1.5-3</td>
                                    <td>.2-.75</td>

                                </tr>
                                <tr>
                                    <td>AT&T Mobility</td>
                                    <td>Asymmetric xDSL</td>
                                    <td>6-10</td>
                                    <td>1.5-3</td>
                                </tr>
                                <tr>
                                    <td>AT&T Mobility</td>
                                    <td>WCDMA/UTMS/HSPA</td>
                                    <td>1.5-3</td>
                                    <td>.2-.75</td>
                                </tr>
                                <tr>
                                    <td>Sprint</td>
                                    <td>EVDO/EVDO Rev A</td>
                                    <td>.2-.75</td>
                                    <td>.2-.75</td>
                                </tr>
                                <tr>
                                    <td>Sprint</td>
                                    <td>LTE</td>
                                    <td>3-6</td>
                                    <td>.75-1.5</td>
                                </tr>
                                <tr>
                                    <td>T-Mobile</td>
                                    <td>GSM</td>
                                    <td>0-.1</td>
                                    <td>0-.1</td>
                                </tr>
                                <tr>
                                    <td>T-Mobile</td>
                                    <td>LTE</td>
                                    <td>6-10</td>
                                    <td>3-6</td>
                                </tr>
                                <tr>
                                    <td>T-Mobile</td>
                                    <td>WCDMA/UTMS/HSPA</td>
                                    <td>0-.1</td>
                                    <td>0-.1</td>
                                </tr>
                                <tr>
                                    <td>Verizon Wireless</td>
                                    <td>CDMA</td>
                                    <td>0-.1</td>
                                    <td>0-.1</td>
                                </tr>
                                <tr>
                                    <td>Verizon Wireless</td>
                                    <td>EVDO/EVDO Rev A</td>
                                    <td>.75-1.5</td>
                                    <td>.2-.75</td>
                                </tr>
                                <tr>
                                    <td>Verizon Wireless</td>
                                    <td>LTE</td>
                                    <td>3-6</td>
                                    <td>1.5-3</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>

                </Col>
            </Row>
        </Container>
    );
}

export default Map;