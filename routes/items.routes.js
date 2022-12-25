const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/items.controller');
const itemController = new ItemController();
const upload = require('../middlewares/awsS3ItemMiddleware');


router.post('/', upload.single('image'), itemController.createItem);


module.exports = router;