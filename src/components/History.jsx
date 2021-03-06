import React, {useRef, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import FadeIn from "react-fade-in";
import HistoryChart from "./historyChart";
import Collapse from "react-bootstrap/Collapse";
const html_tablify = require("html-tablify");

function checkTest() {
  let label = [];
  if (JSON.parse(sessionStorage.getItem("dataDown")) != null) {
    let length = JSON.parse(sessionStorage.getItem("dataDown")).length;
    let count = 0;
    for (let i = 0; i < length; i++) {
      count = count + 1;
      label = [...label, count];
    }
    console.log(JSON.parse(sessionStorage.getItem("dataUp")));
  }
  if (JSON.parse(sessionStorage.getItem("avgDown")) == null) {
    return (
      <FadeIn>
        <div class="container" align="center">
          <br />
          <h1 class="display-1">There's No Data Yet!</h1>
          <hr></hr>
          <h2>Please Run a Test First.</h2>
        </div>
      </FadeIn>
    );
  } else if (JSON.parse(sessionStorage.getItem("avgJitter")) == null) {
    return (
      <FadeIn>
        <div class="container" align="center">
          <br />
          <h1 class="display-1">There's No Data Yet!</h1>
          <hr></hr>
          <h2>Please Let All Tests Complete First</h2>
        </div>
      </FadeIn>
    );
  } else {
    var d1 = [];
    var d2 = [];
    var times = [];
    let size = JSON.parse(sessionStorage.getItem("avgDown")).length;
    for (let i = 0; i < size; i++) {
      let avgDown = JSON.parse(sessionStorage.getItem("avgDown"))[i];
      d1.push(avgDown);
      let avgUp = JSON.parse(sessionStorage.getItem("avgUp"))[i];
      d2.push(avgUp);
      let time = JSON.parse(sessionStorage.getItem('testCompletionTime'))[i];
      times.push(time);
    }

    return (
        <FadeIn>
            <Container>
                <Container><h1 className={'display-2 text-center my-3'}>History</h1></Container>
                <Container >
                    <Row className={"bg-body bg-opacity-25 my-3 justify-content-center"} >
                        <HistoryChart
                            data1={d1}
                            data2={d2}
                            label={times}
                        />
                    </Row>
                    <Row>{generateTable()}</Row>
                </Container>
            </Container>
        </FadeIn>
    );
  }
}

function generateTable() {
  const Table = require("react-bootstrap/Table");
  let table_data = [];
  let down = JSON.parse(sessionStorage.getItem("avgDown"));
  let up = JSON.parse(sessionStorage.getItem("avgUp"));
  console.log("Down: " + down);
  console.log('Up: ' + up)
  let size1 = JSON.parse(sessionStorage.getItem("avgDown")).length;
  let size2 = JSON.parse(sessionStorage.getItem("avgUp")).length;
  console.log('avgDown Size: ' + size1)
  console.log('avgDown Size: ' + size2)
  for (let i = 0; i < size1; i++) {
    let avgDown = JSON.parse(sessionStorage.getItem("avgDown"))[i];
    let avgUp = JSON.parse(sessionStorage.getItem("avgUp"))[i];
    if (avgUp === undefined || avgUp === "") {
      avgUp = "N/A";
    }
    let avgJitter = JSON.parse(sessionStorage.getItem("avgJitter"))[i];
    if (avgJitter === undefined || avgJitter === "") {
      avgJitter = "N/A";
    }
    let avgPing = JSON.parse(sessionStorage.getItem("avgPing"))[i];
    if (avgPing === undefined || avgPing === "") {
      avgPing = "N/A";
    }
    let location = JSON.parse(sessionStorage.getItem("location"))[i];
    let time = JSON.parse(sessionStorage.getItem('testCompletionTime'))[i];
    table_data.push({
      Date: time,
      Location: location,
      Download: avgDown + " Mbps",
      Upload: avgUp !== "N/A" ? avgUp + " Mbps" : "N/A",
      Jitter: avgJitter !== "N/A" ? avgJitter + " ms" : "N/A",
      Ping: avgPing !== "N/A" ? avgPing + " ms" : "N/A",
      Video: avgDown > 5 ? "HD" : "SD",
      MOS: "Satisfactory",
    });
  }
  let table = {
    data: table_data,
  };
  let final_table = html_tablify.tablify(table);
  final_table = final_table.replace(
    '<table id="tablify" class="tablify" border="1" cellspacing="0" cellpadding="0">',
    "<Table class='table table-dark'>"
  );
  final_table = final_table.replace("</table>", "</Table>");
  let value = { __html: final_table };
  return <div dangerouslySetInnerHTML={value} />;
}

function History() {
  return checkTest();
}

export default History;
