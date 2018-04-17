const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true,'username required!'],
  },
  email: {
    type: String,
    required: [true,'Email required!'],
    unique: true
  },
  password: String,
  fbId:String,
  createdAt: { 
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User