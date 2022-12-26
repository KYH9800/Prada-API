const { Item } = require('../models');

class ItemRepository {

  createItem = async (title, price, color, size, content, material, gender, thema, category, image) => {
    await Item.create({ title, price, color, size, content, material, gender, thema, category, image});

    return Item;
  };
}

module.exports = ItemRepository;
