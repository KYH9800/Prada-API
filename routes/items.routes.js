const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/items.controller');
const itemController = new ItemController();
const upload = require('../middlewares/awsS3ItemMiddleware');


router.post('/', upload.single('mainImage'), itemController.createItem);
// router.post('/', upload.array('OptionImages', 5), itemController.createItem);
router.get('/:gender/:theme', itemController.findAllItem);
router.get('/:gender/:theme', (req, res) => {
    res.send(req.query.category);
})
// router.patch('/itemId', itemController);
// router.delete('/itemId', itemController);




module.exports = router;