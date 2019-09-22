const express = require('express')
const bodyParser = require('body-parser')
let path = require('path');

//  DATABASE CONNECTION
const dbIgnored = require(path.resolve('./database/databaseConnect'));
//  CONFIG
const config = require(path.resolve('./config/config'))

//  ROUTES
const router = require(`${__dirname}/./routes/router`)
const app = express()

const server = require('http').Server(app);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
})
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(bodyParser.json())

// START THE SERVER
server.listen((process.env.PORT || config.server.port)).on('error', (err) => {
    console.log('Server error ', err);
}).on('listening', () => {
    console.log('Server listening on', (process.env.PORT || config.server.port));
});

module.exports = server