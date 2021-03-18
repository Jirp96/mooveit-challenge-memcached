/* eslint-disable max-len */
const assert = require('assert');
const SetCommandStrategy = require('../src/parsers/SetCommandStrategy');
const Response = require('../src/domain/Response');
const constants = require('../src/constants');
const ItemRepository = require('../src/ItemRepository');
const PrependCommandStrategy = require('../src/parsers/PrependCommandStrategy');

describe('PrependCommandStrategy', function() {
  describe('#executeCommand()', function() {
    afterEach(function() {
      ItemRepository.delete('ex_key');
    });

    it('Does not add data - empty key', function() {
      // SETUP
      const expectedResponse = new Response(constants.RESPONSE_TYPES.NOT_STORED);
      const dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
      const dataBlock = [119, 111, 114, 108, 100, 13, 10];

      // EXEC
      const actualResponse = PrependCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      // ASSERT
      assert.deepStrictEqual(actualResponse, expectedResponse);
    });

    it('Replace data - already existing key', function() {
      // SETUP
      const expectedResponse = new Response(constants.RESPONSE_TYPES.STORED);
      const dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
      const dataBlock = [119, 111, 114, 108, 100, 13, 10];
      const newDataBlock = [104, 101, 108, 108, 111, 32];
      const expectedDataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

      SetCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      // EXEC
      const actualResponse = PrependCommandStrategy.parseDataBlock(dataTokens, newDataBlock);
      const updatedItem = ItemRepository.get('ex_key');

      // ASSERT
      assert.deepStrictEqual(actualResponse, expectedResponse);
      assert.deepStrictEqual(expectedDataBlock, updatedItem.dataBlock);
    });
  });
});
