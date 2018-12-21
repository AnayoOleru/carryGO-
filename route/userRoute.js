const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../dbquery/dbquery');
const Helper = require('../jwt/Helper');

const express = require('express');
//create the express router that will have all endpoints
const router = express.Router();

/**
 * /api/v1/auth/signup
 * exports an express router.
 */ 
router.post('/auth/signup', async (req, res, next) => {

if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ 
        message: 'Oopsy, we need you to check properly, some values are missing',
            })
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).json({ 
        error: 'Invalid e-mail',
        message: 'Please enter a valid email address',
            })
  }

  const hashPassword = Helper.hashPassword(req.body.password);

  const createQuery = `INSERT INTO
    users(id, name, email, password, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  const values = [
    uuidv4(),
    req.body.name,
    req.body.email,
    hashPassword,
    moment(new Date()),
    moment(new Date())
  ];

  try {
    const { rows } = await db.query(createQuery, values);
    const token = Helper.generateToken(rows[0].id);
    return res.status(201).send({ token });
  } catch(error) { //if the email exist in the datbase
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
    }
    return res.status(400).send(error);
  }
});

/**
 * api/v1/auth/login
 * user is able to login
 */
 router.post('/auth/login', async (req, res, next) => {

if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
        message: 'Oopsy, we need you to check properly, some values are missing'
    });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).json({ 
        error: 'Invalid e-mail',
        message: 'Please enter a valid email address',
            })
  }

  const text = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await db.query(text, [req.body.email]);
    if (!rows[0]) {
      return res.status(400).json({
        error: 'Invalid credentials',  
        message: 'The credentials you provided is incorrect'});
    }
    if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
            error: 'Invalid credentials',  
            message: 'The credentials you provided is incorrect'});
    }
    const token = Helper.generateToken(rows[0].id);
    return res.status(200).send({ token });
  } catch(error) {
    return res.status(400).send(error)
  }
});
module.exports = router;