const ItemService = require('../services/items.service');

class ItemController {
  itemService = new ItemService();
  createItem = async (req, res) => {
    try {
      // const { userId } = res.locals.user;
      const {
        title,
        price,
        color,
        size,
        content,
        material,
        gender,
        thema,
        category,
      } = req.body;
      const image = req.file.location;
      console.log(req.file);
      await this.itemService.createItem(
        title,
        price,
        color,
        size,
        content,
        material,
        gender,
        thema,
        category,
        image
      );
      return res.status(201).json({ message: '상품 추가 완료', result: true });
    } catch (error) {
      console.error(error);
      if (error.code) {
        return res
          .status(err.code)
          .json({ Message: err.message, result: false });
      } else {
        console.log(error);
        return res
          .status(400)
          .json({ errorMessage: '상품 추가 실패', result: false });
      }
    }
  };
}

module.exports = ItemController;
