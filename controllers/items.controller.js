const ItemService = require('../services/items.service');

class ItemController {
  itemService = new ItemService();
  
  createItem = async (req, res) => {
    const {gender, thema, category, title, price, mainImage, color, size, count, src, material} = req.body;
    await this.itemService.createItem({gender, thema, category, title, price, mainImage, color, size, count, src, material})
    }

    

  
}




module.exports = ItemController;
