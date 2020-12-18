// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');
var apiKey = process.env.KEY;
var serverToken = process.env.TOKEN;
fetch('https://api.trello.com/1/boards/lztHyDSf?key='+ apiKey +'&token=' + serverToken, {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
.then(data => data.json())
.then((data) => {
    console.log(data);
    return data
})
.catch(err => console.error(err));