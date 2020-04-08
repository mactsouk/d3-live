import axios from 'axios';
import Websocket from 'ws';
import { of } from 'rxjs';
import { tap, filter, toArray, map, reduce, merge } from 'rxjs/operators';
const username = 'admin';
const password = 'admin';
const authenticationUrl = 'http://localhost:4700/api/login'; // You need to change that PORT to your local machine PORT that Lenses is running on.
const topicDataUrl = 'ws://localhost:4700/api/ws/v2/sql/execute';
const authenticationRequest = () => axios.post(authenticationUrl, {
  user: username,
  password
})
  .then((response) => response.data)
  .catch((error) => console.error(console.error('Error Response', error)));
const wsRequest = () => authenticationRequest().then(reqToken => {
  const webSocketRequest = new WebSocket(topicDataUrl);
  const firstMessage = {
    token: reqToken,
    stats: 2,
    sql: "SELECT * FROM cc_payments LIMIT 200",
    live: false
  };
  const messages = [];
  webSocketRequest.onopen = () => {
    webSocketRequest.send(JSON.stringify(firstMessage));
    webSocketRequest.onmessage = (streamEvent) => {
      of(streamEvent).pipe(
        map(event => JSON.parse(event.data)),
        filter(message => message.type === 'RECORD')
      ).subscribe(message => messages.push(message.data.value));
    };
  };
  return messages;
});

const data = wsRequest().then(results => console.log(results, 'R'));
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 900 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

const svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function (d) { return d.merchantId; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return +d.amount; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) {
          console.log(d, 'inside');
          return x(d.merchantId);
        })
        .y(function (d) {
          return y(d.amount);
        })
      );

