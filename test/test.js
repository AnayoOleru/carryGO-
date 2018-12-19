// checks if mocha is installed and working fine
const assert = require('assert');
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
 */
// const chai = require('chai');
// const expect = chai.expect;

// //start app
// const app = require('../app');

// describe('App', () => {
//   it('Should exists', () => {
//     expect(app).to.be.a('function');})
// })