import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillAndroid, AiFillApple, AiFillWindows  } from "react-icons/ai";

function Home() {

    return (
        <Container>
            <a href={"./Testing"} className={"center"}>
                <button className={"button"}>
                    Start Test
                </button>
            </a>

            {/*<Row className={"bg-dark text-center"}>*/}
            {/*    <Col>*/}
            {/*        <a href={"https://play.google.com/store/apps/details?id=gov.ca.cpuc.calspeed.android&hl=en"}>*/}
            {/*            <h1><AiFillAndroid /></h1>*/}
            {/*        </a>*/}
            {/*        <h7>Android</h7>*/}
            {/*    </Col>*/}
            {/*    <Col>*/}

            {/*        <a href={"https://apps.apple.com/us/app/calspeed/id1063788456"}>*/}
            {/*            <h1><AiFillApple /></h1>*/}
            {/*        </a>*/}
            {/*        <h7>iOS</h7>*/}

            {/*    </Col>*/}
            {/*    <Col>*/}
            {/*        <a href={"http://calspeed.org/index.html"}>*/}
            {/*            <h1><AiFillWindows /></h1>*/}
            {/*        </a>*/}
            {/*        <h7>Windows</h7>*/}

            {/*    </Col>*/}
            {/*    <Col>*/}
            {/*        <a href={"http://calspeed.org/index.html"}>*/}
            {/*            <h1><AiFillApple /></h1>*/}
            {/*        </a>*/}
            {/*        <h7>Mac</h7>*/}

            {/*    </Col>*/}
            {/*    */}
            {/*</Row>*/}
        </Container>
    );
}

export default Home;