const { Op } = require('sequelize');

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
      throw new Error('해당 상품은 존재하지 않습니다.');
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
        throw new Error('이미 담긴 상품입니다.');
      } else {
        return true;
      }
    });

    if (!check) {
      throw new Error('이미 담긴 상품입니다.');
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

  // 위시리스트 옵션변경 상품조회
  updateGetItemInWishList = async (itemId, color, size) => {
    // todo
  };

  // 위시리스트 상품 제거
  deleteItemInWishList = async (wishListId) => {
    const findCartList = await this.wishListModel.findOne({
      where: {
        cartId: cartId,
      },
    });

    if (!findCartList) {
      throw new Error(
        '장바구니에 존재하지 않는 상품입니다. 관리자에게 문의하세요.'
      );
    }

    const deleteItem = await this.wishListModel.destroy({
      where: {
        userId: userId,
        cartId: cartId,
      },
    });

    return deleteItem;
  };
}

module.exports = WishListRepository;
