const express = require('express');
const imageController = require('../controller/imageController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), imageController.uploadImage);
router.post('/getFile', imageController.getImageByName);

module.exports = router;
