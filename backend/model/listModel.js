const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },

  details: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },

  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Creator is required"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  media: {
    type: String,
    required: [true, "File is required"],
    trim: true,
  },

  tags: {
    type: Array,
    default: [],
  },

  approved: {
    type: Boolean,
    default: false,
  },

});

const List = mongoose.model("List", listSchema);
module.exports = List;