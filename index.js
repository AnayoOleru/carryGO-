const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middleware to parse requests of extended urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//middleware to parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'Connection successful',
    message: 'Welcome to carryGO!',
  }));

//   handles every wrong route request
app.get('*', (req, res) =>{
    res.send('Please type the right routes')
});


  app.listen(3000, () =>{
      console.log('Uh...yes, server has started, now make your request');
  })

  module.exports = app;