var assert = require('assert');
const ReplaceCommandStrategy = require('../src/parsers/ReplaceCommandStrategy');
const SetCommandStrategy = require('../src/parsers/SetCommandStrategy');
const Response = require('../src/domain/Response');
const constants = require('../src/constants');
const ItemRepository = require('../src/ItemRepository');

describe('ReplaceCommandStrategy', function() {
  describe('#executeCommand()', function() {
    afterEach(function() {
      ItemRepository.delete('ex_key');
    });

    it('Does not replace data - empty key', function() {
        //SETUP
        let expectedResponse = new Response(constants.RESPONSE_TYPES.NOT_STORED);        
        let dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
        let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

        //EXEC
        let actualResponse = ReplaceCommandStrategy.parseDataBlock(dataTokens, dataBlock);

        //ASSERT
        assert.deepStrictEqual(actualResponse, expectedResponse);
    });

    it('Replace data - already existing key', function() {
      //SETUP

      let expectedResponse = new Response(constants.RESPONSE_TYPES.STORED);
      let dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
      let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

      SetCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      //EXEC
      let actualResponse = ReplaceCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      //ASSERT
      assert.deepStrictEqual(actualResponse, expectedResponse);
  });

  });
});