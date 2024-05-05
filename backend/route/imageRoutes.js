const express = require('express');
const imageController = require('../controller/imageController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../images/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep original file name
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), imageController.uploadImage);
router.post('/getFile', imageController.getImageByName); // Use POST method to send filename

module.exports = router;
