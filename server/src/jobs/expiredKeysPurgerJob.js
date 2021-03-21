/* eslint-disable new-cap */
const ItemRepository = require('../ItemRepository');

const Job = () => {
  const run = () => {
    const keys = ItemRepository.getKeys();

    for (const key of keys) {
      ItemRepository.get(key);
    }
  };

  return {run};
};


module.exports = Job();

