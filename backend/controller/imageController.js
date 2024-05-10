const Image = require('../model/imageModel');
const path = require('path');

exports.uploadImage = async (req, res) => {
    console.log('req.file:', req.file);

    if (!req.file) {
        return res.status(400).json({ error: "No image uploaded." });
    }

    const { filename } = req.file;
    const filePath = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'images', filename);

    console.log('imageName:', filename);
    console.log('imagePath:', filePath);
    
    try {
        const image = new Image({ fileName: filename, filePath: filePath }); 
        await image.save();
        res.status(200).json({ msg: 'Image uploaded successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Image upload failed.' });
    }
};


exports.getImageByName = (req, res) => {
    const { imageName } = req.body;

    if (!imageName) {
        return res.status(400).json({ message: 'Image name is required' });
    }

    const imagePath = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'images', filename);

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: 'Image not found' });
        }
    });
};


