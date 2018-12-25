const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// connect to database in the .env file 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the package database');
});



// create user table
const createPackageTable = () => {
    const queryText =
    `CREATE TABLE IF NOT EXISTS
    packages(
      id UUID PRIMARY KEY,
      sender_name VARCHAR(128) NOT NULL,
      sender_telephone VARCHAR(128) NOT NULL,
      sender_address VARCHAR(128) NOT NULL,
      receiver_name VARCHAR(128) NOT NULL,
      receiver_telephone VARCHAR(128) NOT NULL,
      destination VARCHAR(128) NOT NULL,
      no_of_packages VARCHAR(128) NOT NULL,
      total_weight VARCHAR(128) NOT NULL,
      description_of_goods VARCHAR(128) NOT NULL,
      package_status VARCHAR(128) NOT NULL,
      present_location VARCHAR(128) NOT NULL,
      owner_id UUID NOT NULL,
      order_created TIMESTAMP,
      modified_date TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
    )`;
  
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
      });
  }

/**
 * Drop User Table
 */
const dropPackageTable = () => {
    const queryText = 'DROP TABLE IF EXISTS packages';
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

// exports to be used in package.json to fire them up, 
module.exports = {
  createPackageTable,
  dropPackageTable
};

require('make-runnable');