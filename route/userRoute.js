
const express = require('express');
//create the express router that will have all endpoints
const router = express.Router();

/**
 * /api/v1/routes.js
 * exports an express router.
 */ 
router.post('/auth/signup', (req, res, next) => {
  let hasErrors = false ;
  let errors = [];
  
  if(!req.body.name){
  //validate name presence in the request
    errors.push({'name': 'Name not received'})
    hasErrors = true;
  }
  if(!req.body.email){
    //validate email presence in the request
    errors.push({'email': 'Email not received'})
    hasErrors = true;
  }
  if(!req.body.password){
    //validate password presence in the request
    errors.push({'password': 'Password not received'})
    hasErrors = true;
  }

  if(hasErrors){
    //if there is any missing field
    res.status(422).json({
      message: "Invalid input",
      errors: errors
    });

  }else{
    res.status(201).json({
        message: 'User created!',
        errors: errors
      });
  }

});

module.exports = router;