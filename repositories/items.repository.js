const { Item } = require('../models');

class ItemRepository {
  
  createItem = async ( title, price, color, size, content, material, gender, thema, category, image ) => {
   const item = await Item.create({ title, price, color, size, content, material, gender, thema, category, image })
  
    return item;
  }
}

module.exports = ItemRepository;