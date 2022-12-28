const ItemRepository = require('../repositories/items.repository');
const { ItemDetail } = require('../models');

class ItemService {
  itemRepository = new ItemRepository();

  //상품 등록
  createItem = async ({
    title,
    price,
    color,
    gender,
    theme,
    category,
    content,
    src,
    material,
    size,
    count,
  }) => {
    if (!title) {
      throw { errorMessage: '상품명이 등록되지 않았습니다.', code: 412 };
    }
    if (!price) {
      throw { errorMessage: '가격이 등록되지 않았습니다.', code: 412 };
    }
    if (!color) {
      throw { errorMessage: '색상이 등록되지 않았습니다.', code: 412 };
    }
    if (!content) {
      throw { errorMessage: '상품 설명이 등록되지 않았습니다.', code: 412 };
    }
    if (!material) {
      throw { errorMessage: '소재가 등록되지 않았습니다.', code: 412 };
    }
    if (!src) {
      throw { errorMessage: '이미지가 추가되지 않았습니다.', code: 412 };
    }
    const createItemDetail = await this.itemRepository.createItemDetail({
      gender,
      theme,
      category,
    });
    const createContent = await this.itemRepository.createContent(
      title,
      price,
      createItemDetail.itemDetailId
    );
    const createColor = await this.itemRepository.createColor({
      color,
      itemId: createContent.itemId,
    });
    const createItemInfo = await this.itemRepository.createItemInfo({
      content,
      src,
      material,
      itemId: createContent.itemId,
    });
    const createOptionImage = await this.itemRepository.createOptionImage({
      src,
      itemId: createContent.itemId,
    });
    const createOptionSize = await this.itemRepository.createOptionSize({
      size,
      count,
      itemId: createContent.itemId,
    });
    return {
      createContent,
      createColor,
      createItemDetail,
      createItemInfo,
      createOptionImage,
      createOptionSize,
    };
  };

  //테마, 카테고리별 상품 조회
  findAllItem = async ({ gender, theme, category }) => {
    if (!category) {
      const result = await this.itemRepository.findAllItem({
        gender: gender,
        theme: theme,
      });
      return result;
    } else {
      const result = await this.itemRepository.findAllItem({
        gender: gender,
        theme: theme,
        category: category,
      });
      return result;
    }
  };

  // 상품 삭제
  deleteItem = async ({ itemId }) => {
    const isExistItem = await this.itemRepository.deleteItem({ itemId });
    if (!isExistItem) {
      throw { code: 404, errorMessage: '상품이 존재하지 않습니다.' };
    } else {
      if (isExistItem) {
        return await this.itemRepository.deleteItem({ itemId });
      } else {
        throw {
          code: 400,
          message: '관리자 이외에 상품을 삭제할 수 없습니다.',
        };
      }
    }
  };
}

module.exports = ItemService;
