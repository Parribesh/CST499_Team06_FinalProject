import React from "react";
import Container from "react-bootstrap/Container";

function Home() {
    return (
        <Container>
            <a href={"./Testing"} className={"center"}>
                <button className={"button"}>
                    Start Test
                </button>
            </a>
        </Container>
    );
}

export default Home;