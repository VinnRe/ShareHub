const Image = require('../model/imageModel');
const path = require('path');

exports.uploadImage = async (req, res) => {
    console.log('req.file:', req.file);

    if (!req.file) {
        return res.status(400).json({ error: "No image uploaded." });
    }

    const { filename } = req.file;
    const filePath = `../images/${filename}`;
    
    try {
        await Image.create({ imageName: filename, imagePath: filePath });
        res.status(200).json({ msg: 'Image uploaded successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Image upload failed.' });
    }
};

exports.getImageByName = (req, res) => {
    const { imageName } = req.body;

    if (!imageName) {
        return res.status(400).json({ message: 'Image name is required' });
    }

    const imagePath = path.resolve('../images', imageName);

    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).json({ message: 'Image not found' });
        }
    });
};
