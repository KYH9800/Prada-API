const WishListService = require('../services/wishList.service');

class WishListController {
  wishListService = new WishListService();
  // 위시리스트 상품 추가
  addItemInWishList = async (req, res) => {
    try {
      const userId = 1;
      const { itemId } = req.params;
      const addItemInWishList = await this.wishListService.addItemInWishList(
        itemId,
        userId
      );

      return res.status(200).json({
        data: addItemInWishList,
        message: '위시리스트 추가 완료',
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

  // 위시리스트 상품 조회
  getItemInWishList = async (req, res) => {
    try {
      const userId = 1;
      const getItemInWishList = await this.wishListService.getItemInWishList(
        userId
      );

      return res.status(200).json({
        data: getItemInWishList,
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

  // 위시리스트 옵션변경 상품조회
  updateGetItemInWishList = async (req, res) => {
    try {
      const { itemId, size, color } = req.body;
      const updateGetItemInWishList =
        await this.wishListService.updateGetItemInWishList(itemId, size, color);

      return res.status(200).json({
        data: updateGetItemInWishList,
        result: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        errorMessage: error.message, // 해당 옵션의 상품이 존재하지 않습니다.
        result: false,
      });
    }
  };

  // 위시리스트 상품 제거
  deleteItemInWishList = async (req, res) => {
    try {
      const userId = 1;
      const { wishListId } = req.params;
      const deleteItemInWishList =
        await this.wishListService.deleteItemInWishList(wishListId, userId);

      return res.status(200).json({
        data: deleteItemInWishList,
        message: '위시리스트 상품 제거 완료',
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

module.exports = WishListController;
