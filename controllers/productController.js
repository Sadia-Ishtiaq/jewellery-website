const Product = require('../models/Product');

// @desc    Get all products with search, filter, sort & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 100 } = req.query;

    let query = {};

    // Search keyword
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOptions = {};
    if (sort === 'price-low') {
      sortOptions.price = 1;
    } else if (sort === 'price-high') {
      sortOptions.price = -1;
    } else if (sort === 'name') {
      sortOptions.name = 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limitNum)
      .skip(skip);

    res.json({
      success: true,
      count,
      page: pageNum,
      pages: Math.ceil(count / limitNum),
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // Find related products in the same category
      const related = await Product.find({
        category: product.category,
        _id: { $ne: product._id }
      }).limit(4);

      res.json({ success: true, product, related });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, category, price, originalPrice, description, sku, countInStock, isFeatured } = req.body;

    let image = req.body.image;
    if (req.file) {
      image = req.file.path && req.file.path.startsWith('http')
        ? req.file.path
        : `images/uploads/${req.file.filename}`;
    }

    if (!name || !category || !price || !image) {
      return res.status(400).json({ success: false, message: 'Name, category, price and image are required' });
    }

    const product = await Product.create({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: category.toLowerCase(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.3),
      image,
      description: description || 'Handcrafted luxury artificial jewellery piece.',
      sku: sku || `SADIA-${Math.floor(1000 + Math.random() * 9000)}`,
      countInStock: countInStock !== undefined ? Number(countInStock) : 25,
      isFeatured: isFeatured === 'true' || isFeatured === true
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.category = req.body.category ? req.body.category.toLowerCase() : product.category;
      product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
      product.originalPrice = req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : product.originalPrice;
      product.description = req.body.description || product.description;
      product.sku = req.body.sku || product.sku;
      product.countInStock = req.body.countInStock !== undefined ? Number(req.body.countInStock) : product.countInStock;
      product.isFeatured = req.body.isFeatured !== undefined ? (req.body.isFeatured === 'true' || req.body.isFeatured === true) : product.isFeatured;

      if (req.file) {
        product.image = req.file.path && req.file.path.startsWith('http')
          ? req.file.path
          : `images/uploads/${req.file.filename}`;
      } else if (req.body.image) {
        product.image = req.body.image;
      }

      const updatedProduct = await product.save();
      res.json({ success: true, product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
