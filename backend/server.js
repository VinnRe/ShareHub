require('dotenv').config();
const app = require("./app");
const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer")

const port = process.env.PORT

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});