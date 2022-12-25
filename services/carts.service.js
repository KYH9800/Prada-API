const CartRepository = require('../repositories/carts.repository');

class CartService {
  cartRepository = new CartRepository();
}

module.exports = CartService;
