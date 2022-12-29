const { Op, Sequelize } = require('sequelize');

class WishListRepository {
  constructor(
    WishListModel,
    ItemModel,
    OptionImageModel,
    ItemColorModel,
    OptionSizeModel
  ) {
    this.wishListModel = WishListModel; // 위시리스트
    this.itemModel = ItemModel; // 아이템
    this.optionImageModel = OptionImageModel; // 옵션 이미지
    this.itemColorModel = ItemColorModel; // 색상
    this.optionSizeModel = OptionSizeModel; // 사이즈
  }

  // 위시리스트 상품 추가
  addItemInWishList = async (itemId, userId) => {
    const userWishList = await this.wishListModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: this.itemModel, // 관계 테이블 다 불러오기, include: [{...}]
        },
      ],
    });

    const findItem = await this.itemModel.findOne({
      where: {
        itemId: itemId,
      },
    });

    if (!findItem) {
      throw new Error('해당 상품은 존재하지 않습니다.'); //! response로 보내기
      // return { errorMessage: '이미 담긴 상품입니다.' };
    }

    const where = {
      itemId: {
        [Op.in]: userWishList.map((v) => v.Items.map((v) => v.itemId)),
      },
    };
    const item = await this.itemModel.findAll({
      where,
    });
    const itemCheck = item.map((v) => v.itemId);
    // console.log('itemCheck: ', itemCheck);
    const check = itemCheck.map((v) => {
      if (v === parseInt(itemId)) {
        throw new Error('이미 담긴 상품입니다.'); //! response로 보내기
        // return { errorMessage: '이미 담긴 상품입니다.' };
      } else {
        return true;
      }
    });

    if (!check) {
      throw new Error('이미 담긴 상품입니다.'); //! response로 보내기
    } else {
      const addItemInCart = this.wishListModel.create({
        itemId: itemId,
        userId: userId,
        count: 3,
      });
      return addItemInCart;
    }
  };

  // 위시리스트 상품 조회
  getItemInWishList = async (userId) => {
    const userWishList = await this.wishListModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: this.itemModel, // 관계 테이블 다 불러오기, include: [{...}]
        },
      ],
    });
    // userWishList.map((v) => console.log('test: ', v.Items));
    const where = {
      itemId: {
        [Op.in]: userWishList.map((v) => v.Items.map((v) => v.itemId)),
      },
    };
    const item = await this.itemModel.findAll({
      where,
      order: [['itemId', 'DESC']],
      include: [
        { model: this.optionImageModel },
        { model: this.itemColorModel },
        { model: this.optionSizeModel },
      ],
    });

    return item;
  };

  //* 위시리스트 옵션변경 상품조회
  updateGetItemInWishList = async (itemId, size, color) => {
    const result1 = await this.itemModel.findOne({
      where: { itemId: itemId },
      attributes: ['title', 'price'],
      raw: true, //잡종 값 제거
    });
    //색상 이미지
    const result2 = await this.itemColorModel.findAll({
      where: { itemId: itemId },
      attributes: ['color', [Sequelize.col('OptionImages.src'), 'src']],
      include: [
        {
          model: this.optionImageModel,
          as: 'OptionImages',
          attributes: [],
        },
      ],
      raw: true,
    });
    //사이즈
    const result3 = await this.optionSizeModel.findAll({
      where: { itemId: itemId },
      attributes: ['size'],
      raw: true,
    });

    const result = { ...result1, colors: result2, sizes: result3 };
    return result;

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // 받아온 itemId, size, color
    // OptionSize 찾아오기
    // size의 item 다 찾기
    // const findSize = await this.optionSizeModel.findAll({
    //   size: size,
    // });
    // // ItemColor 찾아오기 -> OptionImage도 찾아오기(1:N 관계 맺고)
    // // color의 item 다 찾기
    // const findColor = await this.itemColorModel.findAll({
    //   color: color,
    // });
    // // size와 color가 가진 공통의 item 찾기
    // const commonItemId = findSize.map((itemSize) => {
    //   findColor.map((itemColor) => {
    //     if (itemSize.itemId === itemColor.itemId) {
    //       return itemColor.itemId;
    //     }
    //   });
    // });
    // // 해당 itemId로 Item 찾기
    // const findItem = await this.itemModel.findOne({
    //   where: {
    //     itemId: commonItemId,
    //   },
    // });
    // //! 해당 아이템을 user의 위시리스트의 아이템으로 update
    // //! 결과 보내주기
  };

  // 위시리스트 상품 제거
  deleteItemInWishList = async (wishListId, userId) => {
    const findWishList = await this.wishListModel.findOne({
      where: {
        userId: userId,
      },
    });

    if (!findWishList) {
      throw new Error(
        '장바구니에 존재하지 않는 상품입니다. 관리자에게 문의하세요.'
      );
    }

    const deleteItem = await this.wishListModel.destroy({
      where: {
        userId: userId,
        wishListId: findWishList.wishListId,
      },
    });

    return deleteItem;
  };
}

module.exports = WishListRepository;
