const { Op } = require('sequelize');

class CartRepository {
  constructor(
    CartModel, // 장바구니
    ItemModel, // 아이템
    OptionImageModel, // 아이템 옵션 이미지
    ItemColorModel, // 색상
    OptionSizeModel // 사이즈
  ) {
    this.cartModel = CartModel; // 장바구니
    this.itemModel = ItemModel; // 아이템
    this.optionImageModel = OptionImageModel; // 옵션 이미지
    this.itemColorModel = ItemColorModel; // 색상
    this.optionSizeModel = OptionSizeModel; // 사이즈
  }

  // 장바구니 상품 추가
  addItemInCart = async (itemId, userId) => {
    // 상품에서 수량을 찾아온다.
    // 수령을 count에 넘김다.
    const userCart = await this.cartModel.findAll({
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
        [Op.in]: userCart.map((v) => v.Items.map((v) => v.itemId)),
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
      const addItemInCart = this.cartModel.create({
        itemId: itemId,
        userId: userId,
        count: 3,
      });
      return addItemInCart;
    }
  };

  // 장바구니 상품 조회
  getItemInCart = async (userId) => {
    const userCart = await this.cartModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: this.itemModel, // 관계 테이블 다 불러오기, include: [{...}]
        },
      ],
    });
    // userCart.map((v) => console.log('test: ', v.Items));
    const where = {
      itemId: {
        [Op.in]: userCart.map((v) => v.Items.map((v) => v.itemId)),
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

  deleteItemInCart = async (cartId, userId) => {
    const findCartList = await this.cartModel.findOne({
      where: {
        userId: userId,
      },
    });

    if (!findCartList) {
      throw new Error(
        '장바구니에 존재하지 않는 상품입니다. 관리자에게 문의하세요.'
      );
    }

    const deleteItem = await this.cartModel.destroy({
      where: {
        userId: userId,
        cartId: findCartList.cartId,
      },
    });

    return deleteItem;
  };
}

module.exports = CartRepository;

// 장바구니 상품 추가
// addItemInCart = async (itemId, userId) => {
//   // 상품에서 수량을 찾아온다.
//   // 수령을 count에 넘김다.
//   try {
//     const addItemInCart = this.cartModel.create({
//       itemId: itemId,
//       userId: userId,
//       count: 3,
//     });
//     // const cartItemList = await userCart.getItems();
//     // console.log('cartItemList: ', cartItemList);
//     return addItemInCart;
//   } catch (error) {
//     console.log(error);
//   }
// };
