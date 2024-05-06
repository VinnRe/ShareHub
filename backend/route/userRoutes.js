const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route('/logout').post(authController.protect, authController.logout);
router.route("/update/profile").put(authController.protect, authController.updateProfile);
router.route("/fetch").get(authController.protect, authController.fetchData);

module.exports = router;
