import axios from 'axios';
import Websocket from 'ws';
import { of } from 'rxjs';
import { tap, filter, toArray, map, reduce, merge } from 'rxjs/operators';

const username = 'admin';
const password = 'admin';

// You need to change that PORT to your local machine PORT that Lenses is running on.
const authenticationUrl = 'http://localhost:3030/api/login';
const topicDataUrl = 'ws://localhost:3030/api/ws/v2/sql/execute';

const authenticationRequest = () => axios.post(authenticationUrl, {
  user: username, password })
  .then((response) => response.data)
  .catch((error) => console.error(console.error('Error Response', error)));

// Using Websocket for the SQL query
const wsRequest = () => authenticationRequest().then(reqToken => {
  const webSocketRequest = new WebSocket(topicDataUrl);
  const firstMessage = {
    token: reqToken,
    stats: 2,
    sql: "SELECT merchantId, count(*) FROM cc_payments GROUP BY merchantId",
    live: false
  };

  var messages = [];

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

var data = wsRequest().then(results => console.log(results, 'R'));
console.log(data, 'DATA');

var width = 1200;
var height = 1000;
var margin = {top: 50, right: 50, bottom: 50, left: 50};
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

    // Add X axis
  var x = d3.scaleLinear()
      .domain([0, data.length-1])
      .range([5, width]);


    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "y axis")
      .call(d3.axisBottom(x));

	  var max = d3.max(data, function(d) { console.log(d.count); return d.count; });
	  console.log(max);

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);

    svg.append("g")
	  .attr("class", "y axis")
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
          return y(d.count);
        })
      );
