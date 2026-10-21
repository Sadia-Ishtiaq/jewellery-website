const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order (COD) & reduce stock automatically
// @route   POST /api/orders
// @access  Public (Guest or Customer)
const createOrder = async (req, res) => {
  try {
    const { customerDetails, orderItems, paymentMethod = 'COD', notes } = req.body;
    const isSafepay = paymentMethod.includes('Safepay') || paymentMethod.includes('Card') || paymentMethod.includes('Credit') || paymentMethod.includes('Online');

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    if (!customerDetails || !customerDetails.name || !customerDetails.phone || !customerDetails.address || !customerDetails.city) {
      return res.status(400).json({ success: false, message: 'Please complete name, phone, address, and city details' });
    }

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
        image: item.image || item.img || '/images/placeholder.jpg'
      });
    }

    // 3. Deduct stock from database
    for (const { doc, qty } of productsToUpdate) {
      doc.countInStock = Math.max(0, doc.countInStock - qty);
      await doc.save();
    }

    const shippingFee = subtotal > 3000 ? 0 : 250; // Free delivery over PKR 3000
    const totalAmount = subtotal + shippingFee;

    // Dynamically reload environment variables to capture newly added .env credentials
    require('dotenv').config();

    // 4. Safepay Hosted Express Checkout Initialization (Server-Side)
    let safepayTracker = '';
    let safepayTbt = '';
    let checkoutUrl = '';

    const safepayBaseUrl = (process.env.SAFEPAY_BASE_URL || 'https://sandbox.api.getsafepay.com').replace(/\/+$/, '');
    const safepayEnv = process.env.SAFEPAY_ENVIRONMENT || 'sandbox';
    const apiKey = (process.env.SAFEPAY_SECRET_KEY || process.env.SAFEPAY_API_KEY || '').trim();
    const publicKey = (process.env.SAFEPAY_PUBLIC_KEY || apiKey).trim();

    if (isSafepay) {
      const nameParts = (customerDetails.name || '').trim().split(' ');
      const firstName = nameParts[0] || 'Valued';
      const lastName = nameParts.slice(1).join(' ') || 'Customer';

      if (apiKey && !apiKey.includes('YOUR_SAFEPAY')) {
        // Step 1: Create Order Payment Tracker Session
        try {
          const sfpyRes = await fetch(`${safepayBaseUrl}/order/v1/init`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-SFPY-API-KEY': apiKey
            },
            body: JSON.stringify({
              environment: safepayEnv,
              client: publicKey,
              amount: totalAmount,
              currency: 'PKR',
              customer: {
                first_name: firstName,
                last_name: lastName,
                email: customerDetails.email || 'customer@sadiascollection.com',
                phone: customerDetails.phone || ''
              },
              billing: {
                name: customerDetails.name,
                address_1: customerDetails.address,
                city: customerDetails.city,
                country: 'PK'
              }
            })
          });

          const sfpyData = await sfpyRes.json();
          if (sfpyData && sfpyData.data && sfpyData.data.token) {
            safepayTracker = sfpyData.data.token;
          } else if (sfpyData && sfpyData.token) {
            safepayTracker = sfpyData.token;
          }
        } catch (sfErr) {
          console.warn('[Safepay Tracker Warning] Payment session creation failed:', sfErr.message);
        }

        // Step 2: Create Passport Authentication Token (TBT)
        try {
          const passportRes = await fetch(`${safepayBaseUrl}/client/passport/v1/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-SFPY-MERCHANT-SECRET': apiKey
            }
          });

          const passportData = await passportRes.json();
          if (passportData && passportData.data && passportData.data.token) {
            safepayTbt = passportData.data.token;
          } else if (passportData && passportData.token) {
            safepayTbt = passportData.token;
          }
        } catch (passErr) {
          console.warn('[Safepay Passport Warning] Authentication token creation failed:', passErr.message);
        }
      }

      // Step 3: Construct Official Safepay Hosted Checkout URL
      const appBaseUrl = (process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');
      const redirectUrl = `${appBaseUrl}/api/orders/safepay/redirect?orderId=PLACEHOLDER_ORDER_ID`;
      const cancelUrl = `${appBaseUrl}/index.html?payment=safepay&status=cancel&orderId=PLACEHOLDER_ORDER_ID`;

      const queryParams = new URLSearchParams({
        beacon: safepayTracker || 'test_tracker',
        env: safepayEnv,
        source: 'hosted',
        redirect_url: redirectUrl,
        cancel_url: cancelUrl
      });

      if (safepayTbt) {
        queryParams.set('tbt', safepayTbt);
      }

      checkoutUrl = `${safepayBaseUrl}/checkout/pay?${queryParams.toString()}`;

      console.log(`[Safepay Checkout Initiated] Amount: PKR ${totalAmount} | Env: ${safepayEnv} | Tracker: ${safepayTracker} | TBT Token: ${safepayTbt ? 'Active' : 'None'}`);
      console.log(`[Safepay Checkout URL] ${checkoutUrl}`);
    }

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
      paymentMethod: isSafepay ? 'Credit / Debit Card' : 'COD',
      safepayTracker: safepayTracker,
      isPaid: false, // CRITICAL: Always false until server-side Safepay verification!
      subtotal,
      shippingFee,
      totalAmount,
      status: 'Pending',
      notes: notes || ''
    });

    const createdOrder = await order.save();

    // Replace placeholder with actual created MongoDB Order ID in redirect URLs
    if (checkoutUrl) {
      checkoutUrl = checkoutUrl.replace(/PLACEHOLDER_ORDER_ID/g, createdOrder._id.toString());
    }

    res.status(201).json({
      success: true,
      message: isSafepay
        ? 'Order initiated. Redirecting to secure card payment portal...'
        : 'Order placed successfully! Cash on Delivery confirmed.',
      order: createdOrder,
      checkoutUrl: checkoutUrl,
      trackerToken: safepayTracker
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Handle Safepay browser return redirect
// @route   GET /api/orders/safepay/redirect
// @access  Public / Shopper Return
const handleSafepayRedirect = async (req, res) => {
  try {
    const { orderId, tracker, beacon } = req.query;
    const trackerToken = tracker || beacon || '';

    const appBaseUrl = (process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');

    if (!orderId) {
      return res.redirect(`${appBaseUrl}/index.html?payment=safepay&status=cancel`);
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.redirect(`${appBaseUrl}/index.html?payment=safepay&status=cancel`);
    }

    const tokenToVerify = trackerToken || order.safepayTracker;
    const safepayBaseUrl = (process.env.SAFEPAY_BASE_URL || 'https://sandbox.api.getsafepay.com').replace(/\/+$/, '');
    const apiKey = (process.env.SAFEPAY_SECRET_KEY || process.env.SAFEPAY_API_KEY || '').trim();

    let isVerifiedSuccess = false;
    let reference = tokenToVerify || 'REF-SFPY-' + Math.floor(100000 + Math.random() * 900000);

    if (apiKey && !apiKey.includes('YOUR_SAFEPAY') && tokenToVerify && tokenToVerify !== 'test_tracker') {
      try {
        const verifyRes = await fetch(`${safepayBaseUrl}/order/v1/tracker?token=${tokenToVerify}`, {
          method: 'GET',
          headers: {
            'X-SFPY-API-KEY': apiKey
          }
        });

        const verifyData = await verifyRes.json();
        const trackerData = verifyData?.data || verifyData;

        if (trackerData) {
          const state = trackerData.state || trackerData.status || '';
          if (
            state === 'TRACKER_ENDED' ||
            state === 'TRACKER_COMPLETED' ||
            state === 'PAID' ||
            trackerData.completed === true
          ) {
            isVerifiedSuccess = true;
            reference = trackerData.reference || trackerData.token || reference;
          }
        }
      } catch (sfErr) {
        console.error('[Safepay Redirect Server Verification Error]', sfErr.message);
      }
    }

    if (isVerifiedSuccess) {
      order.isPaid = true;
      order.status = 'Confirmed';
      order.safepayTracker = tokenToVerify || order.safepayTracker;
      order.safepayReference = reference;
      await order.save();

      return res.redirect(`${appBaseUrl}/index.html?payment=safepay&status=success&orderId=${order._id}&tracker=${tokenToVerify}`);
    } else {
      // Return to cancel view without marking as paid
      return res.redirect(`${appBaseUrl}/index.html?payment=safepay&status=cancel&orderId=${order._id}`);
    }
  } catch (error) {
    console.error('[Safepay Redirect Handler Error]', error);
    const appBaseUrl = (process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');
    return res.redirect(`${appBaseUrl}/index.html?payment=safepay&status=cancel`);
  }
};

// @desc    Verify Safepay payment server-side (API Verification Endpoint)
// @route   POST /api/orders/safepay/verify
// @access  Public / Customer
const verifySafepayPayment = async (req, res) => {
  try {
    const { orderId, trackerToken } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // If order is already paid via webhook or redirect, return success immediately
    if (order.isPaid) {
      return res.json({
        success: true,
        message: 'Safepay payment verified and confirmed.',
        order
      });
    }

    const safepayBaseUrl = (process.env.SAFEPAY_BASE_URL || 'https://sandbox.api.getsafepay.com').replace(/\/+$/, '');
    const apiKey = (process.env.SAFEPAY_SECRET_KEY || process.env.SAFEPAY_API_KEY || '').trim();

    let isVerifiedSuccess = false;
    let reference = trackerToken || order.safepayTracker || 'REF-SFPY-' + Math.floor(100000 + Math.random() * 900000);
    const tokenToVerify = trackerToken || order.safepayTracker;

    if (apiKey && !apiKey.includes('YOUR_SAFEPAY') && tokenToVerify && tokenToVerify !== 'test_tracker') {
      try {
        const verifyRes = await fetch(`${safepayBaseUrl}/order/v1/tracker?token=${tokenToVerify}`, {
          method: 'GET',
          headers: {
            'X-SFPY-API-KEY': apiKey
          }
        });

        const verifyData = await verifyRes.json();
        const trackerData = verifyData?.data || verifyData;

        if (trackerData) {
          const state = trackerData.state || trackerData.status || '';
          if (
            state === 'TRACKER_ENDED' ||
            state === 'TRACKER_COMPLETED' ||
            state === 'PAID' ||
            trackerData.completed === true
          ) {
            isVerifiedSuccess = true;
            reference = trackerData.reference || trackerData.token || reference;
          }
        }
      } catch (sfErr) {
        console.error('[Safepay API Verification Error]', sfErr.message);
      }
    }

    if (isVerifiedSuccess) {
      order.isPaid = true;
      order.status = 'Confirmed';
      order.safepayTracker = tokenToVerify || order.safepayTracker;
      order.safepayReference = reference;
      await order.save();

      return res.json({
        success: true,
        message: 'Safepay payment verified successfully!',
        order
      });
    } else {
      order.isPaid = false;
      await order.save();

      return res.status(400).json({
        success: false,
        message: 'Safepay payment verification failed or payment was not completed.',
        order
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// In-memory idempotency cache for processed webhook event IDs
const processedWebhookEvents = new Set();

// @desc    Handle Safepay Webhooks (Server-to-Server Async Payment Updates)
// @route   POST /api/orders/safepay/webhook
// @access  Public / Safepay Server Callback
const handleSafepayWebhook = async (req, res) => {
  try {
    const crypto = require('crypto');

    // 1. Webhook Secret Configuration Check (Fail safely if unconfigured)
    const webhookSecret = (process.env.SAFEPAY_WEBHOOK_SECRET || process.env.SAFEPAY_SECRET_KEY || '').trim();
    if (!webhookSecret || webhookSecret.includes('YOUR_SAFEPAY')) {
      console.error('[Safepay Webhook Error] Webhook signing secret is not configured on the server. Rejecting untrusted webhook.');
      return res.status(500).json({ success: false, message: 'Webhook signing secret not configured on server' });
    }

    // 2. Extract Webhook Signature Header
    const signatureHeader = (
      req.headers['x-sfpy-signature'] ||
      req.headers['X-SFPY-SIGNATURE'] ||
      ''
    ).trim();

    if (!signatureHeader) {
      console.warn('[Safepay Webhook Warning] Missing X-SFPY-SIGNATURE header. Webhook rejected.');
      return res.status(400).json({ success: false, message: 'Missing webhook signature header' });
    }

    // 3. Extract & Validate Optional Timestamp Header (Freshness Window)
    const timestampHeader = (
      req.headers['x-sfpy-timestamp'] ||
      req.headers['X-SFPY-TIMESTAMP'] ||
      ''
    ).trim();

    if (timestampHeader) {
      const eventTime = new Date(timestampHeader).getTime();
      const now = Date.now();
      const toleranceMs = 5 * 60 * 1000; // 5-minute tolerance
      if (!isNaN(eventTime) && Math.abs(now - eventTime) > toleranceMs) {
        console.warn('[Safepay Webhook Warning] Webhook timestamp outside 5-minute tolerance window.');
        return res.status(400).json({ success: false, message: 'Webhook timestamp expired' });
      }
    }

    // 4. Retrieve Original Raw Request Body Buffer
    const rawBuffer = req.rawBody
      ? req.rawBody
      : Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body));

    // Normalize target signature hex (strip optional 'sha256=' prefix and lowercase)
    const targetSigHex = signatureHeader.replace(/^sha256=/i, '').trim().toLowerCase();

    // Prepare candidate secret buffers (base64-decoded, 64-char hex, or utf8 string)
    const candidateKeys = [webhookSecret];
    try {
      const b64Buf = Buffer.from(webhookSecret, 'base64');
      if (b64Buf.length > 0) candidateKeys.push(b64Buf);
    } catch (_) {}
    if (/^[0-9a-fA-F]{64}$/.test(webhookSecret)) {
      try {
        const hexBuf = Buffer.from(webhookSecret, 'hex');
        if (hexBuf.length > 0) candidateKeys.push(hexBuf);
      } catch (_) {}
    }

    // Prepare candidate payload buffers (with timestamp prefix '<timestamp>.<raw_body>' and raw body alone)
    const candidatePayloads = [];
    if (timestampHeader) {
      candidatePayloads.push(Buffer.concat([Buffer.from(`${timestampHeader}.`), rawBuffer]));
    }
    candidatePayloads.push(rawBuffer);

    let isValid = false;
    for (const key of candidateKeys) {
      for (const payload of candidatePayloads) {
        const computedHex = crypto.createHmac('sha256', key).update(payload).digest('hex').toLowerCase();
        const targetBuf = Buffer.from(targetSigHex, 'utf8');
        const computedBuf = Buffer.from(computedHex, 'utf8');
        if (targetBuf.length === computedBuf.length && crypto.timingSafeEqual(targetBuf, computedBuf)) {
          isValid = true;
          break;
        }
      }
      if (isValid) break;
    }

    if (!isValid) {
      console.warn('[Safepay Webhook Warning] Cryptographic signature validation failed. Rejecting webhook.');
      return res.status(401).json({ success: false, message: 'Invalid webhook signature' });
    }

    // 5. Idempotency Check
    const eventId = (
      req.headers['x-sfpy-event-id'] ||
      req.headers['X-SFPY-EVENT-ID'] ||
      req.body?.id ||
      ''
    ).trim();

    if (eventId && processedWebhookEvents.has(eventId)) {
      console.log(`[Safepay Webhook] Skipping duplicate event ID: ${eventId}`);
      return res.status(200).json({ success: true, message: 'Event already processed' });
    }

    // 6. Process Verified Webhook Event
    const eventPayload = req.body || {};
    const eventType = eventPayload.type || eventPayload.event || '';
    const dataObj = eventPayload.data || eventPayload;
    const trackerToken = dataObj.tracker || dataObj.token || dataObj.beacon || '';
    const orderId = dataObj.order_id || dataObj.metadata?.orderId || '';

    console.log(`[Safepay Webhook Verified] Type: ${eventType} | Tracker: ${trackerToken} | Order: ${orderId}`);

    const isPaymentCompleted =
      eventType === 'payment.completed' ||
      eventType === 'tracker.completed' ||
      dataObj.state === 'TRACKER_ENDED' ||
      dataObj.state === 'TRACKER_COMPLETED' ||
      dataObj.status === 'PAID';

    if (isPaymentCompleted) {
      let order = null;
      if (orderId) {
        order = await Order.findById(orderId);
      }
      if (!order && trackerToken) {
        order = await Order.findOne({ safepayTracker: trackerToken });
      }

      if (order) {
        order.isPaid = true;
        order.status = 'Confirmed';
        order.safepayTracker = trackerToken || order.safepayTracker;
        order.safepayReference = dataObj.reference || dataObj.token || trackerToken;
        await order.save();
        console.log(`[Safepay Webhook Confirmed] Order #${order._id} marked as Paid & Confirmed.`);
      } else {
        console.warn(`[Safepay Webhook Warning] No matching order found for Tracker: ${trackerToken}`);
      }
    }

    if (eventId) {
      processedWebhookEvents.add(eventId);
      if (processedWebhookEvents.size > 1000) {
        const firstVal = processedWebhookEvents.values().next().value;
        processedWebhookEvents.delete(firstVal);
      }
    }

    return res.status(200).json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('[Safepay Webhook Error]', error.message);
    return res.status(500).json({ success: false, message: error.message });
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
  handleSafepayRedirect,
  verifySafepayPayment,
  handleSafepayWebhook,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus
};

