const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
chai.use(http);
const app = require('../index');

// checks if mocha is installed and working fine
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

/**
 * Basic tests for Auth system API
 * test if server or this very app exist
 * test route /api/v1
 * test route '*'
 */
describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');})

    it('GET /api/v1 should return 200 and message', (done) => {
        //send request to the app
        chai.request(app).get('/api/v1')
          .then((res) => {
            //assertions
            // console.log(res.body);
            expect(res).to.have.status(200, 'Connection successful');
            expect(res.body.message).to.contain('Welcome to carryGO!');
            done();
        }).catch(err => {
          console.log(err.message);
        })
      });
    })

describe('App', () => {
  it('GET * should return 200 and message', (done) => {
    //send request to the app
    chai.request(app).get('*')
      .then((res) => {
        //assertions
        //console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.message).to.contain('Please type the right routes');
        done();
    }).catch(err => {
      console.log(err.message);
    })
    done();
  });
})

/**
 * user registration and validation test
 */
describe('User registration', () => {

    it('Should return 201 and confirmation for valid input', (done) => {
      //mock valid user input
      const new_user = {
        "name"  : "Anayo Oleru",
        "email": "anayo_oleru@outlook.com",
        "password": "secret"
      }
      //send request to the app
      chai.request(app).post('/auth/signup')
        .send(new_user)
          .then((res) => {
            //console.log(res.body);
            //assertions
            expect(res).to.have.status(201);
            expect(token).to.exist;
            expect(res.body.errors.length).to.be.equal(0);
            expect(res.body.user.password).to.not.be.eql(user_input.password);
            done();
          }).catch(err => {
            console.log(err.message);
          })
          done();
    });
  })
/**
 * POST /auth/login
 * user login and validation(not yet)
 */
describe('User login', () => {
    it('should return 200 and token for valid credentials', (done) => {
      //mock invalid user input
      const valid_input = {
        "email": "anayo_oleru@outlook.com",
        "password": "secret"
      }
      //send request to the app
      chai.request(app).post('/auth/login')
        .send(valid_input)
          .then((res) => {
            //console.log(res.body);
            //assertions
            expect(res).to.have.status(200);
            expect(res.body.token).to.exist;
            expect(res.body.errors.length).to.be.equal(0);
            expect(res.body.user.password).to.not.be.eql(valid_input.password);
            done();
          }).catch(err => {
            console.log(err.message);
          })
          done();
    });
  });

  /**
 * POST /auth/login
 * user login and validation(not yet)
 */
describe('Create a new package', () => {
  it('should return 201 and rows', (done) => {
    //mock invalid user input
    const valid_input = {
      "sender_name": "Anayo Oleru",
      "sender_telephone":"07069583654",
      "sender_address":"no.88A",
      "receiver_name":"Nonso",
      "reciever_telephone":"08090786543",
      "reciever_address": "happy street northumber",
      "no_of_packages":"3",
      "total_weight": "3kg",
      "description_of_goods": "dodument",
    }
    //send request to the app
    chai.request(app).post('/packages')
      .send(valid_input)
        .then((res) => {
          console.log(res.body);
          //assertions
          expect(res).to.have.status(201);
          expect(res).to.be.equal(rows[0]);;
          expect(res.body.errors.length).to.be.equal(0);
          done();
        }).catch(err => {
          console.log(err.message);
        })
  });
});
