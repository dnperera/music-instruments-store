const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Schema = mongoose.Schema;
const saltRounds = 10;

//Define User model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

//Add pre save hook to encrypt the password before save
userSchema.pre("save", function(next) {
  //assign current context of the User model to an variable
  const user = this;
  //first check user's password modified
  if (user.isModified("password")) {
    //generate a SALT and run the callback
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) {
        return next(err);
      }
      //Hash the password using generated salt
      bcrypt.hash(user.password, salt, function(error, hash) {
        if (error) {
          return next(error);
        }
        //update the current user password with hash
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//add a method 'comparePasswords' to the user schema
userSchema.methods.comparePassword = function(userEnteredPassword, callback) {
  bcrypt.compare(userEnteredPassword, this.password, function(err, isMatched) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatched);
  });
};

//generate jwt token and save
userSchema.methods.generateToken = function(callback) {
  //assign current context of the User model to an variable
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.token = token;
  user.save(function(err, user) {
    if (err) {
      callback(err);
    }
    callback(null, user);
  });
};
//create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
