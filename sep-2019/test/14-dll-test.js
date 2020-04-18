var assert = require('assert');
var x = require('../14-dll');

describe('maybeFirst', function() {
  it('returns the first element of an array', function() {
    const dll = new x.DLL();
    dll.push(5);
    assert.equal(dll.toString(), 5, 'linked list is 5');
  });
});