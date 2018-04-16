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
  password:{
    type: String,
    validate: {
      validator: function (v) {
        console.log("v====",v)
        return v.length >= 6;
      },
      message: "Password length should be at least 6 characters"
    }
  },
  fbId:String,
  createdAt: { 
    type: Date,
    default: Date.now
  },
});

userSchema.pre('save', function(next) {
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(this.password, salt)
  
  this.password = hash
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User