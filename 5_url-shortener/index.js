const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/urls', urlRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));