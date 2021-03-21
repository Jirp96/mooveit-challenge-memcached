/* eslint-disable require-jsdoc */
class ItemRepository {
  constructor() {
    this.items = new Map();
  }

  add(key, item) {
    item.updateCas();
    this.items.set(key, item);
  }

  get(key) {
    const item = this.items.get(key);

    if ( !!item && item.isExpired() ) {
      this.items.delete(item.key);
      return undefined;
    }
    return item;
  }

  gets(keys) {
    const retItems = [];

    keys.forEach((key) => {
      const tmp = this.get(key);
      if ( tmp ) {
        retItems.push(tmp);
      }
    });

    return retItems;
  }

  exists(key) {
    return this.get(key) ? true : false;
  }

  delete(key) {
    return this.items.delete(key);
  }

  getSize() {
    return this.items.size;
  }

  getKeys() {
    return this.items.keys();
  }
}

module.exports = new ItemRepository();
