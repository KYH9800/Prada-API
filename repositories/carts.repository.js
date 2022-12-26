class CartRepository {
  constructor(ItemModel, CartModel) {
    this.cartModel = CartModel;
    this.itemModel = ItemModel;
  }

  addItemInCart = async (itemId) => {
    const userId = 1;

    const addItemInCart = this.cartModel.create({
      itemId: itemId,
      userId: userId,
    });

    return addItemInCart;
  };
}

module.exports = CartRepository;
