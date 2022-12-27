const CartRepository = require('../repositories/carts.repository');

const { Cart, Item, OptionImage, ItemColor, OptionSize } = require('../models');

class CartService {
  cartRepository = new CartRepository(
    Cart,
    Item,
    OptionImage,
    ItemColor,
    OptionSize
  );

  // 장바구니 상품 추가
  addItemInCart = async (itemId, userId) => {
    try {
      const addItemInCart = await this.cartRepository.addItemInCart(
        itemId,
        userId
      );
      // Cart에는 자동으로 foreignKey가 들어가고,
      // ItemId는 addItems 통해 주입해준다.
      await addItemInCart.addItems(itemId);
      // addItems: DB 작업이 끝나고 관계가 맵핑이 되면 그떄 사용 가능하다.
      return addItemInCart;
    } catch (error) {
      console.log(error);
    }
  };

  // 장바구니 상품 조회
  getItemInCart = async (userId) => {
    try {
      const userCart = await this.cartRepository.getItemInCart(userId);
      // console.log('userCart: ', userCart);
      // const cartItems = await userCart.getItems();
      return userCart;
    } catch (error) {
      console.log(error);
    }
  };

  // 장바구니 상품 제거
  deleteItemInCart = async (cartId, userId) => {
    try {
      const deleteItem = await this.cartRepository.deleteItemInCart(
        cartId,
        userId
      );
      // const removeCartList = deleteItem.removeItems(itemId);
      // console.log('removeCartList in Service: ', removeCartList);
      return deleteItem;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CartService;
