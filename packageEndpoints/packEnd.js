const express = require('express');
const app = express.Router();
const Package = require('../route/packageRoute');
const Auth = require('../authentication/Auth');
require('babel-polyfill');

// get a list of food
// app.get('/packages', Auth.verifyToken, Package.getAll);

// get one food
// router.get('/foods/:id', Auth.verifyToken, Food.getOne);

// add a new food 
app.post('/packages', Auth.verifyToken, Package.create);

// update a list of food
// router.put('/foods/:id', Auth.verifyToken, Food.update);

// delete a food
// router.delete('/foods/:id', Auth.verifyToken, Food.delete);

module.exports = app;