const {
  Item,
  ItemColor,
  ItemDetail,
  ItemInformation,
  OptionImage,
  OptionSize,
} = require('../models');

class ItemRepository {
  //상품 생성
  createItemDetail = async ({ gender, theme, category }) => {
    // console.log("gender:",gender)
    // console.log("theme:",theme)
    // console.log("category:",category)
    //! ItemDetail 데이터베이스에 gender,theme, category가 일치하는 정보를 가져온다.
    try {
      return await ItemDetail.create({ gender, theme, category });
      // const some = await ItemDetail.findOne({
      //   where: {
      //     gender: gender,
      //     theme: theme,
      //     category: category
      //   },
      // })
      // console.log('some1: ', some)

      // if(!some){ // some 이 없다면
      //   console.log('some 이 없다면')
      //   return await ItemDetail.create({gender, theme, category});   // 해당하는 detail을 생성
      // }else{
      //   return some.itemDetailId // 이미 존재한다면 해당하는 detailId 값을 return
      // }
    } catch (error) {
      console.log(error);
    }
  };

  createContent = async (title, price, itemDetailId) => {
    try {
      console.log('title, price, itemDetailId: ', title, price, itemDetailId);

      return await Item.create({
        title: title,
        price: price,
        itemDetailId: itemDetailId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  createColor = async ({ color, itemId }) => {
    return await ItemColor.create({ color, itemId });
  };

  createItemInfo = async ({ content, src, material, itemId }) => {
    return await ItemInformation.create({ content, src, material, itemId });
  };

  createOptionImage = async ({ src, itemId }) => {
    return await OptionImage.create({ src, itemId });
  };

  createOptionSize = async ({ size, count, itemId }) => {
    return await OptionSize.create({ size, count, itemId });
  };

  //테마별, 카테고리별 상품 조회
  findAllItem = async ({ gender, theme, category }) => {
    try {
      const result = await ItemDetail.findAll({
        where: { gender, theme, category },
      });
      return result;
    } catch {
      throw {
        code: 412,
        errorMessage: '입력된 카테고리 형식이 올바르지 않습니다.',
      };
    }
  };
}

module.exports = ItemRepository;
