import React, {useEffect, useState} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import Geocode from "react-geocode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSearchBar from './MapSearchBar';
import MapModalView from "./MapModalView";
import Button from "react-bootstrap/Button";

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
    const [modalType, setModalType] = useState('instructions')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateModalType = () => setModalType('comparisons')

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

    function displayComparisons() {
        updateModalType()
        handleShow()
    }


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
      <div>
          <div className={'test'}>
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
                          <InfoWindow position={{ lat: marker.lat, lng: marker.lng }}><div className={"my-1"} style={{color: "black"}}>
                              <Button onClick={displayComparisons}>{marker.address}</Button></div></InfoWindow>
                      </Marker>
                  ))}

              </GoogleMap>
          </div>
          <MapModalView hide={handleClose} show={show} type={modalType}/>
      </div>



    );
}

export default Map;