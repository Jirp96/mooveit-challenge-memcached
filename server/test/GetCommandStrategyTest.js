var assert = require('assert');
const GetCommandStrategy = require('../src/parsers/GetCommandStrategy');
const RetrievalResponse = require('../src/domain/RetrievalResponse');
const constants = require('../src/constants');
const Item = require('../src/domain/Item');
const ItemRepository = require('../src/ItemRepository');

describe('GetCommandStrategy', function() {
  describe('#validateData()', function() {
    it('Success', function() {
        let dataTokens = ['GET', 'ex_key'];
        
        assert.ok(GetCommandStrategy.validateData(dataTokens));
    });

    it ('Insufficient parameters', function() {
        let expectedErr = new Error("Invalid arguments for command.");
        let dataTokens = ['GET'];
        
        const validateTest = () => GetCommandStrategy.validateData(dataTokens);
        assert.throws(validateTest, expectedErr);
    });

    it ('Empty key', function() {
        let expectedErr = new Error("There must be at least one key.");
        let dataTokens = ['GET', ''];
        
        const validateTest = () => GetCommandStrategy.validateData(dataTokens);
        assert.throws(validateTest, expectedErr);
    });
  });

  describe('#parseCommand()', function() {
    it('Success', function() {
        //SETUP
        let dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
        let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];
        let item = new Item(dataBlock.slice(0,dataBlock.length-2), 'ex_key', 864100, 53);
        let expectedResponse = new RetrievalResponse(constants.RESPONSE_TYPES.RETRIEVAL_SUCCESS, [item]);

        ItemRepository.add('ex_key', item);

        //EXEC
        let actualResult = GetCommandStrategy.parseCommandLine(dataTokens, dataBlock);

        //ASSERT
        assert.deepStrictEqual(actualResult, expectedResponse);
    });

  });
});