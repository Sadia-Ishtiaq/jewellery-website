const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// NOTE: connectDB() is called once at the bottom, inside the startup block,
// so the HTTP server only opens after the database connection is confirmed.

const app = express();

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled CSP so external fonts/CDN icons function seamlessly
    crossOriginResourcePolicy: false
  })
);

app.use(cors());
app.use(
  express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// Serve Static Uploads & Media
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Serve Frontend Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/products.html', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));
app.get('/about.html', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/admin.html', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots.txt')));
app.get('/sitemap.xml', (req, res) => res.sendFile(path.join(__dirname, 'sitemap.xml')));

// 404 Route Handler
app.use((req, res, next) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.status(404).json({ success: false, message: 'Resource not found' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const isClientError = err.status >= 400 && err.status < 500;
    return res.status(err.status || 500).json({
      success: false,
      message: isClientError ? err.message : 'Internal Server Error'
    });
  }
  console.error('[Server Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

// ── Startup: connect to MongoDB first, then open the HTTP port ──────────────
// connectDB() is called exactly once here. The server will not accept any
// requests until the database connection is confirmed (race condition fixed).
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`===================================================`);
      console.log(`💎 SADIA'S COLLECTION E-COMMERCE SERVER RUNNING!`);
      console.log(`📍 Port: http://localhost:${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`===================================================`);
    });
  })
  .catch((err) => {
    // Safe error — does not print the MONGO_URI or any credentials
    console.error('[FATAL] MongoDB connection failed. HTTP server will not start.');
    console.error('[FATAL] Check your MONGO_URI in .env and Atlas Network Access settings.');
    process.exit(1);
  });
