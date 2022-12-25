const ItemRepository = require('../repositories/items.repository');

class ItemService {
  itemRepository = new ItemRepository();

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
    if (!title) {
      throw Error('상품명이 입력되지 않았습니다.');
    }
    if (!price) {
      throw Error('가격이 입력되지 않았습니다.');
    }
    if (!color) {
      throw Error('색상이 입력되지 않았습니다.');
    }
    if (!content) {
      throw Error('상품 설명이 입력되지 않았습니다.');
    }
    if (!material) {
      throw Error('소재가 입력되지 않았습니다.');
    }
    if (!image) {
      throw Error('이미지가 추가되지 않았습니다.');
    }
    const item = await this.itemRepository.createItem(
      title,
      price,
      color,
      size,
      content,
      material,
      gender,
      thema,
      category
    );
    return item;
  };
}

module.exports = ItemService;
