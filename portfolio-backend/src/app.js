const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'https://sachinshrestha.com',
    'https://www.sachinshrestha.com',
    'https://shrestha-sachin.github.io',
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// API Routes - Fixed to match frontend expectations
app.use('/api', newsletterRoutes);
app.use('/api', contactRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    env: process.env.NODE_ENV || 'development',
    routes: {
      contact: '/api/contact',
      newsletter: '/api/newsletter'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something broke!';
  
  console.error({
    status: status,
    message: message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  // Send proper JSON response for API errors
  if (req.path.startsWith('/api/')) {
    return res.status(status).json({ 
      error: message,
      status: status
    });
  }
  
  res.status(status).send(message);
});

app.get('/', (req, res) => {
  res.send('Backend API is working!');
});

module.exports = app;