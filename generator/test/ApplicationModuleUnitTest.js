var assert = require('assert');
var config = require('../lib/config-load')();

describe('Config load working?', function() {
  describe('Size', function () {
    it('should greater than 0 if loading correctly', function () {
      assert.notStrictEqual(0, Object.keys(config).length);
    });
  });
});
