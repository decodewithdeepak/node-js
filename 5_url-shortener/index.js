const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');
const Url = require('./models/Url');

const app = express();

// Middleware
app.use(express.json());
// app.use(express.static('public')); // static html

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Homepage route - render with all URLs
app.get('/', async (req, res) => {
   try {
      const urls = await Url.find().sort({ _id: -1 }); // Latest first
      res.render('index', { urls });
   } catch (error) {
      res.render('index', { urls: [], error: error.message });
   }
});

// EJS VS HTML => 

// Routes
app.use('/api/urls', urlRoutes);

// Clean redirect route - handle /:shortCode directly
app.get('/:shortCode', urlController.redirectUrl);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));