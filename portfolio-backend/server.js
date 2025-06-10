const express = require('express');
const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config();

// Azure App Service will set process.env.PORT
const PORT = process.env.PORT || 8080;

// Log startup information for easier troubleshooting
console.log(`Starting server in ${process.env.NODE_ENV || 'development'} mode`);
console.log(`NODE_VERSION: ${process.version}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});