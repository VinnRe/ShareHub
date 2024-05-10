const express = require("express");

const listController = require("../controller/listController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/create").post(authController.protect, listController.createList);
router.route("/approve").post(authController.protect, listController.approveList);
router.route("/delete").post(authController.protect, listController.deleteList);
router.route("/request").post(authController.protect, listController.request);
router.route("/accept").post(authController.protect, listController.acceptRequest);
router.route("/reject").post(authController.protect, listController.rejectRequest);
router.route("/fetch/unapproved").get(listController.fetchUnapproved);
router.route("/fetch/approved").get(listController.fetchApproved);
router.route("/fetch/request").post(listController.fetchRequest);
router.route("/fetch/receipt").post(listController.fetchReceipt);
router.route("/fetch/search").post(listController.searchList);
router.route("/fetch/tags").post(listController.filterByTags);

module.exports = router;