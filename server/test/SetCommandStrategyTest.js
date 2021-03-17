var assert = require('assert');
const SetCommandStrategy = require('../src/parsers/SetCommandStrategy');
const Response = require('../src/domain/Response');
const constants = require('../src/constants');

describe('SetCommandStrategy', function() {
  describe('#executeCommand()', function() {
    it('Success', function() {
        //SETUP
        let expectedResponse = new Response(constants.RESPONSE_TYPES.STORED);
        let dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
        let dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];

        //ASSERT
        assert.deepStrictEqual(SetCommandStrategy.parseDataBlock(dataTokens, dataBlock), expectedResponse);
    });

  });
});