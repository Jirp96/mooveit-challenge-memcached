const Item = require("./domain/Item");

class ItemRepository {
    constructor () {
        this.items = new Map();
    }

    add (key, item) {        
        this.items.set(key, item);
    }

    get (key) {
        return this.items.get(key);
    }

    gets (keys) {
        let retItems = [];

        keys.forEach(key => {
            let tmp = this.items.get(key);
            if ( tmp ){
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