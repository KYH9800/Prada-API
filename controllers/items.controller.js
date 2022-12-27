const ItemService = require('../services/items.service');

class ItemController {
  itemService = new ItemService();

  //상품 등록
  createItem = async (req, res) => {
    try {
      const src = req.file.location;
      const {
        gender,
        theme,
        category,
        title,
        price,
        size,
        count,
        color,
        content,
        material,
      } = req.body;
      const createItem = await this.itemService.createItem({
        gender,
        theme,
        category,
        title,
        price,
        size,
        count,
        color,
        content,
        material,
      });
      return res
        .status(201)
        .json({ Message: '상품 등록 완료', data: createItem });
    } catch (err) {
      if (err.code) {
        return res.status(err.code).json({ errorMessage: err.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '상품 등록 실패' });
      }
    }
  };

  //테마, 카테고리별 상품 조회
  findAllItem = async (req, res) => {
    try {
      const { gender, theme } = req.params;
      const { category } = req.query;

      if (!gender || !theme || !category) {
        throw {
          code: 412,
          errorMessage: '입력값을 확인해주세요.',
        };
      }

      if (gender !== 'men' && gender !== 'women') {
        throw {
          code: 412,
          errorMessage: '입력된 성별 형식이 올바르지 않습니다.',
        };
      }
      // if (theme !== theme) {
      //   throw {
      //     code: 412,
      //     errorMessage: '입력된 테마 형식이 올바르지 않습니다.',
      //   };
      // }

      // 서비스한테 비즈니스 로직을 수행해서 값을 내놔라.
      const result = await this.itemService.findAllItem({
        gender,
        theme,
        category,
      });

      console.log('result test:', result);

      return res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      if (error.code) {
        res.status(error?.code).json({ errorMessage: error?.errorMessage });
      } else {
        res.status(500).json({ errorMessage: '알 수 없는 에러' });
      }
    }
  };
}

module.exports = ItemController;
