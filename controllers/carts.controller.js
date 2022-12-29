const CartService = require('../services/carts.service');

class CartController {
  cartService = new CartService();

  // 장바구니 상품 추가
  addItemInCart = async (req, res) => {
    try {
      const { userId } = res.locals;
      const { itemId } = req.params;

      const addItem = await this.cartService.addItemInCart(itemId, userId);
      // console.log('CartService addItem: ', addItem);

      return res.status(200).json({
        data: addItem,
        message: '장바구니 추가 완료',
        result: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        errorMessage: error.message,
        result: false,
      });
    }
  };

  // 장바구니 상품 조회
  getItemInCart = async (req, res) => {
    try {
      const { userId } = res.locals;
      const userCart = await this.cartService.getItemInCart(userId);

      return res.status(200).json({
        data: userCart,
        result: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        errorMessage: error.message,
        result: false,
      });
    }
  };

  // 장바구니 상품 제거
  deleteItemInCart = async (req, res) => {
    try {
      const { userId } = res.locals;
      const { cartId } = req.params;
      console.log('cartId in Controller: ', cartId);

      const deleteItem = await this.cartService.deleteItemInCart(
        cartId,
        userId
      );

      return res.status(200).json({
        message: '장바구니 상품 삭제 완료',
        data: deleteItem,
        result: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        errorMessage: error.message,
        result: false,
      });
    }
  };
}

module.exports = CartController;
