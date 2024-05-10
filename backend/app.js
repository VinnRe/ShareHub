const express = require("express");
const userRoutes = require("./route/userRoutes");
const listRoutes = require("./route/listRoutes");
const imageRoutes = require("./route/imageRoutes");
const bodyParser = require("body-parser");
const multer = require("multer")
var morgan = require("morgan");
const AppError = require("./utils/appError");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;

app.use("/api/user", userRoutes);
app.use("/api/list", listRoutes);
app.use("/api/image", imageRoutes)
app.use("/api/images", express.static("/images"))

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  });