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
            //console.log(res.body);
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
    // done();
  });
})
