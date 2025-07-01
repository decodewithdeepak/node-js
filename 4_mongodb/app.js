const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware
app.use('/api/users', userRoutes); // Route prefix


// Database Connection and Start Server
mongoose.connect('mongodb://127.0.0.1:27017/nodejs_db')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));
