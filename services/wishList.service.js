const WishListRepository = require('../repositories/wishList.repository');

const {
  WishList,
  Item,
  OptionImage,
  ItemColor,
  OptionSize,
} = require('../models');

class WishListService {
  wishListRepository = new WishListRepository(
    WishList,
    Item,
    OptionImage,
    ItemColor,
    OptionSize
  );

  // 위시리스트 상품 추가
  addItemInWishList = async (itemId, userId) => {
    const addItemInWishList = await this.wishListRepository.addItemInWishList(
      itemId,
      userId
    );
    await addItemInWishList.addItems(itemId);
    return addItemInWishList;
  };

  // 위시리스트 상품 조회
  getItemInWishList = async (userId) => {
    const getItemInWishList = await this.wishListRepository.getItemInWishList(
      userId
    );
    // console.log('getItemInWishList: ', getItemInWishList);
    return getItemInWishList;
  };

  // 위시리스트 옵션변경 상품조회
  updateGetItemInWishList = async (itemId, color, size) => {
    try {
      const updateGetItemInWishList =
        await this.wishListRepository.updateGetItemInWishList(
          itemId,
          color,
          size
        );

      return updateGetItemInWishList;
    } catch (error) {
      console.log(error);
    }
  };

  // 위시리스트 상품 제거
  deleteItemInWishList = async (wishListId, userId) => {
    const deleteItemInWishList =
      await this.wishListRepository.deleteItemInWishList(wishListId, userId);

    return deleteItemInWishList;
  };
}

module.exports = WishListService;
