var assert = require('assert');
const CasCommandStrategy = require('../src/parsers/CasCommandStrategy');
const SetCommandStrategy = require('../src/parsers/SetCommandStrategy');
const Response = require('../src/domain/Response');
const constants = require('../src/constants');
const ItemRepository = require('../src/ItemRepository');

describe('CasCommandStrategy', function() {
  describe('#executeCommand()', function() {
    afterEach(function() {
      ItemRepository.delete('ex_key');
    });

    it('Success - Data was not updated since last get', function() {
        //SETUP
        let expectedResponse = new Response(constants.RESPONSE_TYPES.STORED);        
        let dataTokens = ['SET', 'ex_key', 53, 864100, '11'];
        let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

        SetCommandStrategy.parseDataBlock(dataTokens, dataBlock);
        let anItem = ItemRepository.get('ex_key');
        dataTokens.push(anItem.casUnique);

        //EXEC
        let actualResponse = CasCommandStrategy.parseDataBlock(dataTokens, dataBlock);

        //ASSERT
        assert.deepStrictEqual(actualResponse, expectedResponse);
    });

    it('Does not update - Data was updated since last get', function() {
      //SETUP

      let expectedResponse = new Response(constants.RESPONSE_TYPES.EXISTS);
      let dataTokens = ['SET', 'ex_key', 53, 864100, '11'];
      let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

      SetCommandStrategy.parseDataBlock(dataTokens, dataBlock);
      dataTokens.push('123456');
        
      //EXEC
      let actualResponse = CasCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      //ASSERT
      assert.deepStrictEqual(actualResponse, expectedResponse);
    });

    it('Does not update - Item does not exist', function() {
      //SETUP

      let expectedResponse = new Response(constants.RESPONSE_TYPES.NOT_FOUND);
      let dataTokens = ['SET', 'ex_key', 53, 864100, '11', '123456'];
      let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

      //EXEC
      let actualResponse = CasCommandStrategy.parseDataBlock(dataTokens, dataBlock);

      //ASSERT
      assert.deepStrictEqual(actualResponse, expectedResponse);
    });

  });
});