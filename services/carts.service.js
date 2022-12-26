const CartRepository = require('../repositories/carts.repository');

const { Cart, Item } = require('../models');

class CartService {
  cartRepository = new CartRepository(Item, Cart);

  addItemInCart = async (itemId) => {
    const addItemInCart = await this.cartRepository.addItemInCart(itemId);

    return addItemInCart;
  };
}

module.exports = CartService;
