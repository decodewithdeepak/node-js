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
   mongoose.connect('mongodb://localhost:27017/urlshortener');

   app.listen(3000, () => {
   	console.log('Server running on port 3000');
   });