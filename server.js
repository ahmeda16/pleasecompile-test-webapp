console.log('Server-side code running');

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

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
app.use(bodyParser.json());

// start the express web server listening on 8080
app.listen(8080, () => {
    console.log('listening on 8080');
  });
  
  // serve the homepage
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  app.route('/username')
      .post((req, res) => {
          // handle create
          console.dir(`Creating: ${req.body.username} on server`);
          // create user on db
          db.usernames.push({"name" : req.body.username});
          fs.writeFile("./db.json", JSON.stringify(db, null, 2), (error) => {
            if (error) {
              console.log(error);
              return;
            }
            console.log("Add user to database success");
          });

          res.sendStatus(201);    // created
      })
      .get((req, res) => {
          // handle read
          console.dir(`Reading: ${JSON.stringify(req.query.search)} on server`);
          // check if user exists on db

          res.sendStatus(200);    // OK
      }) 
      .put((req, res) => {
  
      })
      .delete((req, res) => {
          // handle delete
          console.dir(`Deleting: ${req.body.username} on server`);
          // delete user on db

          res.sendStatus(200);    // OK
      })

app.get('/get-db', (req, res) => {
    res.send("(insert entire database here)");
});