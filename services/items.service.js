const ItemRepository = require('../repositories/items.repository');

class ItemService {
  itemRepository = new ItemRepository();

  createItem = async ({gender, thema, category, title, price, mainImage, color, size, count, src, material}) => {
    await this.ItemRepository.findGender();


    if (!title){
      throw Error ('상품명이 입력되지 않았습니다.')
    }
    if (!price){
      throw Error ('가격이 입력되지 않았습니다.')
    }
    return await this.itemRepository.createItem ({title, content});
  };

  createItemInformation = async (content, material) => {
    if (!content){
      throw Error ('상품 설명이 입력되지 않았습니다.')
    }
    if(!material){
      throw Error ('상품 소재가 입력되지 않았습니다.')
    }
  };

  createItemColors = async (color) => {
    if (!color){
      throw Error ('색상이 입력되지 않았습니다.')
    }
  };

  createOptionSize = async (size, count) => {
    if (!size){
      throw Error ('사이즈가 입력되지 않았습니다.')
    }
    if (!count){
      throw Error ('수량이 입력되지 않았습니다.')
    }
  };

  createOptionImage = async (src) => {
    throw Error ('상품 이미지가 입력되지 않았습니다.')
  };
}

module.exports = ItemService;
