const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
  },

  displayName: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  posts: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },

  favourites: {
    type: Array,
    default: [],
  },

  materialCount: {
    type: Number,
    default: 0,
  },

  postsCount: {
    type: Number,
    default: 0,
  },

  repliesCount: {
    type: Number,
    default: 0,
  },

  reputation: {
    type: Number,
    default: 0,
  }

});
userSchema.methods.correctPassword = async (candidatePassword, userPassword) => await bcrypt.compare(candidatePassword, userPassword);

const User = mongoose.model("User", userSchema);
module.exports = User;