const express = require('express');
const assetsRoutes = require('./routes/assets');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/assets', assetsRoutes);

module.exports = app;
