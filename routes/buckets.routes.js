const express = require('express');
const router = express.Router();

const BucketController = require('../controllers/buckets.controller');
const bucketController = new BucketController();

// router.get('/user/bucket', bucketController);

const {
  Item,
  ItemOption,
  ItemInventory,
  ItemInformation,
} = require('../models');

// 상품 추가
router.post('/', async (req, res) => {
  const {
    title, // 상품명
    price, // 가격
    color, // 색상
    size, // 사이즈
    content, // 상품 설명
    material, // 소재
    gender, // 성별
    thema, // 테마
    category, // 상세 카테고리
    image, // 이미지
  } = req.body;

  if (
    !title &&
    !price &&
    !color &&
    !size &&
    !content &&
    !material &&
    !gender &&
    !thema &&
    !category &&
    !image
  ) {
    throw new Error('상품 데이터 정보를 입력하세요.');
  }

  const item = await Item.create({
    adminUserId: 1,
    title: title,
    price: price,
    gender: gender,
    thema: thema,
    category: category,
  });

  const finditem = await Item.findOne({
    order: [['createdAt', 'DESC']],
  });
  // console.log('finditem: ', finditem);

  const itemOption = await ItemOption.create({
    itemId: finditem.itemId,
    color: color,
    size: size,
  });

  const itemInventory = await ItemInventory.create({
    itemId: finditem.itemId,
    image: image,
    count: 0, // 먼저 count를 찾아와 없으면 1, 있으면 +1
  });

  const itemInformation = await ItemInformation.create({
    itemId: finditem.itemId,
    content: content,
    material: material,
  });

  const allResult = await Item.findOne({
    where: {
      itemId: finditem.itemId,
    },
    include: [
      {
        model: ItemOption,
      },
      {
        model: ItemInventory,
      },
      {
        model: ItemInformation,
      },
    ],
  });

  return res.status(200).send({
    data: allResult,
  });
});

// 상품 상세 조회
router.get('/detail/:itemId', async (req, res) => {
  const { itemId } = req.params;

  const item = await Item.findOne({
    where: {
      itemId: itemId,
    },
    include: [
      {
        model: ItemOption,
      },
      {
        model: ItemInventory,
      },
      {
        model: ItemInformation,
      },
    ],
  });

  return res.status(200).send({
    data: item,
  });
});

module.exports = router;
