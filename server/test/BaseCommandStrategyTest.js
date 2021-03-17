var assert = require('assert');
const BaseCommandStrategy = require('../src/parsers/BaseCommandStrategy');
const Response = require('../src/domain/Response');
const constants = require('../src/constants');
const Item = require('../src/domain/Item');

describe('BaseCommandStrategy', function() {
  describe('#validateData()', function() {
    it('Success', function() {
        let dataTokens = ['SET', 'ex_key', 53, 864100, 11];
        
        assert.ok(BaseCommandStrategy.validateData(dataTokens));
    });

    it ('Insufficient parameters', function() {
        let expectedErr = new Error("Invalid arguments for command.");
        let dataTokens = ['SET'];
        
        const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
        assert.throws(validateTest, expectedErr);
    });

    it ('Empty key', function() {
        let expectedErr = new Error('Key must not be empty.');
        let dataTokens = ['SET', '', 53, 864100, 11];
        
        const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
        assert.throws(validateTest, expectedErr);
    });

    it ('Invalid flags field', function() {
        let expectedErr = new Error("'Flags' field must be unsigned.");
        let dataTokens = ['SET', 'ex_key', -1, 864100, 11];
        
        const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
        assert.throws(validateTest, expectedErr);
    });

    it ('Invalid exptime field', function() {
        let expectedErr = new Error('exptime must be a number.');
        let dataTokens = ['SET', 'ex_key', 53, 'exptimeInvalido', 11];
        
        const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
        assert.throws(validateTest, expectedErr);
    });
  });

  describe('#executeCommand()', function() {
    it('Success', function() {
        //SETUP
        let dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
        let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];
        let expectedResponse = new Item(dataBlock.slice(0, dataBlock.length-2), 'ex_key', 864100, 53);

        //ASSERT
        assert.deepStrictEqual(BaseCommandStrategy.parseItem(dataTokens, dataBlock), expectedResponse);
    });

  });
});