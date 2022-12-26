const CartService = require('../services/carts.service');

class CartController {
  cartService = new CartService();

  addItemInCart = async (req, res) => {
    const { itemId } = req.params;

    const addItem = await this.cartService.addItemInCart(itemId);

    return addItem;
  };

  getItemInCart = async (req, res) => {
    // todo
  };

  deleteItemInCart = async (req, res) => {
    // todo
  };
}

module.exports = CartController;
