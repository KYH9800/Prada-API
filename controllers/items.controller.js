const ItemService = require('../services/items.service');

class ItemController {
  itemService = new ItemService();
  
  createItem = async (req, res) => {
    const {title, price, color, gender, theme, category, content, material} = req.body;
    const src = req.file.location;
    const createItem = await this.itemService.createItem(title, price, color, gender, theme, category, content, src, material)
    return res.status(200).json({Message: '상품 등록 완료', data: createItem});
    }  
  
}




module.exports = ItemController;
