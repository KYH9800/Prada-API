const express = require('express');
const router = express.Router();

// models
const {
  Item,
  ItemColor,
  OptionSize,
  ItemInformation,
  OptionImage,
} = require('../models');

// 전체 상품 조회 /admin
router.get('/', async (req, res) => {
  try {
    const allItems = await Item.findAll({
      include: [
        {
          model: ItemColor,
          attributes: ['color'],
        },
        {
          model: OptionSize,
          attributes: ['size', 'count'],
        },
        {
          model: ItemInformation,
          attributes: ['content', 'material'],
        },
        {
          model: OptionImage,
          attributes: ['src'],
        },
      ],
    });
    // console.log('allItems: ', allItems);
    return res.status(200).send({
      data: allItems,
    });
  } catch (error) {
    console.log(err);
    return res.status(400).send({ errorMessage: 'server error' });
  }
});

module.exports = router;
