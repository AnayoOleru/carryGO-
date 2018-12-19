const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

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
 */
//start index
const app = require('../index');

describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');})
})