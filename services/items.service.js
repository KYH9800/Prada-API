const ItemRepository = require('../repositories/items.repository');

class ItemService {
  itemRepository = new ItemRepository();

  createItem = async ( title, price ) => {
    if (!title){
      throw Error ('상품명이 입력되지 않았습니다.')
    }
    if (!price){
      throw Error ('가격이 입력되지 않았습니다.')
    }
    return await this.itemRepository.createItem ({ title, content});
  };
}

module.exports = ItemService;
