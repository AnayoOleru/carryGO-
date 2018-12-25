const moment = require('moment');
const uuidv4 = require('uuid/v4');
const dbquery = require('../dbquery/dbquery');
require('babel-polyfill');
// const Helper = require('../jwt/Helper');


//create the express router that will have all endpoints

const Package = {
/**
   * Create A new row in food table: when request to GET /foods API is called this block runs: 
   * @param {object} req 
   * @param {object} res
   * @returns {object} package object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      packages(id, sender_name, sender_telephone, sender_address, receiver_name, receiver_telephone, destination,
        no_of_packages, total_weight, description_of_goods, package_status, present_location, owner_id, order_created, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      returning *`;
    //   grab the values given by the user on the request body(body-parser)
    const values = [
      uuidv4(),
      req.body.sender_name,
      req.body.sender_telephone,
      req.body.sender_address,
      req.body.receiver_name,
      req.body.receiver_telephone,
      req.body.destination,
      req.body.no_of_packages,
      req.body.total_weight,
      req.body.description_of_goods,
      req.body.package_status,
      req.body.present_location,
      req.user.id,
      moment(new Date()),
      moment(new Date())
    ];
    console.log(values);
    
    //SQL  catch and try  
    try {
      const { rows } = await dbquery.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

}

module.exports = Package;