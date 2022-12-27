class WishListRepository {
  constructor(
    WishListModel,
    ItemModel,
    OptionImageModel,
    ItemColorModel,
    OptionSizeModel
  ) {
    this.wishListModel = WishListModel;
    this.itemModel = ItemModel;
    this.optionImageModel = OptionImageModel;
    this.itemColorModel = ItemColorModel;
    this.optionSizeModel = OptionSizeModel;
  }

  // 위시리스트 상품 추가
  addItemInWishList = async (itemId) => {
    // todo
  };

  // 위시리스트 상품 조회
  getItemInWishList = async (userId) => {
    // todo
  };

  // 위시리스트 옵션변경 상품조회
  updateGetItemInWishList = async (itemId, color, size) => {
    // todo
  };

  // 위시리스트 상품 제거
  deleteItemInWishList = async (wishListId) => {
    // todo
  };
}

module.exports = WishListRepository;
