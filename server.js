console.log('Server-side code running');

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// initialize db variable
const db = {
  "usernames": [
    {
      "name": "Joe Biden"
    },
    {
      "name": "Donald Trump"
    },
    {
      "name": "Barack Obama"
    }
  ]
};

//initialize db json file
fs.writeFile("./db.json", JSON.stringify(db, null, 2), (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Database initialization success");
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
          console.log(`Creating: ${req.body.username} on server`);
          // check if username exists
          if(!db.usernames.some(username => username.name === req.body.username)) {
            // create user on db
            db.usernames.push({"name" : req.body.username});

            fs.writeFile("./db.json", JSON.stringify(db, null, 2), (error) => {
              if (error) {
                console.log(error);
                return;
              }
              console.log("Add user to database success");
              res.sendStatus(201);    // created
            });
          }
          else {
            // don't create the username
            console.log("Username already exists, No changes made");
            res.sendStatus(204);
          }
      })
      .get((req, res) => {
          // handle read
          console.log(`Reading: ${JSON.stringify(req.query.search)} on server`);
          
          // check if user exists on db
          var found = false;
          for (var user of db.usernames) {
            if (String(user.name) === String(req.query.search)) {
              found = true;
            }
          }

          if (found) {
            console.log("Username found");
            res.sendStatus(200);    // OK, found
          }
          else {
            console.log("Username NOT found");
            res.sendStatus(204);    // OK but not found
          }
      }) 
      .put((req, res) => {
  
      })
      .delete((req, res) => {
          // handle delete
          console.log(`Deleting: ${req.body.username} on server`);
          var found = false;

          // delete user on db
          for (var i = db.usernames.length  - 1; i>= 0; --i)
          {
            if (db.usernames[i].name == req.body.username)
            {
              db.usernames.splice(i, 1);
              found = true;
              break;
            }
          }

          if(found == true)
          {
            fs.writeFile("./db.json", JSON.stringify(db, null, 2), (error) => {
              if (error) {
                console.log(error);
                return;
              }
              console.log("Delete user to database success");
            });
            res.sendStatus(200);    // OK
          }
          else
          {
            console.log("Username does not exist, No changes made");
            res.sendStatus(204);
          }
      })

      app.get('/get-db', (req, res) => {
        res.send(JSON.stringify(db,null,2));
    });