/* eslint-disable max-len */
const assert = require('assert');
const BaseCommandStrategy = require('../src/parsers/BaseCommandStrategy');
const Item = require('../src/domain/Item');
const ItemRepository = require('../src/ItemRepository');

describe('BaseCommandStrategy', function() {
  describe('#validateData()', function() {
    it('Success', function() {
      const dataTokens = ['SET', 'ex_key', 53, 864100, 11];

      assert.ok(BaseCommandStrategy.validateData(dataTokens));
    });

    it('Insufficient parameters', function() {
      const expectedErr = new Error('Invalid arguments for command.');
      const dataTokens = ['SET'];

      const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
      assert.throws(validateTest, expectedErr);
    });

    it('Empty key', function() {
      const expectedErr = new Error('Key must not be empty.');
      const dataTokens = ['SET', '', 53, 864100, 11];

      const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
      assert.throws(validateTest, expectedErr);
    });

    it('Invalid flags field', function() {
      const expectedErr = new Error('\'Flags\' field must be unsigned.');
      const dataTokens = ['SET', 'ex_key', -1, 864100, 11];

      const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
      assert.throws(validateTest, expectedErr);
    });

    it('Invalid exptime field', function() {
      const expectedErr = new Error('exptime must be a number.');
      const dataTokens = ['SET', 'ex_key', 53, 'exptimeInvalido', 11];

      const validateTest = () => BaseCommandStrategy.validateData(dataTokens);
      assert.throws(validateTest, expectedErr);
    });
  });

  describe('#executeCommand()', function() {
    afterEach(function() {
      ItemRepository.delete('ex_key');
    });

    it('Success', function() {
      // SETUP
      const dataTokens = ['SET', 'ex_key', 53, 864100, '11\r\n'];
      const dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];
      const expectedResponse = new Item(dataBlock.slice(0, dataBlock.length-2), 'ex_key', 864100, 53);

      // ASSERT
      assert.deepStrictEqual(BaseCommandStrategy.parseItem(dataTokens, dataBlock), expectedResponse);
    });

    it('Success - No Reply', function() {
      // SETUP
      const dataTokens = ['SET', 'ex_key', 53, 864100, '11', 'noreply\r\n'];
      const dataBlock = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 13, 10];
      const expectedResponse = new Item(dataBlock.slice(0, dataBlock.length-2), 'ex_key', 864100, 53);

      // ASSERT
      assert.deepStrictEqual(BaseCommandStrategy.parseItem(dataTokens, dataBlock), expectedResponse);
    });
  });
});
