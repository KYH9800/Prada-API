const {
  Item,
  ItemColor,
  ItemDetail,
  ItemInformation,
  OptionImage,
  OptionSize,
} = require('../models');

class ItemRepository {
  // 카테고리 등록
  createItemDetail = async (gender, theme, category) => {
    try {
      return await ItemDetail.create({ gender, theme, category });
    } catch (error) {
      console.log(error);
    }
  };

  // 메인 상품정보 등록
  createContent = async (title, price, itemDetailId) => {
    try {
      // console.log('title, price, itemDetailId: ', title, price, itemDetailId);
      console.log('title: ', title);
      console.log('price: ', price);
      console.log('itemDetailId: ', itemDetailId);

      return await Item.create({
        title: title,
        price: price,
        itemDetailId: itemDetailId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 사이즈, 수량 등록
  createOptionSize = async (size, count, itemId) => {
    return await OptionSize.create({ size, count, itemId });
  };

  // 색상 등록
  createColor = async (color, itemId) => {
    return await ItemColor.create({ color, itemId });
  };

  // 상품 정보
  createItemInfo = async (content, material, itemId) => {
    return await ItemInformation.create({ content, material, itemId });
  };

  // 상품 이미지 등록
  createOptionImage = async (src, itemId, itemColorId) => {
    // src.map((v) => console.log('이미지 경로: ', typeof v.location));
    if (Array.isArray(src)) {
      // 이미지가 여러장이면 (배열로 있으면)
      // Promise.all의 장점: 비동기 처리를 병렬적으로 해서 더 빠르게 처리할 수 있다.
      // 비동기 처리가 실패했을 경우 중간에 어떤 함수가 에러를 냈을 때 그 실패를 즉시 반환한다.
      // await Promise.all(src.map((image) => await OptionImage.create({ src: image.location, itemId: itemId })))
      const images = src.map(
        async (image) =>
          await OptionImage.create({
            src: image.location,
            itemId: itemId,
            itemColorId: itemColorId,
          })
      );
      return images;
    } else {
      // 이미지가 한장이면
      const image = await OptionImage.create({ src, itemId, itemColorId });
      return image;
    }
  };

  //테마별, 카테고리별 상품 조회
  findAllItem = async (gender, theme) => {
    console.log('gender, theme: ', gender, theme);
    try {
      const items = await ItemDetail.findAll({
        where: {
          gender: gender,
          theme: theme,
        },
        include: [
          {
            model: Item,
          },
        ],
      });
      // console.log('genderItems: ', items);
      const where = {
        itemId: items.map((v) => v.Items.map((v) => v.itemId)),
      };

      const result = await Item.findAll({
        where,
        attributes: ['itemId', 'title', 'price'],
        include: [
          {
            model: OptionImage,
            attributes: ['src'],
          },
          {
            model: ItemColor,
            attributes: ['color'],
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

  findAllItemWithCategory = async (gender, theme, category) => {
    console.log('gender, theme, category: ', gender, theme, category);
    try {
      const items = await ItemDetail.findAll({
        where: {
          gender: gender,
          theme: theme,
          category: category,
        },
        include: [
          {
            model: Item,
          },
        ],
      });
      // console.log('genderItems: ', items);
      const where = {
        itemId: items.map((v) => v.Items.map((v) => v.itemId)),
      };

      const result = await Item.findAll({
        where,
        attributes: ['itemId', 'title', 'price'],
        include: [
          {
            model: OptionImage,
            attributes: ['optionImageId', 'src'],
          },
          {
            model: ItemColor,
            attributes: ['color'],
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

  // findAllItemWithCategory = async ({ itemId }) => {
  //   try {
  //     const result = await Item.findAll({
  //       where: { itemId },
  //       attributes: [
  //         'title',
  //         'price',
  //         'mainImage',
  //         [Sequelize.col('ItemColor.color'), 'color'],
  //         [Sequelize.col('OptionSize.size'), 'size'],
  //         [Sequelize.col('ItemInformation.content'), 'content'],
  //         [Sequelize.col('ItemInformation.material'), 'material'],
  //         [Sequelize.col('ItemInformation.mainImage'), 'mainImage'],
  //       ],

  //       include: [
  //         {
  //           model: ItemColor,
  //           as: 'itemId',
  //           required: true,

  //           attributes: [],
  //         },
  //       ],

  //       include: [
  //         {
  //           model: OptionSize,
  //           as: 'itemId',
  //           required: true,

  //           attributes: [],
  //         },
  //       ],

  //       include: [
  //         {
  //           model: ItemInformation,
  //           as: 'itemId',
  //           required: true,

  //           attributes: [],
  //         },
  //       ],
  //     });
  //     return result;
  //   } catch {
  //     throw {
  //       code: 412,
  //       errorMessage: '입력된 카테고리 형식이 올바르지 않습니다.',
  //     };
  //   } finally {
  //     const result = await ItemDetail.findAll({
  //       where: { gender, theme },
  //     });
  //     return result;
  //   }
  // };

  // 상품 삭제
  deleteItem = async ({ itemId }) => {
    return await Item.destroy({ where: { itemId } });
  };

  // 상품 상세 조회
  getItemDetailInformation = async (itemId) => {
    const item = await Item.findOne({
      where: {
        itemId: itemId,
      },
      attributes: ['itemId', 'title', 'price'],
      include: [
        {
          model: ItemColor,
          attributes: ['color'],
        },
        {
          model: OptionSize,
          attributes: ['size', 'count'],
        },
        {
          model: ItemInformation,
          attributes: ['content', 'material'],
        },
        {
          model: OptionImage,
          attributes: ['src'],
        },
      ],
    });

    if (!item) {
      throw new Error('상품을 찾을 수 없습니다.');
    }

    return item;
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
    const itemUpdate = await Item.update(
      {
        title: title,
        price: price,
      },
      {
        where: {
          itemId: itemId,
        },
      }
    );

    const optionColorUpdate = await ItemColor.update(
      {
        color: color,
      },
      {
        where: {
          itemId: itemId,
        },
      }
    );

    const optionSizeUpdate = await OptionSize.update(
      {
        size: size,
        count: count,
      },
      {
        where: {
          itemId: itemId,
        },
      }
    );

    const itemInformationUpdate = await ItemInformation.update(
      {
        content: content,
        material: material,
      },
      {
        where: {
          itemId: itemId,
        },
      }
    );

    // 이미지 수정
    const updateImage = async (src) => {
      // 이미지 삭제 후 새로 업로드
      // src.map(async (image) => {
      //   const deleteImages = await OptionImage.destroy({
      //     where: {
      //       itemId: itemId,
      //       // adminUserId: adminUserId // 관리자만 삭제 가능
      //     },
      //   });
      // });

      const itemColorId = await ItemColor.findOne({
        where: {
          itemId: itemId,
        },
      });

      if (Array.isArray(src)) {
        const images = src.map(
          async (image) =>
            await OptionImage.update(
              {
                src: image.location,
                itemId: itemId,
                itemColorId: itemColorId.itemColorId,
              },
              {
                where: {
                  itemId: itemId,
                },
              }
            )
        );
        return images;
      } else {
        // 이미지가 한장이면
        const image = await OptionImage.update(
          { src, itemId, itemColorId: itemColorId.itemColorId },
          {
            where: {
              itemId: itemId,
            },
          }
        );
        return image;
      }
    };
    return {
      itemUpdate,
      optionColorUpdate,
      optionSizeUpdate,
      itemInformationUpdate,
      updateImage,
    };
  };
}

module.exports = ItemRepository;
