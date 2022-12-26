const { Item, ItemColor, ItemDetail, ItemInformation, OptionImage } = require('../models');

class ItemRepository {

  createContent = async (title, price) => {
   return await Item.create({title, price});
  };
  
  createColor = async (color, itemId) => {
    return await ItemColor.create({color, itemId});
  }
  
  createItemDetail = async (gender, theme, category, itemId) => {
    return await ItemDetail.create({gender, theme, category, itemId});    
  }
  
  createItemInfo = async (content, src, material, itemId) => {
    return await ItemInformation.create({content, src, material, itemId});    
  }

  createOptionImage = async (src, itemId) => {
    return await OptionImage.create({src, itemId});
  }

}

module.exports = ItemRepository;
