import React, {useEffect, useState} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import Geocode from "react-geocode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MapSearchBar from './MapSearchBar';
import MapModalView from "./MapModalView";
import ResultsModalView from "./ResultsModalView";


const mapContainerStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%'
};

const center = {
    lat: 36.6517,
    lng: -121.7978
};

const libraries = ["places"]
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}


function Map() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getAddress(lat, lng)  {
        // Get address from latitude & longitude.
        Geocode.fromLatLng(lat, lng, 'AIzaSyCL3OMy-DFgOqpdR5DljN-JDzx_O7PCz2k').then(
            (response) => {
                const address = response.results[0].formatted_address;

                let city, state, zip, country;

                for(var i=0; i < response.results[0].address_components.length; i++) {
                    var component = response.results[0].address_components[i];
                    switch (component.types[0]) {

                        case "locality":
                            city = component.long_name;
                            break;
                        case "administrative_area_level_1":
                            state = component.long_name;
                            break;
                        case "postal_code":
                            zip = component.long_name;
                            break;
                        case "country":
                            country = component.long_name;
                            break;
                    }
                }

                console.log(city + ", " + state + ", " + zip);
                let shortAddress = city + ", " + state + ", " + zip;
                console.log(address);

                setMarkers(current => [
                    {
                        lat: lat,
                        lng: lng,
                        address: shortAddress,
                        time: new Date()
                    },
                ]);

            },
            (error) => {
                console.error(error);
            }
        );
    }


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyCL3OMy-DFgOqpdR5DljN-JDzx_O7PCz2k",
        libraries,

    });

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event) => {
        getAddress(event.latLng.lat(), event.latLng.lng())
    }, []);

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback((lat, lng) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(11);
        getAddress(lat, lng)
    }, []);


    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    window.onload = function () {

        handleShow()

        var startPos;

        var geoSuccess = function(position) {
            startPos = position;
            console.log(startPos.coords.latitude);
            console.log(startPos.coords.longitude);
            // panTo coordinates if geoLocation returns successfully.
            panTo(startPos.coords.latitude, startPos.coords.longitude);
        };

        var geoError = function(error) {
            console.log('Error occurred. Error code: ' + error.code);
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    };

    return (
        <Container fluid>
            <Row className={'test py-3'}>
                <Col>
                    <div className={"searchBar"}><MapSearchBar panTo={panTo}/></div>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={7}
                        options={options}
                        onClick={onMapClick}
                        onLoad={onMapLoad}

                    >
                        {markers.map(marker => (
                            <Marker
                                key={marker.time.toISOString()}
                                position={{lat: marker.lat, lng: marker.lng}}
                                onClick={() => {
                                    setSelected(marker);
                                }}
                                onLoad={() => {
                                    setSelected(marker);
                                }}
                            >
                                <InfoWindow position={{ lat: marker.lat, lng: marker.lng }}><div className={"my-1"} style={{color: "black"}}><h6>{marker.address}</h6></div></InfoWindow>
                            </Marker>
                        ))}

                    </GoogleMap>
                </Col>

                <Col>
                    <h1 className={'text-center'}>ISP Comparisons</h1>
                    <Tabs defaultActiveKey="mobileBroadbrand" className="bg-light">
                        <Tab eventKey="mobileBroadbrand" title="Mobile Broadband" >
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
                    </Tabs>
                    {/*<div>{location.loaded ? getAddress(location.coordinates.lat, location.coordinates.lng): "Location data not available yet"}</div>*/}
                </Col>
            </Row>
            <MapModalView hide={handleClose} show={show} />;
        </Container>

    );
}

export default Map;