const mongoose = require('mongoose');

// Schema...
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  gender: String,
});

// Model...
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;