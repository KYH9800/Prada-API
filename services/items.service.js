const ItemRepository = require('../repositories/items.repository');
const { ItemDetail } = require('../models');

class ItemService {
  itemRepository = new ItemRepository();

  //상품 등록
  createItem = async (
    gender,
    theme,
    category,
    title,
    price,
    size,
    count,
    color,
    content,
    material,
    src
  ) => {
    if (!gender) {
      throw { errorMessage: '성별이 등록되지 않았습니다.', code: 412 };
    }
    if (!theme) {
      throw { errorMessage: '테마가 등록되지 않았습니다.', code: 412 };
    }
    if (!category) {
      throw { errorMessage: '카테고리가 등록되지 않았습니다.', code: 412 };
    }
    if (!title) {
      throw { errorMessage: '상품명이 등록되지 않았습니다.', code: 412 };
    }
    if (!price) {
      throw { errorMessage: '가격이 등록되지 않았습니다.', code: 412 };
    }
    if (!size) {
      throw { errorMessage: '사이즈가 등록되지 않았습니다.', code: 412 };
    }
    if (!count) {
      throw { errorMessage: '상품 수량이 등록되지 않았습니다.', code: 412 };
    }
    if (!color) {
      throw { errorMessage: '색상이 등록되지 않았습니다.', code: 412 };
    }
    if (!content) {
      throw { errorMessage: '상품 설명이 등록되지 않았습니다.', code: 412 };
    }
    if (!material) {
      throw { errorMessage: '소재가 등록되지 않았습니다.', code: 412 };
    } // console.log('src.location: ', src.length);
    if (src.length === 0) {
      throw { errorMessage: '이미지가 추가되지 않았습니다.', code: 412 };
    }

    // 카테고리 등록
    const createItemDetail = await this.itemRepository.createItemDetail(
      gender,
      theme,
      category
    );

    // 메인 상품정보 등록
    const createContent = await this.itemRepository.createContent(
      title, // 상품명
      price, // 가격
      createItemDetail.itemDetailId // 카테고리 테이블 아이디
    );

    // 사이즈, 수량 등록
    const createOptionSize = await this.itemRepository.createOptionSize(
      size, // 사이즈
      count, // 수량
      createContent.itemId // 상품 아이디
    );

    // 색상 등록
    const createColor = await this.itemRepository.createColor(
      color, // 색상
      createContent.itemId // 상품 아이디
    );

    // 상품 정보
    const createItemInfo = await this.itemRepository.createItemInfo(
      content, // 정보
      material, // 소재
      createContent.itemId // 상품 아이디
    );

    // 상품 옵션이미지 등록
    const createOptionImage = await this.itemRepository.createOptionImage(
      src, // 이미지 경로
      createContent.itemId, // 상품 아이디
      createColor.itemColorId // 아이템 색상 아이디
    );

    // 상품 메인이미지 등록
    const createMainImage = await this.itemRepository.createMainImage(
      src,
      createContent.itemId
    );

    return {
      ItemDetail: createItemDetail,
      Content: createContent,
      OptionSize: createOptionSize,
      Color: createColor,
      ItemInfo: createItemInfo,
      OptionImage: createOptionImage,
      MainImage: createMainImage,
    };
  };

  //테마, 카테고리별 상품 조회
  findAllItem = async (gender, theme, category) => {
    // 카테고리가 없으면
    if (!category) {
      const result = await this.itemRepository.findAllItem(gender, theme);

      return result;
    } else {
      console.log('여기');
      const result = await this.itemRepository.findAllItemWithCategory(
        gender,
        theme,
        category
      );

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

  // 상품 상세 조회
  getItemDetailInformation = async (itemId) => {
    const findOneItem = await this.itemRepository.getItemDetailInformation(
      itemId
    );

    return findOneItem;
  };

  // 상품 수정
  patchItem = async (
    itemId, // 상품 아이디
    title, // 상품명
    price, // 가격
    color, // 색상
    size, // 사이즈
    count, // 수량
    content, // 상품 설명
    material, // 소재
    src // 이미지 경로
  ) => {
    if (!title) {
      throw { errorMessage: '상품명이 등록되지 않았습니다.', code: 412 };
    }
    if (!price) {
      throw { errorMessage: '가격이 등록되지 않았습니다.', code: 412 };
    }
    if (!color) {
      throw { errorMessage: '색상이 등록되지 않았습니다.', code: 412 };
    }
    if (!size) {
      throw { errorMessage: '사이즈가 등록되지 않았습니다.', code: 412 };
    }
    if (!count) {
      throw { errorMessage: '상품 수량이 등록되지 않았습니다.', code: 412 };
    }
    if (!content) {
      throw { errorMessage: '상품 설명이 등록되지 않았습니다.', code: 412 };
    }
    if (!material) {
      throw { errorMessage: '소재가 등록되지 않았습니다.', code: 412 };
    }
    if (src.length === 0) {
      throw { errorMessage: '이미지가 추가되지 않았습니다.', code: 412 };
    }

    const updateItem = await this.itemRepository.patchItem(
      itemId, // 상품 아이디
      title, // 상품명
      price, // 가격
      color, // 색상
      size, // 사이즈
      count, // 수량
      content, // 상품 설명
      material, // 소재
      src // 이미지 경로
    );

    return updateItem;
  };
}

module.exports = ItemService;
