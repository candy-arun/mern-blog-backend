const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./src/config/db');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes'); // 👈 added
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); // 👈 added

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// connect DB then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
