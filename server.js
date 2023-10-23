console.log('Server-side code running');

const express = require('express');
const app = express();
const fs = require('fs');

var db;

// initialize db variable
fs.readFile("./db.json", "utf8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  db = JSON.parse(data);
  console.log(db);
});


// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/create', (req, res) => {

    // handle create
    console.log("create heard on server");

});

app.post('/read', (req, res) => {

    // handle read

});

app.post('/delete', (req, res) => {

    // handle delete

});