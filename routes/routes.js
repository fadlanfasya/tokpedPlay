const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController.js');
const productController = require('../controllers/productController.js');
const commentController = require('../controllers/commentController.js');
const { catchErrors } = require("../handlers/errorHandler");
const userController = require('../controllers/userController.js');

router.get('/videos', videoController.getAll);
router.get('/videos/:id', videoController.getId);

router.get('/products', productController.getAll);

router.post('/videos/:id/comment', commentController.postData);

router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));



module.exports = router;