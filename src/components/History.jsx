import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import FadeIn from "react-fade-in";
const html_tablify = require('html-tablify');
/*We need to either:
- Display an empty page letting them know they haven't run the test yet
- Show a table generated with their data.
If we show a table it needs to:
  - loop and show every value
  - handle if the arrays are not the same size (probably should just check if it's empty and then display N/A)
 */
function checkTest(){
  if(JSON.parse(sessionStorage.getItem('avgDown')) == null){
    return(
        <FadeIn>
            <div class='container' align='center'>
                <br/>
                <h1 class='display-1'>There's No Data Yet!</h1>
                <hr></hr>
                <h2>Please Run a Test First.</h2>
            </div>
        </FadeIn>);
  }
  else if(JSON.parse(sessionStorage.getItem('avgJitter')) == null){
    return(
        <FadeIn>
            <div class='container' align='center'>
                <br/>
                <h1 class='display-1'>There's No Data Yet!</h1>
                <hr></hr>
                <h2>Please Let All Tests Complete First</h2>
            </div>
        </FadeIn>);
    }
  else{


    return( <Container>
      <Row className={"justify-content-center"}>
        {/*<Col>*/}
        {/*  <h1>GRAPH</h1>*/}
        {/*</Col>*/}
        {/* <Chart isHistory={true} /> */}
      </Row>
      <Row>
          {generateTable()}
      </Row>
    </Container>);
  }
}

function generateTable(){
  const Table = require('react-bootstrap/Table');
  let table_data = [];
  let size = JSON.parse(sessionStorage.getItem('avgDown')).length;
  for (let i = 0; i<size; i++) {
      let avgDown = JSON.parse(sessionStorage.getItem('avgDown'))[i];
      let avgUp = JSON.parse(sessionStorage.getItem('avgUp'))[i];
      if (avgUp === undefined || avgUp === ''){
          avgUp = "N/A"
      }
      let avgJitter = JSON.parse(sessionStorage.getItem('avgJitter'))[i];
      if (avgJitter === undefined || avgJitter === ''){
          avgJitter = "N/A"
      }
      let avgPing = JSON.parse(sessionStorage.getItem('avgPing'))[i];
      if (avgPing === undefined || avgPing === ''){
          avgPing = "N/A"
      }
      table_data.push({
          Date: new Date().toLocaleDateString(),
          Location: 'Test Location',
          Download:  avgDown + ' Mbps',
          Upload:  (avgUp !== "N/A") ? avgUp + ' Mbps' : 'N/A',
          Jitter:  (avgJitter !== "N/A") ? avgJitter + ' ms' : 'N/A',
          Ping: (avgPing !== "N/A") ? avgPing + ' ms' : 'N/A',
          Video: (avgDown > 5) ? 'HD' : 'SD',
          MOS: 'test'
      })
  }
  let table = {
      data: table_data
  }
  let final_table = html_tablify.tablify(table);
  final_table = final_table.replace('<table id="tablify" class="tablify" border="1" cellspacing="0" cellpadding="0">',
      "<Table class='table table-dark'>");
  final_table = final_table.replace('</table>',
      "</Table>");
  let value = {__html: final_table};
  //let value = {__html: fixed_code};
  return(<div dangerouslySetInnerHTML={value} />);
}

function History() {
  return (
      checkTest()
  );
}

export default History;
