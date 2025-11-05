// ---- models/user.model.js ----

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// This is the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // 'select: false' means this field won't be sent back
    // in queries by default. This protects the password.
    select: false, 
  },
  role: {
    type: String,
    // enum means 'role' can ONLY be one of these three values
    enum: ['Admin', 'Editor', 'Viewer'], 
    default: 'Viewer', // New users are 'Viewer' by default
  },
}, { 
  // timestamps: true adds 'createdAt' and 'updatedAt' fields
  timestamps: true 
});

// --- Mongoose Middleware ---
// This function runs *before* a new user is saved to the database
userSchema.pre('save', async function (next) {
  // We only hash the password if it's new or has been modified
  if (!this.isModified('password')) {
    return next();
  }

  // 'Salt' makes the hash more secure
  const salt = await bcrypt.genSalt(10);
  // This hashes the password and saves it
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Mongoose Method ---
// This adds a custom 'comparePassword' function to every user document
// We will use this later to check if a login password is correct
userSchema.methods.comparePassword = async function (enteredPassword) {
  // 'this.password' is the hashed password from the database
  return await bcrypt.compare(enteredPassword, this.password);
};


// This creates the model from the schema
const User = mongoose.model('User', userSchema);

export default User;