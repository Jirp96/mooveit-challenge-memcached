const Item = require("./domain/Item");

class ItemRepository {
    constructor () {
        this.items = new Map();
    }

    add (key, item) {        
        item.updateCas();
        this.items.set(key, item);
    }

    get (key) {
        let item = this.items.get(key);
        return item;
    }

    gets (keys) {
        let retItems = [];

        keys.forEach(key => {
            let tmp = this.items.get(key);
            if ( !!tmp ){
                retItems.push(tmp);
            }            
        });

        return retItems;
    }

    exists (key) {
        return this.items.has(key);
    }

    delete (key) {
        return this.items.delete(key);
    }
}

module.exports = new ItemRepository();