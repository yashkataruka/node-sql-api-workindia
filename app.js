const express = require('express');
const mysql = require('mysql');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const registerAndLoginRoute = require('./api/register_login');
const notesRoute = require('./api/notes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (res.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yash123!',
    database: 'test',
    port: 3306
})

if (connection.connect) {
    console.log('Connected to the DB!')
}
else {
    console.log('Error connecting to the database...')
}

app.use('/app/user', registerAndLoginRoute);
app.use('/app', notesRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;