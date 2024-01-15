console.log('Server-side code running')

//suppress the self-signed cert error
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 8080

// serve files from the public directory
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// serve the homepage
app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/username', db.createUser)
app.get('/username', db.getUser)
app.delete('/username', db.deleteUser)
app.get('/get-db', db.getDB)

// start the express web server listening on 8080
app.listen(port, () => {
  console.log('listening on 8080')
})
