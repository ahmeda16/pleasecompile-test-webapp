const fs = require('fs')
const pg = require('pg')

//fetch the DB password from the local text file
const dbPassword = fs.readFileSync('./db_password.txt').toString()

const pool = new pg.Pool({
    user: 'postgres',
    password: dbPassword,
    database: 'api',
    host: 'database-1.c7082ig4mh9n.ca-central-1.rds.amazonaws.com',
    port: 5432,
    ssl: true,
})

const createUser = (request, response) => {
    const { username } = request.body

    console.log(`Creating: ${username} on server`)

    pool.query('INSERT INTO users (username) VALUES ($1)', [username], (error) => {
        if (error) {
            console.log(`User already exists: ${username} on server`)
            response.sendStatus(204) //User already exists
            return
            //don't throw error, because the error is expected
        }
        console.log(`Created: ${username} on server`)
        response.sendStatus(201) //User added successfully
    })
}

const getUser = (request, response) => {
    const username = request.query['search']

    console.log(`Getting: ${username} on server`)

    pool.query('SELECT * FROM users WHERE username=$1', [username], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            console.log(`User does not exist: ${username} on server`)
            response.sendStatus(204) //User not in database
        } else {
            console.log(`User does exist: ${username} on server`)
            response.sendStatus(200) //User in database
        }
    })
}

const deleteUser = (request, response) => {
    const { username } = request.body

    console.log(`Deleting: ${username} on server`)

    pool.query('DELETE FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            console.log(`User does not exist: ${username} on server`)
            response.sendStatus(204) //User not in database
        } else {
            console.log(`Deleted: ${username} on server`)
            response.sendStatus(200) //User deleted successfully
        }
    })
}

const getDB = (_request, response) => {
    console.log(`Getting entire DB from server`)

    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    getDB,
}
