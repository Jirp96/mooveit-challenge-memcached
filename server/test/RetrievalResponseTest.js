/* eslint-disable max-len */
const assert = require('assert');
const constants = require('../src/constants');
const Item = require('../src/domain/Item');
const RetrievalResponse = require('../src/domain/RetrievalResponse');

describe('RetrievalResponse', function() {
  describe('#toString()', function() {
    it('respect RetrievalResponse string format - With Data', function() {
      const expectedFormat = 'VALUE test_key 1 3 123\r\n0,1,2\r\nVALUE test_key_2 2 4 321\r\n3,2,1,0\r\nEND\r\n';

      const item1 = new Item([0, 1, 2], 'test_key', 1234, 1);
      item1.casUnique = 123;

      const item2 = new Item([3, 2, 1, 0], 'test_key_2', 1234, 2);
      item2.casUnique = 321;

      const resp = new RetrievalResponse(constants.RESPONSE_TYPES.RETRIEVAL_SUCCESS, [item1, item2]);
      assert.equal(resp.toString(), expectedFormat);
    });
  });
});
