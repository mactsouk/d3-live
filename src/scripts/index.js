import axios from 'axios';
import Websocket from 'ws';

const username = 'admin';
const password = 'admin';

const authenticationUrl = 'http://localhost:4700/api/login'; // You need to change that PORT to your local machine PORT that Lenses is running on.
const topicDataUrl = 'ws://localhost:4700/api/ws/v2/sql/scroll';

const authenticationRequest = () => axios.post(authenticationUrl, {
  user: username,
  password
})
  .then((response) => { console.log('USER AUTHENTICATED'); return response.data; })
  .catch((error) => console.error(console.error('Error Response', error)));


const wsRequest = () => authenticationRequest().then(reqToken => {
  const webSocketRequest = new WebSocket(topicDataUrl);


  const firstMessage = {
    token: reqToken,
    limit: 200,
    partition: 0,
    start: 0,
    table: "cc_payments",
    type: "offset"
  };

  webSocketRequest.onopen = () => {
    console.log('Websocket Endpoint OPEN');
    webSocketRequest.send(JSON.stringify(firstMessage));
    webSocketRequest.onmessage = (streamEvent) => {
      const parsedRecords = JSON.parse(streamEvent.data);
      if (parsedRecords.type === 'PAGE_END') {
        webSocketRequest.close();
        console.log('Websocket Endpoint CLOSED');
      }
      console.log('Parsed Records', parsedRecords);
      return parsedRecords;
    };
  };
});


wsRequest();