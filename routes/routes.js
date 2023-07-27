const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController.js');
const productController = require('../controllers/productController.js');
const commentController = require('../controllers/commentController.js');

router.post('/videos', videoController.postData) 
router.get('/videos', videoController.getAll);
router.get('/videos/:id', videoController.getId);

router.post('/videos/:id/addproduct', productController.postData);
router.get('/products', productController.getAll);

router.post('/videos/:id/addcomment', commentController.postData) 

module.exports = router;