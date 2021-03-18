/* eslint-disable max-len */
const assert = require('assert');
const SetCommandStrategy = require('../src/parsers/SetCommandStrategy');
const Response = require('../src/domain/Response');
const constants = require('../src/constants');
const ItemRepository = require('../src/ItemRepository');

describe('SetCommandStrategy', function() {
  describe('#executeCommand()', function() {
    afterEach(function() {
      ItemRepository.delete('ex_key');
    });

    it('Success', function() {
      // SETUP
      const expectedResponse = new Response(constants.RESPONSE_TYPES.STORED);
      const dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
      const dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

      // ASSERT
      assert.deepStrictEqual(SetCommandStrategy.parseDataBlock(dataTokens, dataBlock), expectedResponse);
    });
  });
});
