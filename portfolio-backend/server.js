const express = require('express');
const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config();

const PORT = process.env.PORT || 8080; // Azure prefers port 8080 by default

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});