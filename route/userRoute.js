
const express = require('express');
//create the express router that will have all endpoints
const router = express.Router();

/**
 * /api/v1/auth/signup
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

/**
 * api/v1/auth/login
 * user is able to login
 */
router.post('/auth/login', (req, res, next) => {
    let hasErrors = false ;
    let errors = [];
  
    //validate presence of email and password
    if(!req.body.email){
      errors.push({'email': 'Email not received'})
      hasErrors = true;
    }
    if(!req.body.password){
      errors.push({'password': 'Password not received'})
      hasErrors = true;
    }
  
    if(hasErrors){
    //return error code an info
      res.status(422).json({
        message: "Invalid input",
        errors: errors
      });
  
    }else{
    //check if credentials are valid
      if(req.body.email == 'anayo_oleru@outlook.com' && req.body.password == 'secret'){
        //generate JWT token. jwt.sing() receives payload, key and opts.
        const token = jwt.sign(
          {
            email: req.body.email, 
          }, 
          process.env.JWT_KEY, 
          {
            expiresIn: "1h"
          }
        );
        //validation OK
        res.status(200).json({
          message: 'Auth OK',
          token: token,
          errors: errors
        })
      }else{
        //return 401 and message KO
        res.status(401).json({
          message: "Auth error"
        }) 
      }  
      done();
    }
  });
module.exports = router;