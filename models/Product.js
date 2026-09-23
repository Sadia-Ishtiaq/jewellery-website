const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['anklet', 'bracelet', 'earrings', 'necklace', 'ring'],
      lowercase: true,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Product price in PKR is required'],
      min: 0
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      required: [true, 'Product image URL or path is required']
    },
    description: {
      type: String,
      default: 'Handcrafted luxury artificial jewellery item with premium finishing and tarnish-resistant coating.'
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    countInStock: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 25,
      min: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 5.0
    },
    numReviews: {
      type: Number,
      default: 12
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
