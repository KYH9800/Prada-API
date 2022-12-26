const {
  Gender, 
  Theme, 
  Category, 
  Item, 
  ItemColor, 
  ItemInformation, 
  OptionImage, 
  OptionSize
} = require('../models');

class ItemRepository {

  createGender = async ({gender}) => {
    return await Gender.create({gender})
  }

  createThema = async ({gender, thema}) => {
    return await Theme.create({gender, thema})
  }

  createCategory = async ({thema, category}) => {
    return await Category.create({thema,category})
  }

  createItem = async (title, price) => {
    return await Item.create({title, price});
  };

  createItemColors = async (color) => {
    return await ItemColor.create({color});
  };
  
  createItemInformation = async (content, material) => {
    return await ItemInformation.create({content, material});
  };

  createOptionImage = async (src) => {
    return await OptionImage.create({src});
  };

  createOptionSize = async (size, count) => {
    return await OptionSize.create({size, count});
  };

}

module.exports = ItemRepository;
