const express = require('express');
const router = express.Router();
const {
  createOrder,
  handleSafepayRedirect,
  verifySafepayPayment,
  handleSafepayWebhook,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Soft auth middleware to capture user if token exists, but allow guest checkout
const optionalProtect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return protect(req, res, next);
  }
  next();
};

router
  .route('/')
  .post(optionalProtect, createOrder)
  .get(protect, admin, getOrders);

// Safepay Payment Routes
router.get('/safepay/redirect', handleSafepayRedirect);
router.post('/safepay/verify', verifySafepayPayment);
router.post('/safepay/webhook', handleSafepayWebhook);

router.get('/myorders', protect, getMyOrders);

router.get('/:id', getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;

