const { Item } = require('../models');

class ItemRepository {
  constructor(ItemModel) {
    this.itemModel = ItemModel;
  }

  createItem = async (
    title,
    price,
    color,
    size,
    content,
    material,
    gender,
    thema,
    category,
    image
  ) => {
    await Item.create({
      title,
      price,
      color,
      size,
      content,
      material,
      gender,
      thema,
      category,
      image,
    });

    return Item;
  };
}

module.exports = ItemRepository;
