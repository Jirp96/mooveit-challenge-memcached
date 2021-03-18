var assert = require('assert');
var ItemRepository = require('../src/ItemRepository');
var Item = require('../src/domain/Item');

describe('ItemRepository', function() {
  describe('#get()', function() {
    afterEach(function() {
      ItemRepository.delete('ex_key');
    });

    it('does not return expired key', function() {
      //SETUP
      let anItem = new Item([], 'test_key', -1, 1);
            
      //EXEC
      ItemRepository.add(anItem.key, anItem);        
      let newItem = ItemRepository.get(anItem.key);

      //ASSERTS
      assert.ok(!newItem);    
  });
    
    it('should update cas field on get', function() {
        //SETUP
        let anItem = new Item([], 'test_key', 100000, 1);
        anItem.updateCas();

        let oldCas = anItem.casUnique;
        
        //EXEC
        ItemRepository.add(anItem.key, anItem);        
        let newItem = ItemRepository.get(anItem.key);

        //ASSERTS
        assert.ok(newItem);
        assert.ok(newItem.casUnique);
        assert.notEqual(newItem.casUnique, oldCas);        
    });

    it('should update cas field on gets', function() {
        //SETUP
        let anItem = new Item([], 'test_key', 10000, 1);
        anItem.updateCas();

        let oldCas = anItem.casUnique;
        
        //EXEC
        ItemRepository.add(anItem.key, anItem);        
        let newItems = ItemRepository.gets([anItem.key]);

        //ASSERTS
        assert.equal(newItems.length, 1);
        assert.ok(newItems[0]);
        assert.ok(newItems[0].casUnique);
        assert.notEqual(newItems[0].casUnique, oldCas);
    });
  });
});