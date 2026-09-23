const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

router
  .route('/')
  .get(getProducts)
  .post(protect, admin, upload.single('imageFile'), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, upload.single('imageFile'), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
