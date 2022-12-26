const ItemRepository = require('../repositories/items.repository');

class ItemService {
  itemRepository = new ItemRepository();

  createItem = async (title, price, color, gender, theme, category, content, src, material) => {
    const createContent = await this.itemRepository.createContent(title, price);
    const createColor = await this.itemRepository.createColor(color,createContent.itemId);
    const createItemDetail = await this.itemRepository.createItemDetail(gender, theme, category,createContent.itemId);
    const createItemInfo = await this.itemRepository.createItemInfo(content, material,createContent.itemId);
    const createOptionImage = await this.itemRepository.createOptionImage(src,createContent.itemId);
  return {createContent, createColor, createItemDetail, createItemInfo, createOptionImage}
  };
  

  
}

module.exports = ItemService;
