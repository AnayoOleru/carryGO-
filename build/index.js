'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userRoute = require('./route/userRoute');
var packageRoute = require('./route/packageRoute');
var packEnd = require('./packageEndpoints/packEnd');
var Auth = require('./authentication/Auth');

// process.env.JWT_KEY = "thisIsMyJwtKeyUsedToEncodeTheTokens";
//middleware to parse requests of extended urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//middleware to parse requests of content-type - application/json
app.use(bodyParser.json());

app.use('/api/v1', userRoute);
app.use('/api/v1', packEnd);

app.get('/api/v1', function (req, res) {
    return res.status(200).send({
        status: 'Connection successful',
        message: 'Welcome to carryGO!'
    });
});

//   handles every wrong route request
app.get('*', function (req, res) {
    res.send('Please type the right routes');
});

app.listen(3000, function () {
    console.log('Uh...yes, server has started on localhost:3000, now make your request');
});

module.exports = app;