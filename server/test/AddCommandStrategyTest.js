/* eslint-disable max-len */
const assert = require('assert');
const AddCommandStrategy = require('../src/parsers/AddCommandStrategy');
const Response = require('../src/domain/Response');
const constants = require('../src/constants');
const ItemRepository = require('../src/ItemRepository');

describe('AddCommandStrategy', function() {
  describe('#executeCommand()', function() {
    afterEach(function() {
      ItemRepository.delete('ex_key');
    });

    it('Add data - empty key', function() {
      // SETUP
      const expectedResponse = new Response(constants.RESPONSE_TYPES.STORED);
      const dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
      const dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

      // EXEC
      const actualResponse = AddCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      // ASSERT
      assert.deepStrictEqual(actualResponse, expectedResponse);
    });

    it('Does not add - already existing key', function() {
      // SETUP

      const expectedResponse = new Response(constants.RESPONSE_TYPES.NOT_STORED);
      const dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
      const dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

      AddCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      // EXEC
      const actualResponse = AddCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      // ASSERT
      assert.deepStrictEqual(actualResponse, expectedResponse);
    });
  });
});
