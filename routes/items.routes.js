const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/items.controller');
const itemController = new ItemController();
const upload = require('../middlewares/awsS3ItemMiddleware');

// router.post('/', upload.single('mainImage'), itemController.createItem);
// router.get('/:gender/:theme', itemController.findAllItem);
// router.get('/:itemId', itemController.findDetailItem);
// router.patch('/:itemId', itemController.updateItem);
router.delete('/:itemId', itemController.deleteItem);

module.exports = router;
