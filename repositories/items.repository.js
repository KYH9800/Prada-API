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
  findAllItem = async ({ gender, theme }) => {
    try {
      const itemsId = await ItemDetail.findAll({
        where: { gender, theme },
        attributes: ['itemId'],
      });
      return itemsId;
    } catch {
      throw {
        code: 412,
        errorMessage: '입력된 카테고리 형식이 올바르지 않습니다.',
      };
    }
  };

  //상품 추가 후 테스트 하면서 진행필요. 221228_0840AM KYS
  findItemFromItemTable = async ({ itemId }) => {
    try {
      const result = await Item.findAll({
        where: { itemId },
        attributes: [
          'title',
          'price',
          'mainImage',
          [Sequelize.col('ItemColor.color'), 'color'],
          [Sequelize.col('OptionSize.size'), 'size'],
          [Sequelize.col('ItemInformation.content'), 'content'],
          [Sequelize.col('ItemInformation.material'), 'material'],
          [Sequelize.col('ItemInformation.mainImage'), 'mainImage'],
        ],

        include: [
          {
            model: ItemColor,
            as: 'itemId',
            required: true,

            attributes: [],
          },
        ],

        include: [
          {
            model: OptionSize,
            as: 'itemId',
            required: true,

            attributes: [],
          },
        ],

        include: [
          {
            model: ItemInformation,
            as: 'itemId',
            required: true,

            attributes: [],
          },
        ],
      });
      return result;
    } catch {
      throw {
        code: 412,
        errorMessage: '입력된 카테고리 형식이 올바르지 않습니다.',
      };
    }
  };

  findAllItemcate = async ({ gender, theme, category }) => {
    try {
      const itemsId = await ItemDetail.findAll({
        where: { gender, theme, category },
        attributes: ['itemId'],
      });
      return itemsId;
    } catch {
      throw {
        code: 412,
        errorMessage: '입력된 카테고리 형식이 올바르지 않습니다.',
      };
    }
  };

  findAllItemWithCategory = async ({ itemId }) => {
    try {
      const result = await Item.findAll({
        where: { itemId },
        attributes: [
          'title',
          'price',
          'mainImage',
          [Sequelize.col('ItemColor.color'), 'color'],
          [Sequelize.col('OptionSize.size'), 'size'],
          [Sequelize.col('ItemInformation.content'), 'content'],
          [Sequelize.col('ItemInformation.material'), 'material'],
          [Sequelize.col('ItemInformation.mainImage'), 'mainImage'],
        ],

        include: [
          {
            model: ItemColor,
            as: 'itemId',
            required: true,

            attributes: [],
          },
        ],

        include: [
          {
            model: OptionSize,
            as: 'itemId',
            required: true,

            attributes: [],
          },
        ],

        include: [
          {
            model: ItemInformation,
            as: 'itemId',
            required: true,

            attributes: [],
          },
        ],
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
