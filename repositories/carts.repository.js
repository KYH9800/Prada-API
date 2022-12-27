class CartRepository {
  constructor(
    ItemModel, // 아이템
    CartModel, // 장바구니
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

  addItemInCart = async (itemId, userId) => {
    // 상품에서 수량을 찾아온다.
    // 수령을 count에 넘김다.
    try {
      const addItemInCart = this.cartModel.create({
        itemId: itemId,
        userId: userId,
        count: 3,
      });
      // const cartItemList = await userCart.getItems();
      // console.log('cartItemList: ', cartItemList);
      return addItemInCart;
    } catch (error) {
      console.log(error);
    }
  };

  getItemInCart = async (userId) => {
    try {
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

      return userCart;
    } catch (error) {
      console.log(error);
    }
  };

  deleteItemInCart = async (cartId, userId) => {
    try {
      const deleteItem = await this.cartModel.destroy({
        where: {
          userId: userId,
          cartId: cartId,
        },
      });

      return deleteItem;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CartRepository;
