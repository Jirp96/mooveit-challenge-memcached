var assert = require('assert');
var Item = require('../src/domain/Item');

describe('Item', function() {
  describe('#isExpired()', function() {
    it('should return true if item is expired - UNIX Timestamp', function() {
      let anItem = new Item([], 'test_key', 1000000000, 1);

      assert.equal(anItem.isExpired(), true);
    });

    it('should return false if item is not expired - UNIX Timestamp', function() {
        let futureTime = Math.round((new Date()).getTime() / 1000) + 10000;
        let anItem = new Item([], 'test_key', futureTime, 1);

        assert.equal(anItem.isExpired(), false);
    });

    it('should return true if item is expired - Number of Seconds', function() {
        let anItem = new Item([], 'test_key', -1, 1);

        assert.equal(anItem.isExpired(), true);
    });

    it('should return false if item is not expired - Number of Seconds', function() {
        let anItem = new Item([], 'test_key', 10000, 1);

        assert.equal(anItem.isExpired(), false);
    });
  });

  describe('#toString()', function() {
    it('respect Item string format - No Data', function() {
      const expectedFormat = 'test_key 1 0';
      let anItem = new Item([], 'test_key', 1234, 1);

      assert.equal(anItem.toString(), expectedFormat);
    });

    it('respect Item string format - With Data', function() {
      const expectedFormat = 'test_key 1 3';
      let anItem = new Item([0, 1, 2], 'test_key', 1234, 1);

      assert.equal(anItem.toString(), expectedFormat);
    });
  });
});
