import axios from 'axios';
import Websocket from 'ws';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

const username = 'admin';
const password = 'admin';

const authenticationUrl = 'http://localhost:3030/api/login';
const topicDataUrl = 'ws://localhost:3030/api/ws/v2/sql/execute';

async function authenticationRequest() {
  const AuthenticateWith = await axios.post(authenticationUrl, {
    user: username,
    password
  })
    .then(response => response.data)
    .catch((error) => console.error('Error:', error));
  return AuthenticateWith;
}

const webSocketRequest = new WebSocket(topicDataUrl);
const websocketData = new Array;
const websocketSubject = new Subject();

// We are waiting for the authentication token
async function requestToWSEndpoint() {
  const reqToken = await authenticationRequest();

  // This is an object with the authentication token + query
  // This is the first message for the Websocket connection
  const firstMessage = {
    token: reqToken,
    stats: 2,
    sql: "SELECT merchantId, count(*) FROM cc_payments GROUP BY merchantId",
    live: false
  };

  // We open the Websocket
  webSocketRequest.onopen = () => {
    // Here, we send the message
    webSocketRequest.send(JSON.stringify(firstMessage));

    // Here, the onmessage() method is executed each time we receive a message
    // from the Websocket connection.
    webSocketRequest.onmessage = (streamEvent) => {
      // This streamEvent is an object that has a data attribute.
      // That data attribute has a type property, which can be
      // RECORD, END or ERROR.
      const isRecord = JSON.parse(streamEvent.data).type === 'RECORD';
      const isComplete = JSON.parse(streamEvent.data).type === 'END';
      const isError = JSON.parse(streamEvent.data).type === 'ERROR';

      websocketSubject.next(websocketData);
      isRecord && websocketData.push(JSON.parse(streamEvent.data).data.value);
      isError && websocketSubject.console.error((error) => console.error(error));
      isComplete && websocketSubject.complete();
    };
  };
};

(async function () {
  await requestToWSEndpoint();

  // finanize() will return data when the stream has finished.
  websocketSubject.pipe(finalize(() => {
    var width = 1200;
    var height = 1000;
    var margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = width - margin.left - margin.right;
    var height = height - margin.top - margin.bottom;

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "lightblue");

      var max = d3.max(websocketData, function (d) { return d.count; });
      console.log(max, "MAX");

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, websocketData.length-1 + 10])
    .range([5, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "y axis")
      .call(d3.axisBottom(x));


    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, max+10])
      .range([height, 0]);
    
    svg.append("g")
     .attr("class", "y axis")
     .call(d3.axisLeft(y));

    svg.append("g")
    .selectAll('dot')
     .data(websocketData)
     .enter().
    append('circle')
     .attr('cy', function(d) { return y(d.count); } )
       .attr('cx', function(d) { return x(d.merchantId); } )
       .attr('r', 4)
    .style("fill", "#ff3312");


  
  })).subscribe();
}());
