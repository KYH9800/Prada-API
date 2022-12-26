const ItemService = require('../services/items.service');

class ItemController {
  itemService = new ItemService();
  createItem = async (req, res) => {
    try {
      // const { userId } = res.locals.user;
      const { title, price } = req.body;
      const image = req.file.location;
      console.log(req.file);
      await this.itemService.createItem( title, price, image );
      return res.status(201).json({ message: '상품 추가 완료', result: true });
    } catch (error) {
      // console.error(error);
      if (error.code) {
        return res.status(err.code).json({ Message: err.message, result: false });
      } else {
        return res.status(400).json({ errorMessage: '상품 추가 실패', result: false });
      }
    }
  }

  createItemInformation = async (req, res) => {
    try {
      const { content, material } = req.body;
      await this.itemService.createItemInformation( content, material );
      return res.status(201).json({ message: '상품 추가 완료', result: true });
    } catch (error) {
      // console.error(error);
      if (error.code) {
        return res.status(err.code).json({ Message: err.message, result: false });
      } else {
        return res.status(400).json({ errorMessage: '상품 추가 실패', result: false });
      }
    }
  }

  createItemOption = async (req, res) => {
    try {
      const { color, size } = req.body;
      await this.itemService.createItemOption( color, size );
      return res.status(200).json({ message: '상품 추가 완료', result: true });
      } catch (error) {
        console.error(error);
        if (error.code) {
          return res.status(err.code).json({ Message: err.message, result: false });
        } else {
          return res.status(400).json({ errorMessage: '상품 추가 실패', result: false });
        }
      }
    }
}




module.exports = ItemController;
