import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MapModalView(props) {

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
                <Modal.Header>
                    <Modal.Title><h1>Map View</h1></Modal.Title>

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

export default MapModalView;