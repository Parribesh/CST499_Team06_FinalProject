
import React from "react";
import Container from "react-bootstrap/Container";
import { AiFillAndroid, AiFillApple, AiFillWindows  } from "react-icons/ai";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Footer() {
    return (
        <footer className={"py-3 bg-dark fixed-bottom"}>

            <Container>
                <Row>
                    <h5 className={"text-center"}>Download the CalSpeed Mobile and Desktop Applications</h5>
                </Row>
                <Row className={"text-center"}>
                    <Col>
                        <a className={"footerLink"} href={"https://play.google.com/store/apps/details?id=gov.ca.cpuc.calspeed.android&hl=en"}>
                            <h1><AiFillAndroid /></h1>
                        </a>
                        <h7>Android</h7>
                    </Col>
                    <Col>

                        <a className={"footerLink"} href={"https://apps.apple.com/us/app/calspeed/id1063788456"}>
                            <h1><AiFillApple /></h1>
                        </a>
                        <h7>iOS</h7>

                    </Col>
                    <Col>
                        <a className={"footerLink"} href={"http://calspeed.org/index.html"}>
                            <h1><AiFillWindows /></h1>
                        </a>
                        <h7>Windows</h7>

                    </Col>
                    <Col>
                        <a className={"footerLink"} href={"http://calspeed.org/index.html"}>
                            <h1><AiFillApple /></h1>
                        </a>
                        <h7>Mac</h7>

                    </Col>


                </Row>
            </Container>
        </footer>
    );
}

export default Footer;