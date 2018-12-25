const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./route/userRoute');
const packageRoute = require('./route/packageRoute');
const packEnd = require('./packageEndpoints/packEnd');
const Auth = require('./authentication/Auth');

// process.env.JWT_KEY = "thisIsMyJwtKeyUsedToEncodeTheTokens";
//middleware to parse requests of extended urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//middleware to parse requests of content-type - application/json
app.use(bodyParser.json());

app.use('/api/v1', userRoute);
app.use('/api/v1', packEnd);

app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'Connection successful',
    message: 'Welcome to carryGO!',
  }));

//   handles every wrong route request
app.get('*', (req, res) =>{
    res.send('Please type the right routes')
});


  app.listen(3000, () =>{
      console.log('Uh...yes, server has started on localhost:3000, now make your request');
  })

  module.exports = app;