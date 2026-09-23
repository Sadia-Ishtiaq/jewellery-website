const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sadias_collection', {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Direct database connection skipped or failed: ${error.message}`);
    console.warn(`[MongoDB Note] Ensure MongoDB is running locally or MONGO_URI in .env points to your MongoDB Atlas cluster.`);
  }
};

module.exports = connectDB;
