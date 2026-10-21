const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: false, default: '' }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    customerDetails: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true }
    },
    orderItems: [orderItemSchema],
    paymentMethod: {
      type: String,
      default: 'COD',
      enum: ['COD', 'Safepay Card', 'Credit / Debit Card', 'CARD', 'Online Card Payment', 'Bank Transfer', 'Credit / Debit Card — Secure Online Payment', 'Cash on Delivery (COD)']
    },
    safepayTracker: {
      type: String,
      default: ''
    },
    safepayReference: {
      type: String,
      default: ''
    },
    cardDetails: {
      cardHolder: { type: String, default: '' },
      cardNumberMasked: { type: String, default: '' },
      expDate: { type: String, default: '' }
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
