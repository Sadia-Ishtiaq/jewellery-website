const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order (COD) & reduce stock automatically
// @route   POST /api/orders
// @access  Public (Guest or Customer)
const createOrder = async (req, res) => {
  try {
    const { customerDetails, orderItems, paymentMethod = 'COD', notes } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    if (!customerDetails || !customerDetails.name || !customerDetails.phone || !customerDetails.address || !customerDetails.city) {
      return res.status(400).json({ success: false, message: 'Please complete name, phone, address, and city details' });
    }

    // Calculate Subtotal & Total
    // 1. Verify stock for all items in order first
    const productsToUpdate = [];
    for (const item of orderItems) {
      const prodId = item.product || item.id || item._id;
      if (prodId) {
        const productInDb = await Product.findById(prodId);
        if (productInDb) {
          if (productInDb.countInStock < Number(item.quantity)) {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for product "${productInDb.name}". Available stock: ${productInDb.countInStock}`
            });
          }
          productsToUpdate.push({ doc: productInDb, qty: Number(item.quantity) });
        }
      }
    }

    // 2. Calculate Subtotal & items to save
    let subtotal = 0;
    const itemsToSave = [];

    for (const item of orderItems) {
      const prodId = item.product || item.id || item._id || null;
      subtotal += Number(item.price) * Number(item.quantity);

      itemsToSave.push({
        product: prodId,
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
        image: item.image
      });
    }

    // 3. Deduct stock from database
    for (const { doc, qty } of productsToUpdate) {
      doc.countInStock = Math.max(0, doc.countInStock - qty);
      await doc.save();
    }

    const shippingFee = subtotal > 3000 ? 0 : 250; // Free delivery over PKR 3000
    const totalAmount = subtotal + shippingFee;

    const order = new Order({
      user: req.user ? req.user._id : null,
      customerDetails: {
        name: customerDetails.name,
        email: customerDetails.email || 'customer@sadiascollection.com',
        phone: customerDetails.phone,
        address: customerDetails.address,
        city: customerDetails.city
      },
      orderItems: itemsToSave,
      paymentMethod: 'COD',
      subtotal,
      shippingFee,
      totalAmount,
      status: 'Pending',
      notes: notes || ''
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Cash on Delivery confirmed.',
      order: createdOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public / Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (req.user && req.user.role !== 'admin' && order.user && order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to access this order' });
      }
      res.json({ success: true, order });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, isPaid } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      if (status) order.status = status;
      if (isPaid !== undefined) order.isPaid = isPaid;

      // If status updated to Delivered, mark paid
      if (status === 'Delivered') {
        order.isPaid = true;
      }

      const updatedOrder = await order.save();
      res.json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus
};
