const express = require("express");

const listController = require("../controller/listController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/create").post(authController.protect, listController.createList);
router.route("/fetch/all").get(listController.fetchAll);
router.route("/fetch/search").post(listController.searchList);
router.route("/fetch/tags").post(listController.filterByTags);

module.exports = router;