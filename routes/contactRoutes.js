const express = require('express');
const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
router.post('/', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    console.log(`[Contact Message Received] From: ${name.trim()} (${email.trim()}, ${phone || 'N/A'}) | Subject: ${subject || 'General Inquiry'}`);

    res.json({
      success: true,
      message: `Thank you ${name.trim()}! Your message has been received securely by Sadia's Collection team.`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Newsletter subscription
// @route   POST /api/contact/newsletter
// @access  Public
router.post('/newsletter', (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    console.log(`[Newsletter Subscription] Email: ${email.trim()}`);

    res.json({
      success: true,
      message: `Thank you for subscribing to Sadia's Collection exclusive circle!`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
